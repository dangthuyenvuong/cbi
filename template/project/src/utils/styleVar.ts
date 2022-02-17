export const styleVar = (obj: { [k: string]: unknown }) => {
    const res: Record<string, unknown> = {}
    for (const i in obj) {
        if (obj[i]) {
            res[`--${i}`] = obj[i]
        }
    }
    return res
}

export default styleVar