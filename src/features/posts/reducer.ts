import {api, PostType} from "../../api/api";
import {Dispatch} from "react";
import {text} from "stream/consumers";

const initialState = {
    items: [] as PostType[]
}

export const postsReducer = (state = initialState, action:
    | ReturnType<typeof fetchPostsSuccess>
    | ReturnType<typeof updatePostTextSuccess>
) => {
    switch (action.type) {
        case 'posts/fetchPostsSuccess': {
            return {
                ...state,
                items: action.payload.posts
            }
        }
        case "posts/updatePostTextSuccess": {
            return {
                ...state,
                items: state.items.map(el => el.id === action.payload.postId ? {...el, text: action.payload.text} : el)
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