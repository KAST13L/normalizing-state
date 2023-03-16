import React from 'react';
import {PostType} from "../../../api/api";

interface PostPropsType {
    post: PostType
}

export const Post: React.FC<PostPropsType> = ({post}) => {
    return (
        <div style={{textAlign:'center'}}>
            <b>{post.text}</b>
            <br/>
            <span>
                likes: {post.likes}
            </span>
            <br/>
            <span>
                Author: {post.author.name}
            </span>
            <hr/>
        </div>
    );
};