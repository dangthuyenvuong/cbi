
export const Container: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...ref }) => {
    return (
        <div {...ref} className={`container ${ref.className ?? ''}`}>{children}</div>
    )
}