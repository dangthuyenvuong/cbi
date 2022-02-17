import { Snackbar as SnackbarM, SnackbarProps } from "@mui/material"
import { classNames } from "utils"

export type SnackbarProp = SnackbarProps & {
}

export const Snackbar: React.FC<SnackbarProp> = ({ children, className, ...ref }) => {
    return (
        <SnackbarM
            {...ref}
            className={classNames('Snackbar', className)}
        >
            {children}
        </SnackbarM>
    )
}