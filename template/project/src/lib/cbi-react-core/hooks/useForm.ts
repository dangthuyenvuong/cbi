import React, { useState } from "react"
import { Rule } from "../@types"
import { validate } from "../utils"


// type MessageState = {}

type RuleState<T extends Record<string, unknown>> = Partial<{
    [key in keyof T]: Rule[]
}>

// type MessageState<T extends Record<string, unknown>> = Partial<{
//     [k in keyof T]: {
//         [k in keyof RuleItem]: string
//     }
// }>

export type FormSubmit<T> = (item: T) => void

export type Validate = Rule[]

type ErrorState<T> = Partial<{
    [key in keyof T]: string
}>

type RegisterResponse<T> = {
    name: keyof T,
    // eslint-disable-next-line
    onChange: (event: any) => void,// eslint-disable-line
    defaultValue?: string,
    value?: any, // eslint-disable-line
    error?: boolean
    helperText?: string,
}

export type UseFormRegister<T> = (name: keyof T, rule?: Rule[], message?: string) => RegisterResponse<T>

export type UseFormReturn<T> = {
    register: UseFormRegister<T>,
    handleSubmit: (callback: (form: T) => void) => (ev: React.FormEvent) => void,
    form: T,
    checkError: () => boolean,
    checkErrorOneField: (value: string) => boolean,
    error: ErrorState<T>,
    // eslint-disable-next-line
    setValues: (values: { [k in keyof T]?: T[k] }) => void
}

type UseFormOptions = {
    uncontrolled?: boolean,
}


export function useForm<T extends Record<string, any>>(initvalue = {}, options: UseFormOptions = { uncontrolled: true }): UseFormReturn<T> { // eslint-disable-line

    // eslint-disable-next-line
    const [form, setForm] = useState<any>(initvalue || {})
    const [error, setError] = useState<ErrorState<T>>({})
    // const [] = useState<RuleState<T>>({})
    const initRule: RuleState<T> = {}

    // eslint-disable-next-line
    const inputChange = (name: string) => (ev: any) => {

        let value: any // eslint-disable-line
        if(['string' , 'number' , 'boolean'].includes(typeof ev)){
            value = ev
        }else if(ev.currentTarget || ev.target){
            value = ev?.currentTarget?.value || ev?.target?.value
        }else{
            value = ev
        }


        if (ev?.currentTarget?.getAttribute('type') === 'checkbox') {
            if (value && value !== 'true' && value !== 'false') {
                form[name] = ev.currentTarget.checked ? value : ''
            } else {
                form[name] = ev.currentTarget.checked
            }

        } else {
            form[name] = value
        }

        if (!options.uncontrolled) {
            setForm({ ...form })
        }
        checkErrorOneField(name)
    }

    function check() {
        // eslint-disable-next-line
        const errorObj: any = {}
        for (const name in initRule) {
            const field = initRule[name]

            if (field) {
                const error = validate(form[name], field, form)
                if (error) {
                    errorObj[name] = error
                }
            }
        }
       
        return errorObj
    }

    function register(name: keyof T, rules?: Rule[]) {
        if (!form[name]) {
            form[name] = ''
        }

        if (rules) {
            initRule[name] = rules
        }

        const res: RegisterResponse<T> = {
            name,
            onChange: inputChange(name as string),
            // defaultValue: form[name],
            ...(error[name] ? { helperText: error[name], error: true } : {})
        }

        if (options.uncontrolled) {
            res.defaultValue = form[name]
        } else {
            res.value = form[name]
        }

        return res
    }
    function handleSubmit(callback: (form: T) => void) {
        return (ev: React.FormEvent) => {

            ev.preventDefault()
            const errorObject = check()
            console.log(errorObject);
            
            if (Object.keys(errorObject).length === 0) {
                callback(form)
            }

            setError(errorObject)
        }
    }
    function checkError() {
        const errorObject = check()
        setError(errorObject)
        if (Object.keys(errorObject).length === 0) {
            return true
        }
        return false
    }


    function checkOneField(name: string) {

        // eslint-disable-next-line
        const errorObj: any = {}

        const field = initRule[name]

        if (field) {
            const error = validate(form[name], field, form)
            if (error) {
                errorObj[name] = error
            }
        }

        setError({
            ...error,
            ...errorObj
        })

        return errorObj
    }
    function checkErrorOneField(fieldName: string) {
        const errorObject = checkOneField(fieldName)
        setError({
            ...error,
            [fieldName]: errorObject[fieldName]
        })
        if (Object.keys(errorObject).length === 0) {
            return true
        }
        return false
    }

    // eslint-disable-next-line
    function setValues(values: { [k in keyof T]?: any }) {
        setForm({ ...form, ...values })
    }

    return {
        checkError,
        checkErrorOneField,
        register,
        handleSubmit,
        form,
        error,
        setValues,
    }
}