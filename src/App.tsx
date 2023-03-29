import React from 'react';
import {DragAndDrop} from "./pages/DragAndDrop";
import './index.css';

export const App: React.FC = () => {
    return (
        <div className={'app'}>
            {/*<PostsPage/>*/}
            <DragAndDrop/>
        </div>
    );
};