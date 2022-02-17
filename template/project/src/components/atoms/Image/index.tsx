import ImageM, { ImageProps as ImagePropsM } from 'next/image'

import classNames from "classnames"

export type ImageProps = Overwrite<ImagePropsM, {
    src: string
    width?: number
    height?: number
}>

export const Image: React.FC<ImageProps> = ({ className, layout, src, ...props }) => {
    return (
        <ImageM
            {...props}
            src={src}
            layout={layout || 'fill'}
            className={classNames('Image', className)}
        />
    )
}

export default Image