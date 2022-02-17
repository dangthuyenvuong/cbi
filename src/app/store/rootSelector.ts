import { useSelector } from "react-redux";
import { RootState } from "./rootReducer";

export const useStore = () => useSelector((store: RootState) => store)