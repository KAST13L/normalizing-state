import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {updatePost} from "../posts-reducer";
import {updateAuthorName} from "../authors-reducer";
import {Comment} from "./Comment";
import {fetchPostComments} from "../comments-reducer";
import {useAppSelector} from "../../app/hooks";

interface PostPropsType {
    postId: string
}

export const Post: React.FC<PostPropsType> = ({postId}) => {

    const post = useAppSelector(state => state.posts.byId[postId])
    const author = useAppSelector(state => state.authors.byId[post.authorId])
    const dispatch = useDispatch();

    const [editModeForText, setEditModeForText] = useState<boolean>(false)
    const [editModeForAuthorName, setEditModeForAuthorName] = useState<boolean>(false)
    const [text, setText] = useState<string>(post.text)
    const [authorName, setAuthorName] = useState<string>(author?.name)

    return (
        <div>
            <b>
                {
                    editModeForText &&
                    <textarea autoFocus value={text}
                              onChange={(e) => {setText(e.target.value)}}
                              onBlur={() => {
                                  // @ts-ignore
                                  dispatch(updatePost(post.id, text))
                                  setEditModeForText(() => false)}
                    }>{text}</textarea>
                }
                {
                    !editModeForText &&
                    <span onDoubleClick={() => setEditModeForText(() => true)}>{text}</span>
                }
            </b>
            <br/>
            likes: {post.likes}
            <br/>
                Author:
                {
                    editModeForAuthorName &&
                    <textarea autoFocus value={authorName}
                              onChange={(e) => {setAuthorName(e.target.value)}}
                              onBlur={() => {
                                  // @ts-ignore
                                  dispatch(updateAuthorName(post.authorId, authorName))
                                  setEditModeForAuthorName(() => false)
                              }}>{authorName}</textarea>}
                {
                    !editModeForAuthorName &&
                    <span onDoubleClick={() => setEditModeForAuthorName(() => true)}>{authorName}</span>}
                Comments: {post.commentsIds.map(id => <Comment postId={postId} key={id} commentId={id}/>)}
                <hr/>
                <button onClick={() => {
                    // @ts-ignore
                    dispatch(fetchPostComments(postId))
                }
                }>get all comments</button>
            <hr/>
        </div>
    );
}