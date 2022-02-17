
import { AuthToken } from "@types";
import { cache } from "../utils";
import { ISSERVER } from "../utils/nextjs";
import AbstractHttp from "./AbstractHttp";

export class Http extends AbstractHttp {
    url_refresh_token = '/refresh-token';
    setToken(token: AuthToken): void {
        if(!ISSERVER){
            // localStorage.setItem('token', JSON.stringify(token))
            cache.setItem('token', JSON.stringify(token))
        }
    }
    getToken() {
        if(!ISSERVER){
            // return JSON.parse(localStorage.getItem('token') || '{}')?.accessToken as AuthToken || ''
            return JSON.parse(cache.getItem('token') || 'null')?.accessToken as AuthToken || ''
        }
        return null
    }
    removeToken(){
        if(!ISSERVER){
            // localStorage.removeItem('token')
            cache.removeItem('token')
        }
    }

    // eslint-disable-next-line
    setupHeader(): any | RequestInit['headers'] {
        const token = this.getToken()
        // eslint-disable-next-line
        const headers: any = {}
        headers['Content-Type'] = 'application/json'
        if(token){
            headers['Authorization'] = `Bearer ${token}`
            // headers['Access-Control-Allow-Origin'] = '*'
            // headers['Access-Control-Allow-Credentials'] = true
        }

        return headers
    }
}

export const http = new Http()