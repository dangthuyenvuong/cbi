import { PayloadUpdateUser } from "@types";
import AccountTemplate from "components/templates/AccountTemplate"
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
                    }
                    setState({ isFetching: false });
                },
            })
        );
    }, []);
    return (
        <AccountTemplate
            {...state}
            user={user}
            onUpdateProfile={onUpdateProfile}
        />
    )
}

export default Account