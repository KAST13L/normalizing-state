import {AuthorType} from "../../api/api";
import {FetchPostsSuccessACTypes} from "./posts-reducer";

const initialState = {
    byId: {} as { [key: string]: AuthorType },
    allIds: [] as string[]
}


export const authorsReducer = (state = initialState, action: FetchPostsSuccessACTypes
) => {
    switch (action.type) {

    }
    return state
}
