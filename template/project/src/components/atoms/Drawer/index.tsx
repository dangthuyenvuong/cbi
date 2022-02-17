import { DrawerProps, Drawer as DrawerM } from "@mui/material"
import { forwardRef, memo, useCallback, useEffect, useImperativeHandle, useState } from "react"
import { classNames, $ } from "utils"


export type DrawerProp = DrawerProps & {
    // onOpenPopup?: Function
    // onClosePopup?: Function
}

export type DrawerRef = {
    open: FunctionNoParam,
    close: FunctionNoParam,
}

const DrawerComponent: React.ForwardRefRenderFunction<DrawerRef, DrawerProp> = ({ open, children, className, ...ref }, forwardedRef) => {
    let [isOpen, setIsOpen] = useState<boolean>()

    useEffect(() => {
        if (isOpen) {
            $('#page-content', e => e.classList.add('blur-5'))
        } else {
            $('#page-content', e => e.classList.remove('blur-5'))
        }
    }, [isOpen])
    useEffect(() => {
        setIsOpen(open)
    }, [open])

    const onOpen = useCallback(() => {
        setIsOpen(true)
    }, [])

    const onClose = useCallback(() => {
        setIsOpen(false)
        ref.onClose?.({}, 'backdropClick')
    }, [])


    useImperativeHandle(forwardedRef, () => {
        return {
            close: onClose,
            open: onOpen
        }
    }, [])


    return (
        <DrawerM
            {...ref}
            open={isOpen}
            className={classNames('Drawer', className)}
            onClose={onClose}
        >
            {children}
        </DrawerM>
    )
}

export const Drawer = memo(forwardRef(DrawerComponent))