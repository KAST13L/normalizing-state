import {FetchPostsSuccessACTypes, mapToLookupTable} from "./posts-reducer";
import {api, AuthorType} from "../../api/api";
import {Dispatch} from "react";

const initialState = {
    byId: {} as { [key: string]: AuthorType },
}

export const authorsReducer = (state = initialState, action: FetchPostsSuccessACTypes | ReturnType<typeof updateAuthorNameSuccess>
) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
        case "posts/updateAuthorNameSuccess": {
            return {
                ...state,
                byId: {
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
    if (authors) {}
    dispatch(updateAuthorNameSuccess(authorId, name))
}