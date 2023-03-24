import {api, AuthorAPIType} from "../../api/api";
import {fetchPostCommentsSuccess} from "./comments-reducer";
import {AppDispatch} from "../app/store";
import {mapToLookupTable} from "../app/hooks";
import {fetchPostsSuccess} from "./posts-reducer";

export type AuthorType = {
    authorId: string
}

const initialState = {
    byId: {} as { [key: string]: AuthorAPIType },
}

type StateType = typeof initialState

export const authorsReducer = (state = initialState, action: ActionsType
): StateType => {
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

// AC
export const updateAuthorNameSuccess = (authorId: string, name: string) => ({
    type: 'posts/updateAuthorNameSuccess',
    payload: {authorId, name}
} as const)

// thunk
export const updateAuthorName = (authorId: string, name: string) => async (dispatch: AppDispatch) => {
    const authors = await api.updateAuthorName(authorId, name)
    if (authors) {
    }
    dispatch(updateAuthorNameSuccess(authorId, name))
}

//types
type ActionsType =
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof updateAuthorNameSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>

