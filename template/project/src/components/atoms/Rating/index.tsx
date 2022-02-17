import { classNames } from "utils"
import { Rating as RatingM, RatingProps } from '@mui/material'

import React from "react"

type RatingProp = RatingProps & {
    name?: string
    value?: number
}

export const Rating: React.FC<RatingProp> = ({ name, size = 'medium', color, value, className, readOnly = true, ...ref }) => {
    return (
        <RatingM
            {...ref}
            className={classNames('Rating', className, { [size]: true })}
            name={name}
            value={value}
            readOnly={readOnly}
            size={size || 'medium'}
            style={{ '--color': color || "#ff6d6f" } as React.CSSProperties}
        />
    )
}