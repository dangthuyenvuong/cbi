// import { JSONObject } from '@types'
import { AuthToken } from '@types'
import { HTTPStatus } from '../constants'
import { URLGetParams, URLHelper } from '../utils'
import Error404 from './ThrowError/Error404'

const RESPONSE_STATUS = {
    NO_CONTENT: 204,
    FORBIDDEN: 403
}

export default class AbstractHttp {
    protected url_refresh_token = ''
    public setToken(token: AuthToken) { 
        localStorage.setItem('token', JSON.stringify(token))
    }
    public getToken(): null | AuthToken {
        return JSON.parse(localStorage.getItem('token') || '{}')?.accessToken as AuthToken
    }
    public removeToken() { 
        // no error
    }
    protected setupHeader(): RequestInit['headers'] {
        const token = this.getToken()
        return {
            Authorization: `Bearer ${token?.accessToken ?? ''}`,
            'Content-Type': 'application/json'
        }
    }

    protected async handleStatus(response: Response): Promise<boolean | string> {
        switch (response.status) {
            case HTTPStatus.FORBIDEN:
                return !!(await this.refreshToken())
            case HTTPStatus.UNAUTHORIZED:
                throw new Error404({
                    status: 401,
                    message: 'Unauthorized'
                })

        }
        return true
    }
    protected async refreshToken() {
        let token = this.getToken()
        if (token) {
            const newToken = await this.post<{ accessToken: string }>('/refresh-token', {
                headers: {
                    Authorization: token
                }
            })
            this.setToken({
                ...token,
                ...newToken
            })
        }

        return this.getToken()

    }
    fetch<T>(url: string, options?: RequestInit) {
        options = Object.assign(options, { headers: this.setupHeader() })
        return this.callApi<T>(url, options)
    }

    get<T>(url: string, data?: URLGetParams, headers?: RequestInit['headers']): Promise<T> { // eslint-disable-line
        // if (options?.body) {
        //     url += URLHelper.parse(options?.body || {} as any)
        // }
        // options = Object.assign(options || {}, this.setupHeader(), { method: 'GET' })
        if(data){
            url += URLHelper.searchString(data)
        }
        return this.callApi<T>(url, { ...{ headers }, method: 'GET' })
    }

    post<T>(url: string, data?: any | FormData, headers?: RequestInit['headers']): Promise<T> { // eslint-disable-line
        // options = Object.assign(options, this.setupHeader(), { method: 'POST' })
        return this.callApi<T>(url, { ...{ body: JSON.stringify(data), headers }, method: 'POST' })
    }
    put<T>(url: string, data?: any | FormData, headers?: RequestInit['headers']): Promise<T> { // eslint-disable-line
        // options = Object.assign(options, this.setupHeader(), { method: 'PUT' })
        return this.callApi<T>(url, { ...{ body: JSON.stringify(data), headers }, method: 'PUT' })
    }
    delete<T>(url: string, data?: any | FormData, headers?: RequestInit['headers']): Promise<T> { // eslint-disable-line
        // options = Object.assign(options || {}, this.setupHeader(), { method: 'DELETE' })
        return this.callApi<T>(url, { ...{ body: JSON.stringify(data), headers }, method: 'DELETE' })
    }

    patch<T>(url: string, data?: any | FormData, headers?: RequestInit['headers']): Promise<T> { // eslint-disable-line
        // options = Object.assign(options, this.setupHeader(), { method: 'POST' })
        return this.callApi<T>(url, { ...{ body: JSON.stringify(data), headers }, method: 'PATCH' })
    }

    private async callApi<T>(...params: [input: RequestInfo, init?: RequestInit]) {

        try{
            // eslint-disable-next-line
            const options: any = Object.assign(params?.[1] || {})

            if (options.body) {
                // options.body = JSON.stringify(options.body)
            }
            const res = await fetch(params[0], {
                ...options,
                headers: {
                    ...this.setupHeader(),
                    ...options.headers
                },
                // mode: 'no-cors',
            });
    
            await this.handleStatus(res)
            if(res.status === RESPONSE_STATUS.FORBIDDEN){
                return {
                    error: 'Forbidden',
                    message: 'Forbidden'
                } as unknown as T
            }
            if(res.status === RESPONSE_STATUS.NO_CONTENT){
                return {} as T
            }
    
            return await res.json() as T
        }catch(err){
            console.error(err)
            return {} as T
        }
        
    }
}
