import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";

const pageSelector = (store: RootState) => store.page

export const usePage = () => useSelector(pageSelector)