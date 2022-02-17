import { classNames } from "utils"
import { Link } from ".."

type LogoProp = React.HTMLAttributes<HTMLAnchorElement> & {
    to?: string
}

export const Logo: React.FC<LogoProp> = ({ to = '/', className, ...ref }) => {
    return (
        <Link
            {...ref}
            className={classNames('Logo', className)}
            to={to}
        >
            <img src="/img/logo.webp" alt="Logo"/>
        </Link>
    )
}