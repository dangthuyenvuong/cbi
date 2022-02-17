import { classNames } from "utils"
import { Link } from ".."

type LogoProp = React.HTMLAttributes<HTMLAnchorElement> & {
    to?: string
}

export const LogoLight: React.FC<LogoProp> = ({ to = '/', className, ...ref }) => {
    return (
        <Link
            {...ref}
            className={classNames('Logo', className)}
            to={to}
        >
            <img src="/img/logo-light.webp" style={{width: '145px'}} alt="Logo"/>
        </Link>
    )
}