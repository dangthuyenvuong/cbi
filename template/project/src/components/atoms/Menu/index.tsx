import React, { useCallback, useState } from "react"
import { classNames } from "utils"
import { IconArrowDown } from ".."
import { NavLink } from "../Link"


type MenuProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const Menu: React.FC<MenuProp> = ({ children, className, ...ref }) => {
    return (
        <nav
            {...ref}
            className={classNames('Menu', className)}
        >
            <ul>
                {children}
            </ul>
        </nav>
    )
}

type MenuItemProp = Overwrite<React.HTMLAttributes<HTMLAnchorElement>, {
    to: string,
    title?: React.ReactNode
}>

export const MenuItem: React.FC<MenuItemProp> = ({ children, title, onClick, to, className, ...ref }) => {
    const [isOpen, setIsOpen] = useState(false)
    const _onClick = useCallback((ev: React.MouseEvent<HTMLAnchorElement>) => {
        ev.preventDefault()
        setIsOpen(!isOpen)
        onClick?.(ev)
    }, [isOpen])

    return (
        <li
            className={classNames('MenuItem', className, { haveSub: title, isOpen })}
        >
            {
                title ? <>
                    <NavLink to={to} onClick={_onClick} className={'flex menu-title'}>
                        {title} <IconArrowDown className="arrow-down flex items-center justify-center" />
                    </NavLink>
                    <Menu className={classNames({ isOpen })}>
                        {children}
                    </Menu>
                </> :
                    <NavLink to={to} onClick={onClick}>{children}</NavLink>
            }

        </li>
    )
}
