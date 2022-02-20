/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    TextField,
    Button,
    Form,
    Checkbox,
    PasswordField,
    Link,
} from "components/atoms";
import { useTranslate } from "lib/cbi-react-translate";

import { LoginSocialGroup } from "components/molecules";
import { AuthForm } from "components/organisms";
import { useForm } from "lib/cbi-react-core";
import { PayloadLogin, PayloadLoginWithEmail } from "@types";
import { emailLogin, passwordLogin } from "utils/validator";
import { useState } from "react";
import classNames from "classnames";


export type LoginTemplateProp = {
    login: (values: PayloadLoginWithEmail) => void,
    isFetching?: boolean,
    errorMessage: string,
};

export const LoginWithEmailTemplate: Atom<LoginTemplateProp> = ({ login, isFetching, errorMessage, className }) => {
    const { t } = useTranslate();
    const { register, handleSubmit, form, checkErrorOneField } = useForm<PayloadLogin>();
    const [check, setCheck] = useState(false);
    // const [isOpenSnackbar, setIsOpenSnackBar] = useState(false)
    const checkInput = (values: PayloadLogin) => {
        if (values?.username?.length > 0 && values?.password?.length > 0) {
            return false;
        }
        return true;
    };

    // const onCloseAlert = useCallback(() => {
    //     if (errorMessage) {
    //         setIsOpenSnackBar(true);
    //     }
    // }, [errorMessage]);

    return (
        <AuthForm
            className={classNames("LoginWithEmailTemplate", className)}
            title="Sign in with email"
            description={
                <>
                    New to CBIHS? &nbsp;{" "}
                    <Link to={'#'} className="link">
                        Create Account
                    </Link>
                </>
            }
        >
            <Form className="flex-col gap-25" onSubmit={handleSubmit(login)}>
                <TextField
                    label="Email"
                    {...register("username", emailLogin)}
                    onBlur={() => checkErrorOneField('username')}
                />
                <PasswordField
                    label="Password"
                    {...register("password", passwordLogin)}
                    onBlur={() => checkErrorOneField('password')}
                />
                <div>{<p className="error-text">{errorMessage}</p>}</div>
                {/* <Checkbox value={check} onChange={(e: any) => setCheck(e?.target?.checked)} className="agree-checkbox">
                    <span>By proceeding, you understand and agree to our <Link to={url.privacyPolicy}>Privacy Policy</Link> and <Link to={url.termOfServices}>Terms & Conditions</Link></span>
                </Checkbox> */}
                <div className="agree-checkbox">
                    <Checkbox onChange={(checked) => setCheck(checked)} />
                    <span>
                        By proceeding, you understand and agree to our{" "}
                        <Link to={'#'}>Privacy Policy</Link> and{" "}
                        <Link to={'#'}>Terms & Conditions</Link>
                    </span>
                </div>
                <Button
                    loading={isFetching}
                    size="large"
                    disabled={!check || checkInput(form)}
                    htmlType="submit"
                >
                    Sign in
                </Button>
            </Form>
            <LoginSocialGroup />
            <div className="forgot-password-signin">
                <Link style={{ borderBottom: "1px solid" }} to={'#'}>
                    {t("Forgot password?")}
                </Link>
            </div>
        </AuthForm>
    );
};


export default LoginWithEmailTemplate