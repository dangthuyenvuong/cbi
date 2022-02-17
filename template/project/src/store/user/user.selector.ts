import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";
import { UserState } from "./user.reducer";

const getUser = (store: RootState) => store.user



export const useUser = () => {
    const { user } = useSelector(getUser)
    return user
}

