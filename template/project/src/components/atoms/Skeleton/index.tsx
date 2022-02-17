import { classNames } from "utils"
import { Skeleton as SkeletonM, SkeletonProps as SkeletonPropsM } from "@mui/material"


export type SkeletonProps = SkeletonPropsM

export const Skeleton: React.FC<SkeletonProps> = ({ className, ...ref }) => {
    return (
        <SkeletonM
            {...ref}
            className={classNames('Skeleton', className)}
        />
    )
}

export default Skeleton