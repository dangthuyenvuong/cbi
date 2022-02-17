import { classNames } from "utils"


type ChipProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const Chip: React.FC<ChipProp> = ({ className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('Chip', className)}
        >
        </div>
    )
}