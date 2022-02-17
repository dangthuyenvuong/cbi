import { ViewCartTemplate } from "components/templates"
import { getMainLayout } from "layouts/MainLayout"
import { router } from "routers"
import { useAuth } from "store/auth"
import { Redirect } from 'lib/cbi-react-core'

const ViewCart = () => {
    const { login } = useAuth()
    if (!login) {
        return <Redirect to={router.welcomeBack}/>
    }
    return <ViewCartTemplate />
}



ViewCart.getLayout = getMainLayout

// export const getServerSideProps = withAuthen(async () => {
//     return {
//         props: {}
//     }
// }, router.welcomeBack)


export default ViewCart