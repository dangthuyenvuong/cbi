import { useHistory } from "react-router-dom"
import { URLHelper } from ".."

export const useUpdateQueryURL = () => {
    const history = useHistory()

    return (options: Record<string, string | boolean | number | undefined | null>) => {
        history.push(URLHelper.changeQueryURL(options))
    }
}