
export type ConditionRenderProps = {
    check?: boolean
}

export const ConditionRender: React.FC<ConditionRenderProps> = ({ check, children }) => {
    if (!check) return null
    return <>{children}</>
}

export default ConditionRender