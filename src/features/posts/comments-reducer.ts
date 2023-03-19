import {FetchPostsSuccessACTypes, mapToLookupTable} from "./posts-reducer";
import {api, CommentAPIType} from "../../api/api";
import {AuthorType} from "./authors-reducer";
import {Dispatch} from "react";

export type CommentsType = Omit<CommentAPIType, 'author'> & AuthorType

const initialState = {
    byId: {} as { [key: string]: CommentsType },
}

export const commentsReducer = (state = initialState, action:
    | FetchPostsSuccessACTypes
    | ReturnType<typeof fetchPostCommentsSuccess>
) => {
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
                                text: c.author.id,
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
                                text: c.author.id,
                                authorId: c.author.id
                            }
                            return comment;
                        })
                    )
                }
            }
        }
    }
    return state
}

export const fetchPostCommentsSuccess = (postId: string,comments: CommentAPIType[]) => ({
    type: 'comments/fetchPostCommentsSuccess',
    payload: {
        postId, comments
    }
} as const)

export const fetchPostComments = (postId: string) => async (dispatch: Dispatch<any>) => {
    const comments = await api.getComments(postId)
    // @ts-ignore
    dispatch(fetchPostCommentsSuccess(postId, comments))
}

