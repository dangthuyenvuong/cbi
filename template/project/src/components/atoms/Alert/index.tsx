import { AlertProps, Alert as AlertM } from "@mui/material"
import { classNames } from "utils"

export type AlertProp = AlertProps & {
}

export const Alert: React.FC<AlertProp> = ({ children, className, ...ref }) => {

    return (
        <AlertM
            {...ref}
            className={classNames('Alert', className)}
        >
            {children}
        </AlertM>
    )
}