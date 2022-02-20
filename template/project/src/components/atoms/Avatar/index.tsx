import { classNames } from "utils"
import { iconAvatarDefault } from "../Icon"



type AvatarProp = React.HTMLAttributes<HTMLDivElement> & {
    src?: string,
    size?: number
}

export const Avatar: React.FC<AvatarProp> = ({ size = 40, src = iconAvatarDefault, className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('Avatar border', className)}
            style={{ '--width': `${size}px` } as React.CSSProperties}
        >
            <img src={src} alt="Avatar" />
        </div>
    )
}

