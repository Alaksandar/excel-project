import {isEqual} from "@core/utils"

export class StoreSubscriber {
    constructor(store) {
        this.store = store
        this.sub = null
        this.oldState = {}
    }

    subscribeComponents(components) {
        this.oldState = this.store.getState()

        this.sub = this.store.subscribe(state => {
            Object.keys(state).forEach(key =>{
                if (!isEqual(this.oldState[key], state[key])) {
                    components.forEach(component => {
                        if (component.isWatching(key)) { // component.subscribe.includes(key)
                            const changes = {[key]: state[key]}
                            component.storeChanged(changes)
                        }
                    })
                }
            })
            this.oldState = this.store.getState()

            if (process.env.NODE_ENV === 'development') {
                window['redux'] = this.oldState
            }
        })
    }

    unsubscribeFromStore() {
        this.sub.unsubscribe()
    }
}
