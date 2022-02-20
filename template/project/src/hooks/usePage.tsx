
import { useAllState } from "lib/cbi-react-core";
import React, { createContext, useCallback, useContext } from "react";
import { useIsLogin } from "store/auth";

export interface PageContextProps {
    toggleMenu: (flag: boolean) => void
    toggleRequestLogin: (flag: boolean) => void
    clear: () => void
    onRequiredLogin: (callback?: FunctionNoParam) => (ev: React.MouseEvent) => void
    state: {
        openMenu: boolean,
        isOpenRequestPopup: boolean
    }
}

const initialState: PageContextProps['state'] = {
    openMenu: false,
    isOpenRequestPopup: false
}

const Context = createContext<PageContextProps>({} as PageContextProps)

export const PageProvider: React.FC = ({ children }) => {
    const [state, setState] = useAllState<PageContextProps['state']>(initialState)

    const isLogin = useIsLogin()

    const toggleMenu = useCallback((flag: boolean) => {
        setState({ openMenu: flag })
    }, [])

    const toggleRequestLogin = useCallback((flag: boolean) => {
        setState({ isOpenRequestPopup: flag })
    }, [])

    const clear = useCallback(() => {
        setState(initialState)
    }, [])

    const onRequiredLogin: PageContextProps['onRequiredLogin'] = useCallback((callback) => (ev) => {
        if (isLogin) {
            callback?.()
        } else {
            ev.preventDefault()
        }
    }, [isLogin])


    return <Context.Provider value={{ state, toggleMenu, toggleRequestLogin, clear, onRequiredLogin }}>{children}</Context.Provider>
}

export const usePage = () => {
    return useContext(Context)
}

export default usePage