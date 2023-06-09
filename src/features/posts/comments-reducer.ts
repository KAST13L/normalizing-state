import {api, CommentAPIType} from "../../api/api";
import {AuthorType} from "./authors-reducer";
import {AppDispatch} from "../app/store";
import {fetchPostsSuccess} from "./posts-reducer";
import {mapToLookupTable} from "../app/hooks";

export type CommentsType = Omit<CommentAPIType, 'author'> & AuthorType

const initialState = {
    byId: {} as { [key: string]: CommentsType },
}

type StateType = typeof initialState

export const commentsReducer = (state = initialState, action: ActionsType
): StateType => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.posts
                        .map(p => p.lastComments).flat()
                        .map(c => {
                            const comment: CommentsType = {
                                id: c.id,
                                text: c.text,
                                authorId: c.author.id
                            }
                            return comment;
                        })
                    )
                }
            }
        }
        case "comments/fetchPostCommentsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    ...mapToLookupTable(action.payload.comments
                        .map(c => {
                            const comment: CommentsType = {
                                id: c.id,
                                text: c.text,
                                authorId: c.author.id
                            }
                            return comment;
                        })
                    )
                }
            }
        }
        case "comments/deletePostCommentSuccess": {
            const byIdCopy = {...state.byId}
            delete byIdCopy[action.payload.commentId]

            return {
                ...state,
                byId: byIdCopy
            }
        }
    }
    return state
}

// ACs
export const fetchPostCommentsSuccess = (postId: string, comments: CommentAPIType[]) => ({
    type: 'comments/fetchPostCommentsSuccess',
    payload: {
        postId, comments
    }
} as const)

export const deletePostCommentSuccess = (postId: string, commentId: string) => ({
    type: 'comments/deletePostCommentSuccess',
    payload: {
        postId, commentId
    }
} as const)

// thunks
export const fetchPostComments = (postId: string) => async (dispatch: AppDispatch) => {
    const comments = await api.getComments(postId)
    // @ts-ignore
    dispatch(fetchPostCommentsSuccess(postId, comments))
}

export const deletePostComment = (postId: string, commentId: string) => async (dispatch: AppDispatch) => {
    const result = await api.deletePostComment(postId, commentId)
    if (result) {
    }
    dispatch(deletePostCommentSuccess(postId, commentId))
}

//types
type ActionsType =
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deletePostCommentSuccess>
