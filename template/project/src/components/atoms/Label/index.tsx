import { FormControlLabel, FormControlLabelProps } from '@mui/material'

type LabelProp = FormControlLabelProps & {
}

export const Label: React.FC<LabelProp> = ({ children, className, ...ref }) => {
    return (
        <FormControlLabel
            {...ref}
        >
            {children}
        </FormControlLabel>
    )
}