import React from 'react';
import {PostsPage} from "./pages/PostsPage";
import {WeatherComponent} from "weather-widget-test2";

export const App: React.FC = () => {
    return (
        <div>
            <PostsPage/>
            <WeatherComponent/>
        </div>
    );
};