export declare type URLGetParams = { [key: string]: string | number | boolean | undefined }

export const URLHelper = {
    object<T>(): Partial<T> {
        try {
            const search = window.location.search.substring(1);
            const obj = JSON.parse(
                '{"' +
                decodeURI(search)
                    .replace(/"/g, '\\"')
                    .replace(/&/g, '","')
                    .replace(/=/g, '":"') +
                '"}',
            );
            return obj;
        } catch {
            return {} as Partial<T>;
        }
    },
    parse(options: URLGetParams) {
        const str = []

        for (const p in options) {
            if(typeof options[p] === 'undefined') continue
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(options[p] as string))
        }

        return str.join("&")
    },
    /**
     * 
     * @returns 
     * @description Return Object Query Url
     */
    searchObject<T extends {[k: string]: string}>(defaultValue: JSONObject = {}): Partial<{[k in keyof T]: T[k]}>  {
        try {
            const search = window.location.search.substring(1);
            const obj = JSON.parse(
                '{"' +
                decodeURI(search)
                    .replace(/"/g, '\\"')
                    .replace(/&/g, '","')
                    .replace(/=/g, '":"') +
                '"}',
            );
            return {...defaultValue, ...obj};
        } catch {
            return defaultValue as Partial<{[k in keyof T]: T[k]}>
        }
    },
    searchString(options: URLGetParams) {
        const str = []

        for (const p in options) {
            if(typeof options[p] === 'undefined') continue
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(options[p] as string))
        }

        const value = str.join("&")
        if (value) return '?' + value
        return value
    },
    get(name?: string) {
        // eslint-disable-next-line
        const param = URLHelper.object<any>()
        if (name) return param?.[name] || undefined
        return param
    },
    updateQueryURL(options: URLGetParams) {
        // history.push(URLHelper.changeQueryURL(options))
    },
    changeQueryURL(data: JSONObject, pathname = '') {

        const object : any = { // eslint-disable-line
            ...URLHelper.searchObject(),
            ...data
        }

        for(const i in object){
            if(typeof object[i] === 'undefined' || object[i] === '') delete object[i]
        }


        try{
            return window?.location?.pathname  + '?' + Object.keys(object).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
            }).join('&')
        }catch(err){
            return pathname  + '?' + Object.keys(object).map(function (key) {
                return encodeURIComponent(key) + '=' + encodeURIComponent(object[key])
            }).join('&')
        }
    }
}
