import { createSelector } from 'reselect'
import { RootState } from '..'


const notificationSelect = (store: RootState) => store.notification

export const useNotification = useSelector(notificationSelect)