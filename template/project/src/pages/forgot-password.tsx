import { getAuthLayout } from "components/layouts"
import { ForgotPasswordTemplate } from "components/templates"
import { NoAuthen, withNoAuthen } from "lib/cbi-nextjs";

const ForgotPassword = () => {

    return <NoAuthen><ForgotPasswordTemplate /></NoAuthen>
}

ForgotPassword.getLayout = getAuthLayout

export const getServerSideProps = withNoAuthen(async () => {
    return {
        props: {}
    }
})
export default ForgotPassword