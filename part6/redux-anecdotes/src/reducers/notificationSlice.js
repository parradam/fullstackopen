import { createSlice } from '@reduxjs/toolkit'

const initialState = 'No notifications'

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        removeNotification(state, action) {
            return initialState
        },
    },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
