import { useHistory } from "react-router-dom"

export const useNavigate = () => {
    const history = useHistory()
    return history.push
}