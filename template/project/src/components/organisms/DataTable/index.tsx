import { classNames } from "utils"


type DataTableProp = React.HTMLAttributes<HTMLDivElement> & {
}

export const DataTable: React.FC<DataTableProp> = ({ className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('DataTable', className)}
        >
            
        </div>
    )
}