import { PayloadLoginWithEmail } from "@types";
import LoginWithEmailTemplate from "components/templates/LoginWithEmailTemplate"
import { ERROR_MESSAGE } from "constant";
import { useAllState, useURL } from "lib/cbi-react-core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { router } from "routers";
import { authActions } from "store/auth";

const Login = () => {

    const { navigate } = useURL()

    const dispatch = useDispatch();
    const [state, setState] = useAllState({
        isFetching: false,
        errorMessage: "",
    });

    const login = useCallback(async (form: PayloadLoginWithEmail) => {
        setState({
            isFetching: true,
        });
        dispatch(
            authActions.fetchLogin({
                data: form,
                callback: (res) => {
                    if (res.message) {
                        setState({
                            errorMessage: ERROR_MESSAGE?.[res.message] || res.message
                        });
                    } else {
                        navigate(router.home)
                    }
                    setState({
                        isFetching: false,
                    });
                },
            })
        );
    }, []);

    return <LoginWithEmailTemplate
        {...state}
        login={login}
    />
}

export default Login
