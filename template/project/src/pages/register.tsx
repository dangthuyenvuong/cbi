import { PayloadRegister, ResponseRegister } from "@types"
import { RegisterTemplate } from "components/templates"
import { getAuthLayout } from "layouts/AuthLayout"
import { withNoAuthen } from "lib/cbi-nextjs"
import { useAllState, useURL } from "lib/cbi-react-core"
import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { router } from "routers"
import { authActions } from "store/auth"
import { userActions } from "store/user"


type StateProps = {
    isFetching: boolean,
    isSuccess: boolean,
    errorMessage?: string,
    registerData?: ResponseRegister
}

const Register = () => {

    const [state, setState] = useAllState<StateProps>({
        isFetching: false,
        isSuccess: false,
    })

    const dispatch = useDispatch()
    const { navigate } = useURL()

    const submitRegister = useCallback(async (values: PayloadRegister) => {
        setState({ isFetching: true })
        dispatch(userActions.fetchRegister({
            data: {
                ...values,
                passwordConfirm: values.password,
                username: values.email,
            },
            callback: (res) => {
                if (res.data) {
                    setState({ isSuccess: true, registerData: res.data })
                } else if (res.message) {
                    setState({ errorMessage: res.message })
                }
                setState({ isFetching: false })
            }
        }))

    }, [])

    const login = useCallback(() => {
        if (!state.registerData) return

        dispatch(authActions.fetchLogin({
            data: state.registerData,
            callback(res) {
                if (res.data) {
                    navigate(router.home)
                }
            }
        }))
    }, [state.registerData])

    return <RegisterTemplate
        {...state}
        login={login}
        onSubmit={submitRegister}
    />
}


Register.getLayout = getAuthLayout

export const getServerSideProps = withNoAuthen(async (context) => {
    return {
        props: {}
    }
}, router.myAccount)

export default Register