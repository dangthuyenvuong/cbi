import { Button, TextField } from "components/atoms"
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from "react"
import { classNames } from "utils"


// const ENTER_KEY = 'Enter'
export type InputQuantityProp = Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> & {
    value?: number,
    onChange?: (value: number) => void
}

export type InputQuantityRef = {
    value: number
}

const InputQuantityForwaref: React.ForwardRefRenderFunction<InputQuantityRef, InputQuantityProp> = ({ value: initValue = 1, onChange, className, ...ref }, forwardRef) => {

    const [value, setValue] = useState(initValue)
    const [disable, setDisable] = useState<boolean>(false)
    useEffect(() => {
        if (value !== initValue && value > 0) {
            onChange?.(value)
        }
        setDisable(value === 1 ? true : false)
    }, [value])
    
    useImperativeHandle(forwardRef, () => {
        return {
            value
        }
    }, [value])

    const increment = useCallback(() => {
        setValue(value + 1)
    }, [value])

    const decrement = useCallback(() => {
        if ((value - 1) > 0) setValue(value - 1)
    }, [value])
    const _onBlur = useCallback(
        () => {
            if(Number(value) <= 0){
                setValue(1)
            }
        },
        [value],
    )


    return (
        <div
            {...ref}
            className={classNames('InputQuantity', className)}
        >
            <Button disabled={disable} transparent className="btn-decrement" disableElevation onClick={decrement}>-</Button>
            <TextField type={"number"} value={value} onBlur={_onBlur} onChange={ev => setValue(parseInt(ev.currentTarget.value || '0'))}/>
            <Button transparent className="btn-increment" disableElevation onClick={increment}>+</Button>
        </div>
    )
}

export const InputQuantity = forwardRef(InputQuantityForwaref)