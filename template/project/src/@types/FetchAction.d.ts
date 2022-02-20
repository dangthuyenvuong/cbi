import { PayloadAction } from "@reduxjs/toolkit"

// declare type FetchAction<T, R = any> = {
//     callback?: (res: HttpResponse<R>) => void,
//     data: T
// }


declare type FetchAction<T, R = any> = PayloadAction<{
    callback?: (res: HttpResponse<R>) => void,
    data: T
}>