import { classNames } from "utils"
import { RadioGroup as RadioGroupM, Radio as RadioM, RadioGroupProps, RadioProps } from '@mui/material'
import { Label } from ".."
import { ReactElement } from "react"


type RadioGroupProp = RadioGroupProps & {
    defaultFirstValue?: boolean
}

export const RadioGroup: React.FC<RadioGroupProp> = ({ children, className, ...ref }) => {
    return <RadioGroupM {...ref} className={classNames("RadioGroup", className)}> {children}</ RadioGroupM >
}

type RadioProp = RadioProps

export const Radio: React.FC<RadioProp> = ({ defaultChecked, children, className, ...ref }) => {
    return (
        <Label
            defaultChecked={defaultChecked}
            control={
                <RadioM
                    {...ref}
                    className={classNames('Radio', className)}
                />}
            label={children as ReactElement}
        />
    )
}
