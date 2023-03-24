import {TypedUseSelectorHook, useSelector} from 'react-redux';
import type {AppStateType} from './store';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

type LookupTableType<T> = { [key: string]: T }

export const mapToLookupTable = <T extends { id: string }>(arr: T[]) => {
    const acc: LookupTableType<T> = {};
    return arr.reduce((acc, item) => {
        acc[item.id] = item
        return acc
    }, acc)
}