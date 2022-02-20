import { Button as ButtonM, ButtonProps, CircularProgress } from '@mui/material'
import useURL from 'lib/cbi-react-core/hooks/useURL'
import React from 'react'
import { classNames, styleVar } from 'utils'


export type ButtonProp = Overwrite<ButtonProps, {
    variant?: 'outlined' | 'contained' | 'text',
    link?: string,
    type?: 'normal' | 'lightly-border' | 'phone' | 'lightly' | 'outline'
    white?: boolean
    transparent?: boolean,
    size?: 'large' | 'middle' | 'small' | number,
    shadow?: boolean,
    minWidth?: number
    htmlType?: 'submit' | 'reset'
    rounded?: boolean
    loading?: boolean
    startIcon?: React.ReactNode
    endIcon?: React.ReactNode
    loadingPosition?: 'start' | 'end'
    fontSize?: `${number}${'px' | 'rem'}`
    disabled?: boolean
    scroll?: boolean
}>

export const Button: React.FC<ButtonProp> = ({
    disabled,
    loading,
    fontSize,
    loadingPosition = 'start',
    startIcon,
    endIcon,
    rounded = true,
    htmlType,
    minWidth,
    link,
    shadow = false,
    size = 'middle',
    white, transparent,
    type = 'normal',
    children,
    variant = 'contained',
    // scroll,
    ...ref }) => {
    const { navigate } = useURL()
    return <ButtonM
        {...ref}
        {...(link ? { onClick: (ev: React.MouseEvent<HTMLButtonElement>) => { ref.onClick?.(ev); navigate(link, undefined) } } : {})}
        className={classNames('button Button', `type-${type}`, `size-${size}`, ref.className, { white, transparent, shadow, rounded, disabled })}
        variant={variant}
        style={{
            ...ref.style,
            ...styleVar({
                minWidth: typeof minWidth === 'number' ? `${minWidth}px` : '',
                height: typeof size === 'number' ? `${size}px` : '',
                fontSize
            })
        } as React.CSSProperties}
        type={htmlType}
        disabled={loading || disabled}
    >
        {
            loading && loadingPosition === 'start' && <CircularProgress color="inherit" size={20} className="m-r-15" />
        }
        {!loading && loadingPosition !== 'start' && startIcon}
        {children}
        {!loading && loadingPosition !== 'end' && endIcon}
        {
            loading && loadingPosition === 'end' && <CircularProgress color="inherit" size={20} className="m-l-15" />
        }
    </ButtonM >
}