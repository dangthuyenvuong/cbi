import { classNames } from "utils"
import { Link as LinkR } from 'react-router-dom'

export { NavLink } from 'react-router-dom'

type LinkProp = {
    to: string
    onClick?: (ev: React.MouseEvent<HTMLAnchorElement>) => void
}

export const Link: Atom<LinkProp> = ({ to, className, ...ref }) => {
    return (
        <LinkR
            {...ref}
            to={to}
            className={classNames('Link', className)}
        >
        </LinkR>
    )
}
export default Link
