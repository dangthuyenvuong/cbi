import { getAuthLayout } from "components/layouts"
import { LoginWithPhoneTemplate } from "components/templates"
import { withNoAuthen } from "lib/cbi-nextjs"
import { router } from "routers"

const Login = () => {
    return <LoginWithPhoneTemplate/>
}



Login.getLayout = getAuthLayout
export default Login

export const getServerSideProps = withNoAuthen(async (context) => {
    return {
        props: {}
    }
}, router.myAccount)