export const generateMock = (num: number, callback: Function, randomNumber: boolean = false) => {
    return [...Array(randomNumber ? generateNumber(0, num): num)].map(() => callback())
}

export const generateNumber = (min: number, max: number, float: boolean = false) => {
    return Math.round(Math.random() * max + min) + (float ? Math.round(Math.random() * 100) / 100 : 0)
}

export const randomValue = (...arr: any[]) => {
    return arr[generateNumber(0, arr.length - 1)]
}