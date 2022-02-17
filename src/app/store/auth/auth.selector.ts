import { createSelector } from 'reselect'
import { RootState } from '..'


const authSelect = (store: RootState) => store.auth

export const useAuth = useSelector(authSelect)