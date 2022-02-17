import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
    openMenu: false,
    isOpenRequestPopup: false
}

export const { reducer: pageReducer, actions: pageActions } = createSlice({
    name: 'page',
    initialState,
    reducers: {
        toggleMenu(state, action: PayloadAction<boolean | undefined>) {
            state.openMenu = action.payload ?? !state.openMenu
        },
        toggleRequestLogin(state, action: PayloadAction<boolean | undefined>){
            state.isOpenRequestPopup = action.payload ??  !state.isOpenRequestPopup
            
        },
        clear(){
            return {
                ...initialState
            }
        }
    }
})
