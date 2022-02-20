import classNames from "classnames"
import "./style.scss"

export interface <%= namecase =%>Props { }

export const <%= namecase =%> : Atom<<%= namecase =%>Props> = ({ className, ...rest }) => {
    return (
        <div {...rest} className={classNames('<%= namecase =%>', className)}></div>
    )
}

export default <%= namecase =%>

