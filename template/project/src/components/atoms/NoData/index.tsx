import { classNames } from "utils"
import { IconNoData } from '../Icon'

type NoDataProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const NoData: React.FC<NoDataProp> = ({ className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('NoData flex-col text-center justify-center', className)}
        >
            <IconNoData />
            {/* <Typography className="text-20">No visit history available</Typography> */}
        </div>
    )
}