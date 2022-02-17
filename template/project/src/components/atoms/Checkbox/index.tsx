/* eslint-disable @typescript-eslint/no-explicit-any */
import { classNames } from "utils"
import { Checkbox as CheckboxM, CheckboxProps } from '@mui/material'
// import { Checkbox as CheckboxM, CheckboxProps } from '@mui/material'

import React from "react"

// type CheckboxProp = React.HTMLAttributes<HTMLLabelElement> & {
//     value?: any
//     checked?: any
//     icon?: React.ReactNode | Element
//     checkedIcon?: React.ReactNode | Element
//     callback?: (param: string) => void
//     onChange?: (e: any) => void
// }

// export const Checkbox: React.FC<CheckboxProp> = ({ children, checked, onChange, value, icon, checkedIcon, className, callback, ...ref }) => {
//     return (
//         <label
//             {...ref}
//             className={classNames('Checkbox', className)}
//         >
//             <CheckboxM
//             {...(checked ? checked={checked} : {})}
//             value={value}
//             onChange={onChange ? onChange : (e) => {callback? callback(e.target.value) : null}}
//             {...(icon ? icon={icon} : {})}
//             {...(checkedIcon ? checkedIcon={checkedIcon} : {})}
//             />
//             <div >{children}</div>
//         </label>
//     )
// }

type CheckboxProp = Overwrite<CheckboxProps, {
    onChange?(checked: boolean): void
}>

export const Checkbox: React.FC<CheckboxProp> = ({ className, onChange, ...ref }) => {

    return (
        <CheckboxM
            {...ref}
            className={classNames('Checkbox', className)}
            onChange={e => onChange?.(e.currentTarget.checked)}
        />
    )
}
