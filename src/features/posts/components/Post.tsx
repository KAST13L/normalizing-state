import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {updatePost} from "../posts-reducer";
import {AppStateType} from "../../app/store";
import {updateAuthorName} from "../authors-reducer";

interface PostPropsType {
    postId: string
}

export const Post: React.FC<PostPropsType> = ({postId}) => {

    const post = useSelector((state: AppStateType) => state.posts.byId[postId])
    // @ts-ignore
    const author = useSelector((state: AppStateType) => state.authors.byId[post.authorId])
    const dispatch = useDispatch();

    const [editMode, setEditMode] = useState<boolean>(false)
    const [editModee, setEditModee] = useState<boolean>(false)
    const [text, setText] = useState<string>(post.text)
    const [authorName, setAuthorName] = useState<string>(author?.name)

    return (
        <div>
            <b>
                {editMode && <textarea autoFocus
                                       value={text}
                                       onChange={(e) => {setText(e.target.value)}}
                                       onBlur={()=>{
                                           // @ts-ignore
                                           dispatch(updatePost(post.id, text))
                                           setEditMode(() => false)}
                                       }>{text}</textarea>}
                {!editMode && <span onDoubleClick={() => setEditMode(() => true)}>{text}</span>}
            </b>
            <br/>
            <span>
                likes: {post.likes}
            </span>
            <br/>
            <span>
                Author:
                {editModee && <textarea autoFocus value={authorName}
                                       onChange={(e) => {setAuthorName(e.target.value)}}
                                       onBlur={()=>{
                                           // @ts-ignore
                                           dispatch(updateAuthorName(post.authorId, authorName))
                                           setEditModee(() => false)
                                       }}
                >{authorName}</textarea>}
                {!editModee && <span onDoubleClick={() => setEditModee(() => true)}>{authorName}</span>}
            </span>
            <hr/>
        </div>
    );
}