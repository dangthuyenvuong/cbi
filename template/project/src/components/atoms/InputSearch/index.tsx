import { TextFieldProps } from "@mui/material"
import { useCallback, useRef, useState } from "react"
import { classNames } from "utils"
import { IconLocation } from "../Icon"
import { TextField } from "../TextField"


type InputSearchProp = TextFieldProps & {
    value?: string
}

export const InputSearch: React.FC<InputSearchProp> = ({ className, ...ref }) => {
    const [focus, setFocus] = useState(false)
    const inputRef = useRef<HTMLDivElement>(null)

    const onFocus = useCallback(() => {
        setFocus(true)
        setTimeout(() => {
            const input = inputRef.current?.querySelector<HTMLInputElement>('input')
            if(input){
                input.selectionStart =  input.selectionEnd = input.value.length
            }
        })
    }, [])

    const onBlur = useCallback(() => {
        setFocus(false)
    }, [])


    return (
        <div
            className={classNames('InputSearch', className, { focus })}
            ref={inputRef}
        >
            <IconLocation/>
            <TextField {...ref} focused={focus} onFocus={onFocus} onBlur={onBlur} />
        </div>
    )
}