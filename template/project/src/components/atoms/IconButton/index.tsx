import classNames from "classnames"
import { IconButton as IconButtonM, IconButtonProps as IconButtonPropsM } from '@mui/material'

export type IconButtonProps = IconButtonPropsM & {
}

export const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
    return (
        <IconButtonM
            {...props}
            className={classNames('IconButton', className)}
            tabIndex={-1}
        >
            {children}
        </IconButtonM>
    )
}

export default IconButton