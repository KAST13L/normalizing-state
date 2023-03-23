import React from 'react';
import {useDispatch} from "react-redux";
import {deletePostComment} from "../comments-reducer";
import {useAppSelector} from "../../app/hooks";

type CommentPropsType = {
    commentId: string
    postId: string
}

export const Comment: React.FC<CommentPropsType> = ({commentId, postId}) => {

    const dispatch = useDispatch()
    const comment = useAppSelector(state => state.comments.byId[commentId])
    const author = useAppSelector(state => state.authors.byId[comment.authorId])

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

