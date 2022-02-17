export type Rule = {
    min?: number,
    max?: number,
    required?: true,
    pattern?: RegExp | 'email' | 'phone' | 'url' | 'password' | 'date',
    confirm?: string
    invalidDate?: boolean
    check?: boolean
    message?:  string
}

