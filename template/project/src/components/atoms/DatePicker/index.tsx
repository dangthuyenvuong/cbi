import { DatePickerProps, DatePicker as DatePickerM } from "@mui/lab"
import { DATE_FORMAT } from 'constant'
import moment, { Moment } from "moment"
import { useEffect, useState } from "react"
import { classNames } from "utils"
import { IconDOB, TextField } from ".."

export type DatePickerProp = Overwrite<Omit<DatePickerProps<Moment>, 'renderInput'>, Pick<React.HTMLAttributes<HTMLDivElement>, 'style' | 'className'> & {
    format?: string
    // error?: any
    helperText?: string
    value?: number | string,
    onChange?: (value: number) => void
}>

export const DatePicker: React.FC<DatePickerProp> = ({ onChange, style, value, className, format = DATE_FORMAT, helperText, ...ref }) => {
    const [val, setVal] = useState(value ? moment(value) : null)

    useEffect(() => {
        if (value && val?.toDate().getTime() !== value) {
            setVal(value ? moment(value) : null)
        }
    }, [value, val])


    useEffect(() => {
        if (val) {
            onChange?.(val.toDate().getTime())
        }
    }, [val])
    return (
        <div
            style={style}
            className={classNames('DatePicker', className, { error: helperText })}
        >
            <DatePickerM
                {...ref}
                inputFormat={format}
                components={{
                    OpenPickerIcon: () => <IconDOB />
                }}
                value={val ? moment(val) : null}
                onChange={(value) => setVal(value)}
                renderInput={(
                    params: any // eslint-disable-line
                ) => (
                    <TextField {...params} helperText={null} className="text" />
                )}
            />
            {
                helperText && <div className="p helper-text">{helperText}</div>
            }

        </div>
    )
}

export default DatePicker