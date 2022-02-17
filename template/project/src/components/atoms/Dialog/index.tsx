import { classNames } from "utils"
import DialogM, { DialogProps } from '@mui/material/Dialog';
import DialogActionsM, { DialogActionsProps } from '@mui/material/DialogActions';
import DialogContentM, { DialogContentProps } from '@mui/material/DialogContent';
import DialogContentTextM, { DialogContentTextProps } from '@mui/material/DialogContentText';
import DialogTitleM, { DialogTitleProps } from '@mui/material/DialogTitle';

export type DialogProp = DialogProps & {
    iconClose?: React.ReactNode
}

export const Dialog: React.FC<DialogProp> = ({iconClose, children, className, ...ref }) => {
    return (
        <DialogM
            {...ref}
            className={classNames('Dialog', className)}
        >
            {children}
            {
                iconClose && <div className="IconClose">{iconClose}</div>
            }
        </DialogM>
    )
}

export type DialogTitleProp = DialogTitleProps & {
}

export const DialogTitle: React.FC<DialogTitleProp> = ({ children, className, ...ref }) => {
    return (
        <DialogTitleM
            {...ref}
            className={classNames('DialogTitle', className)}
        >
            {children}
        </DialogTitleM>
    )
}

export type DialogContentProp = DialogContentProps & {
}

export const DialogContent: React.FC<DialogContentProp> = ({ children, className, ...ref }) => {
    return (
        <DialogContentM
            {...ref}
            className={classNames('DialogContent', className)}
        >
            {children}
        </DialogContentM>
    )
}

export type DialogActionsProp = DialogActionsProps & {
}

export const DialogActions: React.FC<DialogActionsProp> = ({ children, className, ...ref }) => {
    return (
        <DialogActionsM
            {...ref}
            className={classNames('DialogActions', className)}
        >
            {children}
        </DialogActionsM>
    )
}


export type DialogContentTextProp = DialogContentTextProps & {
}

export const DialogContentText: React.FC<DialogContentTextProp> = ({ children, className, ...ref }) => {
    return (
        <DialogContentTextM
            {...ref}
            className={classNames('DialogContentText', className)}
        >
            {children}
        </DialogContentTextM>
    )
}