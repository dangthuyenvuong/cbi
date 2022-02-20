import {
    Avatar,
    Form,
    iconAvatarDefault,
    IconCamera,
    TextField,
    Title,
    RadioGroup,
    Radio,
    Button,
    DatePicker,
    Snackbar,
    Alert,
    Skeleton
} from "components/atoms";
import { PhoneField } from "components/atoms/PhoneField";
import { Breadcrumbs, BreadcrumbItem } from "components/organisms";
import { useForm } from "lib/cbi-react-core";
import { PayloadUpdateUser, User } from "@types";

import { dob, email, firstName, gender, lastName, phone } from "utils/validator";
import { router } from "routers";
import { useCallback, useEffect, useState } from "react";

export type AccountTemplateProps = {
    errorMessage: string,
    successMessage: string,
    isFetching: boolean,
    onUpdateProfile(values: PayloadUpdateUser): void
    user?: User
};

export const AccountTemplate: React.FC<AccountTemplateProps> = ({ onUpdateProfile, user, isFetching, successMessage, errorMessage }) => {
    // const { updateProfile, isFetch, isSuccess } = useAccountPage();
    const { register, handleSubmit, setValues } = useForm<PayloadUpdateUser>({}, { uncontrolled: false });
    const [isOpenSnackbar, setIsOpenSnackbar] = useState(false)
    useEffect(() => {
        if (user) {
            setValues(user as any)// eslint-disable-line
        }
    }, [user])


    const onCloseAlert = useCallback(() => {
        setIsOpenSnackbar(false)
    }, []);

    if (!user) return (
        <div className={"AccountTemplate p-b-100"}>
            <div className="container">
                <Breadcrumbs className="m-t-25">
                    <BreadcrumbItem to={router.home}>Home</BreadcrumbItem>
                    <BreadcrumbItem to={router.myAccount}>My Account</BreadcrumbItem>
                    <BreadcrumbItem to="#">Personal Information</BreadcrumbItem>
                </Breadcrumbs>

                <div className="container-mid personal-information">
                    <div className="row gap-100 justify-center">
                        <div className="col-4 text-center">
                            <Title level={1} className="text-32 bold m-t-20 m-b-30">
                                Personal Information
                            </Title>
                            <Skeleton height={280} />
                        </div>
                        <div className="col-5 container-form">
                            <div className="text-required m-b-18">
                                *All fields are required unless otherwise noted{" "}
                            </div>
                            <div className="flex-col gap-30">
                                <Skeleton height={62} />
                                <Skeleton height={62} />
                                <Skeleton height={62} />
                                <Skeleton height={62} />
                                <Skeleton height={62} />
                                <Skeleton height={62} />
                                <Skeleton width={'50%'} height={62} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    return (
        <div className={"AccountTemplate p-b-100"}>
            <div className="container">
                <Breadcrumbs className="m-t-25">
                    <BreadcrumbItem to={router.home}>Home</BreadcrumbItem>
                    <BreadcrumbItem to={router.myAccount}>My Account</BreadcrumbItem>
                    <BreadcrumbItem to="#">Personal Information</BreadcrumbItem>
                </Breadcrumbs>

                <div className="container-mid personal-information">
                    <div className="row gap-100 justify-center">
                        <div className="col-4 text-center">
                            <Title level={1} className="text-32 bold m-t-20 m-b-30">
                                Personal Information
                            </Title>
                            <div className="container-avatar">
                                <div className="avatar-and-name">
                                    <div className="row justify-center">
                                        <div className="avatar">
                                            <Avatar
                                                src={user.avatar || iconAvatarDefault}
                                                size={140}
                                            />
                                            <div className="icon-camera">
                                                <IconCamera />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="avatar-and-name">
                                    <div className="text-20 bold m-t-18">{user.firstName} {user.lastName}</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-5 container-form">
                            <div className="text-required m-b-18">
                                *All fields are required unless otherwise noted{" "}
                            </div>
                            <Form
                                className="flex-col gap-30"
                                onSubmit={handleSubmit(onUpdateProfile)}
                            >
                                <TextField
                                    label="First name"
                                    {...register("firstName", firstName)}

                                    className="text"
                                />
                                <TextField
                                    label="Last name"
                                    {...register("lastName", lastName)}

                                    className="text"
                                />
                                <div className="m-l-16">
                                    <div className="text-14">Gender</div>
                                    <RadioGroup
                                        {...register("gender", gender)}

                                        row
                                    >
                                        <Radio
                                            className="radio"
                                            value="male"
                                        >Male</Radio>
                                        <Radio
                                            className="radio"
                                            value="female"
                                        >Female</Radio>
                                    </RadioGroup>
                                </div>
                                <TextField
                                    label="Email"
                                    disabled
                                    {...register("email", email)}
                                    className="text"
                                />
                                <DatePicker
                                    label="Date of birth"
                                    className="flex-1 text"
                                    {...register("dob", dob)}

                                    disableFuture
                                    format="MM/DD/YYYY"
                                />
                                <PhoneField
                                    // value={form?.phone}
                                    className="text customPhone"
                                    {...register("phone", phone)}

                                />
                                {
                                    successMessage && <Alert severity="success">{successMessage}</Alert>
                                }
                                <div className="flex gap-20 justify-center">
                                    <Button
                                        loading={isFetching}
                                        size="large"
                                        transparent
                                        htmlType="submit"
                                        className="button"
                                    >
                                        {" "}
                                        Save change{" "}
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
            <Snackbar
                open={isOpenSnackbar}
                autoHideDuration={3000}
                onClose={onCloseAlert}
                color="error"
                message={errorMessage}
                anchorOrigin={{ horizontal: "right", vertical: "top" }}
            >
                <div>
                    <Alert variant="filled" color="error">
                        {errorMessage}
                    </Alert>
                </div>
            </Snackbar>
        </div>
    );
};


export default AccountTemplate