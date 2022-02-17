import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";

const orderSelector = (store: RootState) => store.order

export const useOrder = () => useSelector(orderSelector)