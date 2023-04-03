import { createContext, useReducer, useContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
    console.log(action)
    switch (action.type) {
        case 'ADD_NOTIFICATION':
            return action.payload
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
    const [notification, notificationDispatch] = useReducer(
        notificationReducer,
        null
    )

    useEffect(() => {
        if (notification) {
            const timeout = setTimeout(() => {
                notificationDispatch({ type: 'REMOVE_NOTIFICATION' })
            }, 5000)
            return () => clearTimeout(timeout)
        }
    }, [notification])

    return (
        <NotificationContext.Provider
            value={[notification, notificationDispatch]}
        >
            {props.children}
        </NotificationContext.Provider>
    )
}

export const useNotificationText = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationAndDispatch = useContext(NotificationContext)
    return notificationAndDispatch[1]
}

export default NotificationContext
