import LinkM from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { classNames } from "utils"
// import { Link as LinkR } from 'react-router-dom'

type LinkProp = React.HTMLAttributes<HTMLAnchorElement> & {
    to: string,
    scroll?: boolean
}


export const Link: React.FC<LinkProp> = ({ to, children, className, scroll = true, ...ref }) => {
    return (
        <LinkM
            href={to}
            scroll={scroll}
        >
            <a className={classNames('Link', className)} {...ref}>{children}</a>
        </LinkM>
    )
}


export default Link

export const NavLink: React.FC<LinkProp> = ({ to, children, className, scroll = true, ...ref }) => {
    const { pathname } = useRouter()
    return <LinkM
        href={to}
        scroll={scroll}
    >
        <a className={classNames('Link', className, { active: pathname === to })} {...ref}>{children}</a>
    </LinkM>
}
