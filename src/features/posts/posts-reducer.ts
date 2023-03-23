import {api, PostAPIType} from "../../api/api";
import {deletePostCommentSuccess, fetchPostCommentsSuccess} from "./comments-reducer";
import {AppDispatch} from "../app/store";

export type PostType =
    Omit<PostAPIType, 'author' | 'lastComments'>
    & { authorId: string, commentsIds: string[] }

const initialState = {
    byId: {} as { [key: string]: PostType },
    allIds: [] as string[]
}

type LookupTableType<T> = { [key: string]: T }

export const mapToLookupTable = <T extends { id: string }>(arr: T[]) => {
    const acc: LookupTableType<T> = {};
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, acc)
}

type StateType = typeof initialState;

export const postsReducer = (state = initialState, action: ActionsType
): StateType => {
    switch (action.type) {
        case 'posts/fetchPostsSuccess': {
            return {
                ...state,
                allIds: action.payload.posts.map(el => el.id),
                byId: mapToLookupTable(action.payload.posts.map(p => {
                    const copy: PostType = {
                        id: p.id,
                        text: p.text,
                        likes: p.likes,
                        authorId: p.author.id,
                        commentsIds: p.lastComments.map(c => c.id)
                    }
                    return copy
                }))
            }
        }
        case "comments/fetchPostCommentsSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: action.payload.comments.map(c => c.id)
                    }
                }

            }
        }
        case "posts/updatePostTextSuccess": {
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        text: action.payload.text
                    }
                }
            }
        }
        case "comments/deletePostCommentSuccess": {

            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.payload.postId]: {
                        ...state.byId[action.payload.postId],
                        commentsIds: state.byId[action.payload.postId].commentsIds.filter(id => id !== action.payload.commentId)
                    }
                }
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostAPIType[]) => ({
    type: 'posts/fetchPostsSuccess',
    payload: {posts}
} as const)

export const updatePostTextSuccess = (postId: string, text: string) => ({
    type: 'posts/updatePostTextSuccess',
    payload: {postId, text}
} as const)

export const fetchPosts = () => async (dispatch: AppDispatch) => {
    const posts = await api.getPosts()
    dispatch(fetchPostsSuccess(posts))
}

export const updatePost = (postId: string, text: string) => async (dispatch: AppDispatch) => {
    const posts = await api.updatePost(postId, text)
    if (posts) {
    }
    dispatch(updatePostTextSuccess(postId, text))
}

// ACs types
type ActionsType =
    FetchPostsSuccessACTypes
    | UpdatePostTextSuccessACTypes
    | ReturnType<typeof fetchPostCommentsSuccess>
    | ReturnType<typeof deletePostCommentSuccess>

export type FetchPostsSuccessACTypes = ReturnType<typeof fetchPostsSuccess>
export type UpdatePostTextSuccessACTypes = ReturnType<typeof updatePostTextSuccess>
