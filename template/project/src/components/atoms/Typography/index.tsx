import { classNames } from "utils"


type TypographyProp = React.HTMLAttributes<HTMLDivElement> & {
    type?: 'product-name' | 'text' | 'richtext'
}

export const Typography: React.FC<TypographyProp> = ({ type = 'text', children, className, ...ref }) => {
    return (
        <p
            {...ref}
            className={classNames('Typography', className, type)}
        >
            {children}
        </p>
    )
}