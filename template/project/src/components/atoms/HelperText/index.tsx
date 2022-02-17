import { classNames } from "utils"


export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement> & {
}

export const HelperText: React.FC<HelperTextProps> = ({ className, children, ...ref }) => {
    if (!children) return null
    return (
        <p
            {...ref}
            className={classNames('HelperText', className)}
        >
            {children}
        </p>
    )
}

export default HelperText