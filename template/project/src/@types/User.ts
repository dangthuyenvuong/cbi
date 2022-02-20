export interface User {
    id?: string,
    firstName: string
    lastName: string
    fullName?: string
    email: string
    phone: string
    gender: string
    avatar: string
    attribute: any[]
    dob: number
}

export type PayloadUpdateUser = {
    firstName: string,
    lastName: string,
    identityNum: string,
    phone: string,
    country: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dob: number,
    gender: 'male' | 'female',
    email: string
}


export interface PayloadUpdateProfile {
    firstName: string
    identityNum: string
    lastName: string
    phone: string
    dob: number
    gender: 'male' | 'female'
    status: 'active'
}

export interface ResponseUpdateProfile {
    email?: string
    identityNum: string
    firstName: string
    lastName: string
    phone: string
    dob: number
    gender: 'male' | 'female'
}


export interface PayloadRegister {
    username: string
    email: string
    password?: string
    passwordConfirm?: string
}

export interface ResponseRegister {
    username: string
    password: string
}