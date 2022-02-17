
import { AuthToken } from "@types";
import AbstractHttp from "lib/cbi-react-core/Http/AbstractHttp";
import { GetServerSidePropsContext } from "next";

export class NextHttp extends AbstractHttp {
    url_refresh_token = '/refresh-token';
    ctx?: GetServerSidePropsContext
    constructor(ctx?: GetServerSidePropsContext) {
        super()
        this.ctx = ctx
    }
    setToken(token: AuthToken): void {
        console.log('setToken')
    }
    getToken() {
        if (this.ctx) {
            const { token } = this.ctx.req.cookies
            try {
                if (token) {
                    const authToken = JSON.parse(token)
                    return authToken.accessToken
                }
            } catch (err) { console.error(err) }

            console.log(JSON.parse(token).accessToken)
        }

        return null
    }
    removeToken() { 
        console.log('removeToken')
    }

    // eslint-disable-next-line
    setupHeader(): any | RequestInit['headers'] {
        const token = this.getToken()

        // eslint-disable-next-line
        const headers: any = {}
        headers['Content-Type'] = 'application/json'
        if (token) {
            headers['Authorization'] = `Bearer ${token}`
        }

        return headers
    }
}
