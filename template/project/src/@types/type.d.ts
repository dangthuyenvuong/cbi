declare type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U;

// export declare type AllValues<T extends Record<PropertyKey, PropertyKey>> = {
//     [P in keyof T]: { key: P, value: T[P] }
// }[keyof T]

// export declare type InvertResult<T extends Record<PropertyKey, PropertyKey>> = {
//     [P in AllValues<T>['value']]: Extract<AllValues<T>, { value: P }>['key']
// }

// export declare type ValueOf<T> = T[keyof T];

// declare type Invert<
//     T extends Record<PropertyKey, PropertyKey>
// >(obj: T): InvertResult<T>


declare type FunctionNoParam<T = unknow> = () => T 


declare type Function<Params, Return> = (params: Params) => Return

declare type JSONObject = Record<string | number, string | boolean | number | undefined | null | JSONObject>

declare type PrimitiveType = boolean | string | number | undefined | null


type DefaultAtomArg = {
    className?: string
    id?: string
} 

declare type Atom<T = {}> = React.FC<Overwrite<DefaultAtomArg, T>>

declare type AtomArg<T = {}> = Overwrite<DefaultAtomArg, T>

// declare type JSON = Record<string | number | symbol, number | string | boolean | null | undefined>