import { MyPaymentTemplate } from "components/templates/MyPaymentTemplate"
import { getMainLayout } from "layouts/MainLayout"
import { withAuthen } from "lib/cbi-nextjs"
import { router } from "routers"

const MyPayment = () => {

    return <MyPaymentTemplate />
}

export const getServerSideProps = withAuthen(async () => {
    return {
        props: {}
    }
}, router.welcomeBack)


MyPayment.getLayout = getMainLayout

export default MyPayment;
