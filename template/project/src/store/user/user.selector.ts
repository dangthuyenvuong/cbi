import { useSelector } from "react-redux";
import { RootState } from "store/rootReducer";

const getUser = (store: RootState) => store.user



export const useUser = () => {
    const { user } = useSelector(getUser)
    return user
}

