import React from 'react';
import {useSelector} from "react-redux";
import {AppStateType} from "../../app/store";

type CommentPropsType = {
    commentId: string
}

export const Comment: React.FC<CommentPropsType> = ({commentId}) => {

    const comment = useSelector((state: AppStateType) => state.comments.byId[commentId])
    // @ts-ignore
    const author = useSelector((state: AppStateType) => state.authors.byId[comment.authorId])

    return (
        <div style={{textAlign:'center'}}>
            <b>{author.name}</b>: {comment.text}
        </div>
    );
};

