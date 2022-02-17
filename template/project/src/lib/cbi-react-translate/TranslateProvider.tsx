import { storage } from "lib/cbi-react-core";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";

type TranslateContextType = {
    t: (name?: string) => string,
    selectLanguage: (name: string) => void,
    language: string
}

const TranslateContext = createContext<TranslateContextType>({} as TranslateContextType)

type TranslateProp = {
    language?: string,
    translate?: { [key: string]: { [key: string]: string } }
}

let _selectLanguage: (name: string) => void
let _t: (name?: string) => string = (key?: string) => key || ''
let _language: string


// let _state: TranslateProp

export const TranslateProvider: React.FC<TranslateProp> = ({ children, language = 'en', translate = {} }) => {
    const [state, setState] = useState<Required<TranslateProp>>({
        language,
        translate
    })

    useEffect(() => {
        storage.set('language', state.language)
    }, [state.language])

    const t = useCallback((name?: string) => {
        if (!name) return ''
        return state.translate?.[state.language]?.[name] || name
    }, [state])

    const selectLanguage = useCallback((name: string) => {
        setState({
            ...state,
            language: name
        })
    }, [state])

    useEffect(() => {

        _t = t
        // _state = state
        _selectLanguage = selectLanguage
        _language = state.language

    }, [state])


    return (
        <TranslateContext.Provider value={{ t, selectLanguage, language: state.language }}>
            {children}
        </TranslateContext.Provider>
    )
}

export const useTranslate = () => useContext(TranslateContext)

type TranslateType = () => ReturnType<typeof useTranslate>
export const locale: TranslateType = () => ({ t: _t, selectLanguage: _selectLanguage, language: _language })

/**
 * 
 * @param text Text to translate
 * @returns String
 * @example t('Hello') => Xin chào
 */

export const t = (text?: string) => _t(text)

