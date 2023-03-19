import {AuthorType} from "../../api/api";
import {FetchPostsSuccessACTypes, mapToLookupTable} from "./posts-reducer";

const initialState = {
    byId: {} as { [key: string]: AuthorType },
    allIds: [] as string[]
}


export const authorsReducer = (state = initialState, action: FetchPostsSuccessACTypes
) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess":{
            return {
                ...state,
                allIds: action.payload.posts.map(p => p.author.id),
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
    }
    return state
}
