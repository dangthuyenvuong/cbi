import { createSelector } from 'reselect'
import { RootState } from '..'


const DemoSelect = (store: RootState) => store.Demo

export const useDemo = useSelector(DemoSelect)