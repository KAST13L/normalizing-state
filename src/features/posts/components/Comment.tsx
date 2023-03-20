import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../app/store";
import {deletePostComment} from "../comments-reducer";

type CommentPropsType = {
    commentId: string
    postId: string
}

export const Comment: React.FC<CommentPropsType> = ({commentId,postId}) => {

    const dispatch = useDispatch()
    const comment = useSelector((state: AppStateType) => state.comments.byId[commentId])
    const author = useSelector((state: AppStateType) => state.authors.byId[comment.authorId])

    return (
        <div style={{textAlign: 'center'}}>
            <b>{author.name}</b>: {comment.text}
            <button onClick={() => {
                // @ts-ignore
                dispatch(deletePostComment(postId, commentId))
            }}>x
            </button>
        </div>
    );
};

