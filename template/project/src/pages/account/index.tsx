import { PayloadUpdateUser } from "@types";
import { getMainLayout } from "components/layouts"
import { AccountTemplate } from "components/templates"
import { Authen, withAuthen } from "lib/cbi-nextjs";
import { useAllState } from "lib/cbi-react-core";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { userActions, useUser } from "store/user";

export interface AccountProps {
    isFetching: boolean,
    errorMessage: string,
    successMessage: string,
}

const Account = () => {

    const user = useUser();
    const dispatch = useDispatch();
    const [state, setState] = useAllState<AccountProps>({
        isFetching: false,
        errorMessage: "",
        successMessage: ''
    })

    const onUpdateProfile = useCallback(async (form: PayloadUpdateUser) => {
        setState({
            isFetching: true,
            successMessage: ''
        });
        dispatch(
            userActions.fetchUpdateProfile({
                data: form,
                callback: (res) => {
                    if (res.message) {
                        setState({ errorMessage: res.message, successMessage: '' });
                    } else {
                        setState({ successMessage: 'Your personal information was updated.' });
                        // dispatch(userActions.fetchProfile());
                    }
                    setState({ isFetching: false });
                },
            })
        );
    }, []);
    return <Authen>
        <AccountTemplate
            {...state}
            user={user}
            onUpdateProfile={onUpdateProfile}

        />
    </Authen>
}

Account.getLayout = getMainLayout

export const getServerSideProps = withAuthen(async (context) => {
    return {
        props: {}
    }
})


export default Account