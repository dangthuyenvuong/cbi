import { getAuthLayout } from "components/layouts/AuthLayout"
import { WelcomeBackTemplate } from "components/templates/WelcomeBackTemplate"
import { withNoAuthen } from "lib/cbi-nextjs"
import { router } from "routers"



const WelcomBack = () => {
    return <WelcomeBackTemplate />
}


WelcomBack.getLayout = getAuthLayout
export default WelcomBack

export const getServerSideProps = withNoAuthen(async () => {
    return {
        props: {}
    }
}, router.myAccount)