import { useEffect } from 'react'
import useURL from './hooks/useURL'
export const Redirect: React.FC<{
    to: string
}> = ({ to }) => {
    const { navigate } = useURL()
    useEffect(() => {
        navigate(to)
    }, [])
    return null
}