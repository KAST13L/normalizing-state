import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../posts-reducer";
import {AppStateType} from "../../app/store";

interface PostPropsType {
    postId: string
}

export const Post: React.FC<PostPropsType> = ({postId}) => {

    const post = useSelector((state: AppStateType) => state.posts.byId[postId])
    // @ts-ignore
    const author = useSelector((state: AppStateType) => state.authors.byId[post.authorId])
    const dispatch = useDispatch();

    console.log(post)

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
        <div>
            <b>
                {editMode && <textarea autoFocus value={text} onChange={(e) => {
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
                Author: {author.name}
            </span>
            <hr/>
        </div>
    );
}