import {clone} from "../utils";

export function createStore(rootReducer, initialState = {}) {
    let state = rootReducer({...initialState}, {type: 'TEST'})
    let listeners = []

    return {
        dispatch(action) {
            state = rootReducer(state, action)
            listeners.forEach(listener => listener(state))
        },

        subscribe(fn) {
            listeners.push(fn)
            return {
                unsubscribe() {
                    listeners = listeners.filter(l => l !== fn)
                }
            }
        },

        getState() {
            return clone(state)
        }
    }
}
