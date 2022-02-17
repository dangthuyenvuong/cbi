import { Select as SelectM, MenuItem, SelectProps, FormControl, InputLabel } from '@mui/material'
import { classNames } from "utils"
import HelperText from '../HelperText'


export const Option = MenuItem

type SelectProp = SelectProps & {
    helperText?: string
}

export const Select: React.FC<SelectProp> = ({ label, children, className, helperText, error, ...ref }) => {
    // const _onChange = useCallback(() => {

    // }, [])


    return (
        <FormControl className={classNames('Select-Control', className)} error={error}>
            {label && <InputLabel>{label}</InputLabel>}
            <SelectM
                {...ref}
                label={label}
                className={classNames('Select', className)}
            >
                {children}
            </SelectM>
            <HelperText>{helperText}</HelperText>
        </FormControl>
    )
}
