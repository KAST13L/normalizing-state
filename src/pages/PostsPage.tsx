import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {Post} from "../features/posts/components/Post";
import {fetchPosts} from "../features/posts/posts-reducer";
import {useAppSelector} from "../features/app/hooks";
import {WeatherComponent} from "weather-widget-test2";

export const PostsPage: React.FC = () => {

    const ids = useAppSelector(state => state.posts.allIds)
    const dispatch = useDispatch()

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchPosts())



    }, [dispatch])

    return (
        <div style={{textAlign: 'center'}}>
            {ids.map(id => <Post postId={id} key={id}/>)}
            <WeatherComponent/>
        </div>
    );
};