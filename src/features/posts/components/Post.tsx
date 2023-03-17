import React, {useState} from 'react';
import {PostType} from "../../../api/api";
import {useDispatch} from "react-redux";
import {updatePost} from "../reducer";

interface PostPropsType {
    post: PostType
}

export const Post: React.FC<PostPropsType> = ({post}) => {

    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false)
    const [text, setText] = useState<string>(post.text)

    const onEditModeHandler = () => {
        setEditMode(() => true)
    }
    const offEditModeHandler = () => {
        // @ts-ignore
        dispatch(updatePost(post.id, text))
        setEditMode(() => false)
    }


    return (
        <div style={{textAlign: 'center'}}>
            <b>
                {editMode && <textarea value={text} onChange={(e) => {
                    setText(e.target.value)
                }} onBlur={offEditModeHandler}>{text}</textarea>}
                {!editMode && <span onDoubleClick={onEditModeHandler}>{text}</span>}
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