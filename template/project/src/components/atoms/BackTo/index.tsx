import useURL from "lib/cbi-react-core/hooks/useURL"
import React, { useCallback } from "react"
import { classNames } from "utils"
import { IconBack } from "../Icon"
import { Link } from "../Link"

export type BackToProp = React.HTMLAttributes<HTMLDivElement> & {
    to?: string
}

export const BackTo: React.FC<BackToProp> = ({ to, children, className, ...ref }) => {
    const { goBack } = useURL()

    const _onClick = useCallback((ev: React.MouseEvent) => {
        if (!to) {
            goBack()
            ev.preventDefault()
        }
    }, [to])
    return (
        <div
            {...ref}
            className={classNames('BackTo flex items-center gap-5', className)}
        >
            <IconBack />
            <Link to={to || ''} onClick={_onClick} className="color-main-bold">{children}</Link>
        </div>
    )
}