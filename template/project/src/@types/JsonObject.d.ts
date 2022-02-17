export type JSONValue =
    | string
    | number
    | boolean
    | JSONObject
    | JSONArray;
interface JSONArray extends Array<JSONValue> { }
declare type JSONObject = {
    [x: string]: JSONValue;
}




// declare type Json = {
//     [x: string] : number | string | undefined | boolean
// }