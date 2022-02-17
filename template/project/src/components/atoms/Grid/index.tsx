import { classNames } from "utils"


export type GridProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const Grid: React.FC<GridProp> = ({ className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('Grid', className)}
        >
        </div>
    )
}

export default Grid