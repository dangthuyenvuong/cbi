import classNames from "classnames"
import { Footer, Header, SidebarMenu } from "components/organisms"

const MainLayout: Atom = ({ children, className, ...props }) => {

    return (
        <div
            {...props}
            className={classNames('MainLayout', className)}
        >
            <Header />
            <SidebarMenu />
            <main id="page-content">
                {children}
            </main>
            <Footer />
        </div>
    )
}

export const getMainLayout = (page: React.ReactElement) => {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    )
}


export default MainLayout