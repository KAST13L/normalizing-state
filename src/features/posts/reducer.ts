import {api, PostType} from "../../api/api";
import {Dispatch} from "react";

const initialState = {
    items: [] as PostType[]
}

export const postsReducer = (state = initialState, action: ReturnType<typeof fetchPostsSuccess>) => {
    switch (action.type) {
        case 'posts/fetchPostsSuccess': {
            return {
                ...state,
                items: action.payload.posts
            }
        }
    }
    return state
}

export const fetchPostsSuccess = (posts: PostType[]) => ({
    type: 'posts/fetchPostsSuccess',
    payload: {posts}
})

export const fetchPosts = () => async (dispatch: Dispatch<any>) => {
    const posts = await api.getPosts()
    dispatch(fetchPostsSuccess(posts))
}