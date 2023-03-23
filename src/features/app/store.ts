import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk';
import {postsReducer} from "../posts/posts-reducer";
import {authorsReducer} from "../posts/authors-reducer";
import {commentsReducer} from "../posts/comments-reducer";
import {Action, ThunkAction} from "@reduxjs/toolkit";

const rootReducer = combineReducers({
    posts: postsReducer,
    authors: authorsReducer,
    comments: commentsReducer
})

export type AppDispatch = typeof store.dispatch;
export type AppThunkType<ReturnType = void> = ThunkAction<
    ReturnType,
    AppStateType,
    unknown,
    Action<string>
    >;

export type AppStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

// @ts-ignore
window.store = store