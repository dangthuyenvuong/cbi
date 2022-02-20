import { Container } from 'components/atoms'

interface AuthLayoutProp extends React.HTMLAttributes<HTMLDivElement> {
    background?: string
}



export const AuthLayout: Atom<AuthLayoutProp> = ({ children, background = "/img/login-banner.webp", ...ref }) => {
    return (
        <div {...ref} className="auth-layout" style={{ background: `url(${background})` }}>
            <Container>
                <div className="form">
                    {children}
                </div>
            </Container>
        </div>
    )
}


export const getAuthLayout = (page: React.ReactElement) => {
    return (
        <AuthLayout background="/img/login-banner.webp">
            {page}
        </AuthLayout>
    )
}

export default AuthLayout