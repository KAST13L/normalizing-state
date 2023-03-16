import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../features/app/store";
import {Post} from "../features/posts/components/Post";
import {fetchPosts} from "../features/posts/reducer";

export const PostsPage: React.FC = () => {

    const items = useSelector((state: AppStateType) => state.posts.items )
    const dispatch = useDispatch()

    useEffect(()=>{
        // @ts-ignore
        dispatch(fetchPosts())
    },[dispatch])

    return (
        <div>
            {items.map(el => <Post post={el} key={el.id}/>)}
        </div>
    );
};