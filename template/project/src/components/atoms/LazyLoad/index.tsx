import NProgress from 'nprogress'
import { useEffect } from 'react'


export const LazyLoad: React.FC = () => {
    useEffect(() => {
        NProgress.configure({ showSpinner: false })
        NProgress.start()

        return () => {
            setTimeout(() => {
                NProgress.done()
            }, 100)
        }
    }, [])
    return null
}

export default LazyLoad
