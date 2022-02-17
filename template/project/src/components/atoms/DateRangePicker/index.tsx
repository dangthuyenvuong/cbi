import classNames from "classnames"


export type DateRangePickerProps = React.HTMLAttributes<HTMLDivElement> & {
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ className, ...ref }) => {
    return (
        <div
            {...ref}
            className={classNames('DateRangePicker', className)}
        >
        </div>
    )
}

export default DateRangePicker