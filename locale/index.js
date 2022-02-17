import en from './en.js'
import vi from './vi.js'

const translate = { en, vi }

let language = 'en'

export const selectLanguage = (name) => {
    language = name
}

export const t = (str) => {
    return translate?.[language]?.[str] || str
}