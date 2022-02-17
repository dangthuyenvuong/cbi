import { BadgeProps, Badge as BadgeM } from "@mui/material"
import { classNames } from "utils"


type BadgeProp = BadgeProps

export const Badge: React.FC<BadgeProp> = ({ badgeContent, children, className, ...ref }) => {
    if (!badgeContent) return <>{children}</>
    return (
        <BadgeM
            {...ref}
            badgeContent={badgeContent}
            className={classNames('Badge', className)}
        >
            {children}
        </BadgeM>
    )
}