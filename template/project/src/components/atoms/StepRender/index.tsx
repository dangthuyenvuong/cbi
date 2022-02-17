import React, { useCallback, useEffect, useImperativeHandle, useState } from "react"

type StepRenderProp = {
    current?: number,
    onChangeStep?: (step: number) => void
    children: (next: () => void, prev: () => void, step: number) => React.ReactNode
}

export type StepRenderRef = {
    next: () => void,
    prev: () => void,
    step: number
}


const START_STEP = 0
export const StepRender = React.forwardRef<StepRenderRef, StepRenderProp>(({ onChangeStep, current = 0, children }, ref) => {

    const [step, setStep] = useState<number>(current)

    useEffect(() => {
        if (current !== step) {
            setStep(current)
        }
    }, [current])

    useImperativeHandle(ref, () => {
        return {
            next,
            prev,
            step
        }
    }, [step])

    useEffect(() => {
        onChangeStep?.(step)
    }, [step])

    const next = useCallback(() => {
        if (step < React.Children.count(child) - 1) {
            setStep(step + 1)
        }
    }, [step])

    const prev = useCallback(() => {
        if (step > START_STEP) {
            setStep(step - 1)
        }
    }, [step])

    const child = children(next, prev, step)

    return <>{React.Children.toArray(child)?.[step]}</>
})

export default StepRender