import moment from "moment";
import { Rule } from "../@types";

export const patternModel: { [key: string]: RegExp } = {
    email: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, // eslint-disable-line
    // phone: /(^([0-9]{3}) |[0-9]{3}-[0-9]{3}-[0-9]{4}$)/, //| (84|0[3|5|7|8|9])+([0-9]{8})
    phone: /[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{3,6}/, // eslint-disable-line
    // eslint-disable-next-line
    url: /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    cartNum: /^$/, // eslint-disable-line
    password: /^(?=.*[a-z])(?=.*[A-Z])((?=.*\d)|(?=.*[@$!%*?&]))[A-Za-z\d@$!%*?&]{6,}$/, // eslint-disable-line
    date: /^\d{2}\/\d{2}\/\d{4}$/ // eslint-disable-line
}



const MESSAGE_ERROR = {
    required: 'Field is required',
    pattern: 'Field not like format',
    minMax: (min?: number, max?: number) => {
        if (min && max) return `This field must be ${min}-${max} characters`
        if (min) return `This field must be greater than ${min} characters`
        if (max) return `This field must be less than ${min} characters`
    },
    inValidateDate: 'Date invalid',
    confirm: '2 Field is not the same'
}


const validateRequired = (value: PrimitiveType, r: Rule) => {
    if (
        (typeof value === 'string' && !value.trim()) ||
        ['undefined', 'null'].indexOf(typeof value) !== -1 ||
        typeof value === 'number' && value === 0 ||
        typeof value === 'boolean' && value === false
    ) {
        return r.message || MESSAGE_ERROR.required
    }


}

const validatePattern = (value: PrimitiveType, r: Rule) => {
    let pattern = r.pattern
    if (patternModel[pattern as string]) {
        pattern = patternModel[pattern as string]
    }


    if (typeof pattern === 'string') {
        pattern = new RegExp(pattern, 'gi')
    }

    if (value && !(pattern instanceof RegExp && pattern.test(value.toString()))) {
        // error = initMessage?.[name]?.pattern || t('Trường này không đúng định dạng')
        return r.message || MESSAGE_ERROR.pattern
    }
}

const validateMinMax = (value: PrimitiveType, r: Rule) => {
    value = value?.toString() || ''
    if (
        (r.min && r.max && (value.length < r.min || value.length > r.max)) ||
        (r.min && value.length < r.min) ||
        (r.max && value.length > r.max)
    ) {
        return r.message || MESSAGE_ERROR.minMax(r.min, r.max)
    }
}

// const confirm = () => { }

const validateDate = (value: PrimitiveType, r: Rule) => {
    if (moment(value as number).format('x') === 'Invalid date') {
        return r.message || MESSAGE_ERROR.inValidateDate
    }
}




export const validate = (value: PrimitiveType, rules: Rule[], form: { [k: string]: PrimitiveType }) => {

    let error: string | undefined
    rules?.forEach((r) => {
        if (error) return;
        if (r?.required) {
            error = validateRequired(value, r)
        } else if (r?.invalidDate) {
            error = validateDate(value, r)
        } else if (r?.pattern) {
            error = validatePattern(value, r)
        } else if (r?.min || r?.max) {
            error = validateMinMax(value, r)
        } else if (r.confirm && form[r.confirm] !== value) {
            error = r.message || MESSAGE_ERROR.confirm
        }
    })


    return error
}

export default validate