import { classNames } from "utils"
import TextField from '../TextField'

import { InputAdornment, TextFieldProps } from "@mui/material"
import { IconEyeClose, IconViewPassWord } from ".."
import { useCallback, useState } from "react"

export type PasswordFieldProps = TextFieldProps

export const PasswordField: React.FC<PasswordFieldProps> = ({ className, ...ref }) => {
    const [isShowPassword, setIsShowPassword] = useState<boolean>(false)
    const _handleClickEye = useCallback(() => {
        setIsShowPassword(!isShowPassword)
    }, [isShowPassword])

    return (
        <TextField
            {...ref}
            className={classNames('PasswordField', className)}
            type={isShowPassword ? "text" : "password"}
            InputProps={{
                endAdornment: <InputAdornment onClick={_handleClickEye} position="end" className="cursor-pointer">{isShowPassword ? <IconEyeClose /> : <IconViewPassWord />}</InputAdornment>,
            }}
        />
    )
}

export default PasswordField