import React, {useState} from 'react';
import {PostType} from "../../../api/api";

interface PostPropsType {
    post: PostType
}

export const Post: React.FC<PostPropsType> = ({post}) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(post.text)

    const changeEditModeHandler = () => {
        setEditMode(!editMode)
    }

    return (
        <div style={{textAlign: 'center'}}>
            <b>
                {editMode && <textarea value={text} onChange={(e) => {
                    setText(e.target.value)
                }} onBlur={changeEditModeHandler}>{text}</textarea>}
                {!editMode && <span onDoubleClick={changeEditModeHandler}>{text}</span>}
            </b>
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