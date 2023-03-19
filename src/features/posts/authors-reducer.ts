import {FetchPostsSuccessACTypes, mapToLookupTable} from "./posts-reducer";
import {PostType} from "../../api/api";

const initialState = {
    byId: {} as { [key: string]: PostType },
}

export const authorsReducer = (state = initialState, action: FetchPostsSuccessACTypes
) => {
    switch (action.type) {
        case "posts/fetchPostsSuccess": {
            return {
                ...state,
                byId: mapToLookupTable(action.payload.posts.map(p => p.author))
            }
        }
    }
    return state
}
