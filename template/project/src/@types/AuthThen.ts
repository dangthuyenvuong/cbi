export interface AuthToken {
    accessToken: string
    refreshToken: string
    isFirstLogin: boolean
}



export type PayloadLogin = {
    username: string
    password: string
}

export interface ResponseLogin {
    accessToken: string
    refreshToken: string
    isFirstLogin: boolean
}



export type PayloadLoginWithEmail = {
    username: string
    password: string
}