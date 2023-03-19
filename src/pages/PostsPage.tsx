import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType, store} from "../features/app/store";
import {Post} from "../features/posts/components/Post";
import {fetchPosts} from "../features/posts/reducer";

export const PostsPage: React.FC = () => {

    const ids = useSelector((state: AppStateType) => state.posts.allIds )
    const dispatch = useDispatch()

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchPosts())
    },[dispatch])

    return (
        <div style={{textAlign: 'center'}}>
            {ids.map(id => <Post postId={id} key={id}/>)}
        </div>
    );
};