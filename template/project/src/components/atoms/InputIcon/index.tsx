import { TextFieldProps } from "@mui/material"
import React from "react"
import { classNames } from "utils"
import { TextField } from "../TextField"


type InputIconProp = React.HTMLAttributes<HTMLDivElement> & TextFieldProps & {
    icon: React.ReactNode,
    value?: string
}

export const InputIcon: React.FC<InputIconProp> = ({ icon, value, className, ...ref }) => {
    return (
        <div
            className={classNames('InputIcon', className)}
        >
            {icon}
            <TextField value={value} {...ref}/>
        </div>
    )
}