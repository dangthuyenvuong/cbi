import { createSelector } from 'reselect'
import { RootState } from '..'


const <%= name =%>Select = (store: RootState) => store.<%= name =%>

export const use<%= namecase =%> = useSelector(<%= name =%>Select)