import { FavoriteProductTemplate } from "components/templates"
import { getMainLayout } from "layouts/MainLayout"
import { withAuthen } from "lib/cbi-nextjs"
import { router } from "routers"

const MyFavorite = () => {

    return <FavoriteProductTemplate />
}


MyFavorite.getLayout = getMainLayout


export const getServerSideProps = withAuthen(async () => {
    return {
        props: {}
    }
}, router.welcomeBack)

export default MyFavorite