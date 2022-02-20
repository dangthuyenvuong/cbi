import { createSelector } from 'reselect'
import { useSelector } from "react-redux";
import { RootState } from "../rootReducer";


const <%= name =%>Select = (store: RootState) => store.<%= name =%>

export const use<%= namecase =%> = useSelector(<%= name =%>Select)