declare type PrimitiveType = boolean | string | number | undefined | null

declare type URLGetParams = { [key: string]: string | number | boolean | undefined }

declare type JSONObject = Record<string | number, string | boolean | number | undefined | null | JSONObject>

declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

type DefaultAtomArg = {
    className?: string
    id?: string,
    style?: React.CSSProperties
}

declare type Atom<T = {}> = React.FC<Overwrite<DefaultAtomArg, T>> // eslint-disable-line

declare type AtomArg<T = {}> = Overwrite<DefaultAtomArg, T & { children?: any }> // eslint-disable-line

declare type HttpResponse<T = undefined> = {
    data?: T,
    message?: string
    error?: string
    statusCode?: number
}


declare type FunctionNoParam<T = unknow> = () => T

declare type Function<Params, Return> = (params: Params) => Return