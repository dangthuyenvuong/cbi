import { TextField as TextFieldM, TextFieldProps as TextFieldPropsM } from '@mui/material'
import { Rule } from 'lib/cbi-react-core/@types'
import React, {  } from 'react'
import { classNames } from 'utils'




export type TextFieldProps = TextFieldPropsM & {
    iconLeft?: React.ReactNode | Element
    iconRight?: React.ReactNode | Element,
    rules?: Rule[]
}
export const TextField: React.FC<TextFieldProps> = ({ iconLeft, iconRight, className, autoComplete, ...ref }) => {
    // return <TextFieldM className={`TextField ${className ?? ''}`} {...ref} autoComplete={autoComplete === 'off' ? "new-password" : ''} />


    return <div className={classNames('TextField', className, ref.size, { iconLeft, iconRight })}>
        {iconLeft && <span className='icon-left'>{iconLeft}</span>}
        <TextFieldM className="TextField-Input" {...ref} autoComplete={autoComplete === 'off' ? "new-password" : ''} />
        {iconRight && <span className='icon-right'>{iconRight}</span>}
    </div>

}

export default TextField