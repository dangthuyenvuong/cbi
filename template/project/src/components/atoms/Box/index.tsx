import { classNames } from "utils"
import { Box as BoxM } from '@mui/material'

type BoxProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const Box: React.FC<BoxProp> = ({ children, className, ...ref }) => {
    return (
        <BoxM
            {...ref}
            className={classNames('Box', className)}
        >
            {children}
        </BoxM>
    )
}