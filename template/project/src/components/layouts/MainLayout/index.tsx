import { Footer, Header, SidebarMenu } from "components/organisms"
import { useDispatch } from "react-redux"
import { pageActions, usePage } from "store/page"


type MainLayoutProp = React.HTMLAttributes<HTMLDivElement> & {
}

const MainLayout: React.FC<MainLayoutProp> = ({ children, className, ...ref }) => {
    const { openMenu } = usePage()
    const dispatch = useDispatch()


    return (
        <div
            {...ref}
            className={`MainLayout ${className ?? ''}`}
        >
            <Header />
            <SidebarMenu
                open={openMenu}
                onClose={() => dispatch(pageActions.toggleMenu())}
            />
            <main id="page-content">
                {/* <Suspense fallback={<LazyLoad />}> */}
                    {children}
                {/* </Suspense> */}
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