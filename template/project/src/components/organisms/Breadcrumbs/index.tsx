import { IconArrowBreadcrumb, Link } from "components/atoms"
import React from "react"
import { classNames } from "utils"
import { useURL } from 'lib/cbi-react-core'


export type BreadcrumbProp = React.HTMLAttributes<HTMLUListElement> & {
}

export const Breadcrumbs: React.FC<BreadcrumbProp> = ({ children, className, ...ref }) => {
    const count = React.Children.count(children)
    return (
        <ul
            {...ref}
            className={classNames('Breadcrumbs', className)}
        >
            {
                React.Children.map(children, (child, index) => {
                    if (index < count - 1) {
                        return <li key={index}>
                            {child}
                            <IconArrowBreadcrumb />
                        </li>
                    }
                    return <li key={index}>
                        {child}
                    </li>
                })
            }
        </ul>
    )
}


export type BreadcrumbItemProps = Pick<React.HTMLAttributes<HTMLLinkElement>, 'className'> & {
    to: string
}

export const BreadcrumbItem: React.FC<BreadcrumbItemProps> = ({ to, children, className, ...ref }) => {
    let link = to
    const { path } = useURL()
    if (to === '#') link = path
    return <Link {...ref} className={classNames('BreadcrumbItem', className)} to={link}>{children}</Link>
}