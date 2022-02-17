import { classNames } from "utils"

export type FormProps = React.HTMLAttributes<HTMLFormElement> & {
}

export const Form: React.FC<FormProps> = ({ className, children, ...ref }) => {
    return (
        <form
            {...ref}
            className={classNames('Form', className)}
        >
            {
                children
            }
        </form>
    )
}