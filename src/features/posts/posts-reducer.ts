import {api, PostType} from "../../api/api";
import {Dispatch} from "react";

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

export const postsReducer = (state = initialState, action: ActionsType
) => {
    switch (action.type) {
        case 'posts/fetchPostsSuccess': {
            return {
                ...state,
                allIds: action.payload.posts.map(el => el.id),
                byId: mapToLookupTable(action.payload.posts)
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
    }
    return state
}

export const fetchPostsSuccess = (posts: PostType[]) => ({
    type: 'posts/fetchPostsSuccess',
    payload: {posts}
} as const)
export const updatePostTextSuccess = (postId: string, text: string) => ({
    type: 'posts/updatePostTextSuccess',
    payload: {postId, text}
} as const)

export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
    const posts = await api.getPosts()
    dispatch(fetchPostsSuccess(posts))
}

export const updatePost = (postId: string, text: string) => async (dispatch: Dispatch<any>) => {
    const posts = await api.updatePost(postId, text)
    dispatch(updatePostTextSuccess(postId, text))
}

// ACs types
type ActionsType = FetchPostsSuccessACTypes | UpdatePostTextSuccessACTypes
export type FetchPostsSuccessACTypes = ReturnType<typeof fetchPostsSuccess>
export type UpdatePostTextSuccessACTypes = ReturnType<typeof updatePostTextSuccess>
