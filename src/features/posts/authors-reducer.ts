import {FetchPostsSuccessACTypes, mapToLookupTable} from "./posts-reducer";
import {api, AuthorAPIType} from "../../api/api";
import {Dispatch} from "react";
import {fetchPostCommentsSuccess} from "./comments-reducer";

export type AuthorType = {
    authorId: string
}

const initialState = {
    byId: {} as { [key: string]: AuthorAPIType },
}

type InitialStateType = typeof initialState

export const authorsReducer = (state = initialState, action:
    | FetchPostsSuccessACTypes
    | ReturnType<typeof updateAuthorNameSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
): InitialStateType => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts.map(p => p.author)),
                    ...mapToLookupTable(action.payload.posts.map(p => p.lastComments).flat().map(c => c.author))
                }
            }
        }
        case "comments/fetchPostCommentsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.comments.map(p => p.author))
                }
            }
        }
        case "posts/updateAuthorNameSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.authorId]: {
                        ...state.byId[action.payload.authorId],
                        name: action.payload.name
                    }
                }
            }
        }
    }
    return state
}

export const updateAuthorNameSuccess = (authorId: string, name: string) => ({
    type: 'posts/updateAuthorNameSuccess',
    payload: {authorId, name}
} as const)

export const updateAuthorName = (authorId: string, name: string) => async (dispatch: Dispatch<any>) => {
    const authors = await api.updateAuthorName(authorId, name)
    if (authors) {
    }
    dispatch(updateAuthorNameSuccess(authorId, name))
}