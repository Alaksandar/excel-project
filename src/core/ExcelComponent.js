import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
     constructor($root, options = {}) {
         super($root, options.listeners);
         this.name = options.name || ''
         this.subscribe = options.subscribe || [] // subscribe to state fields
         this.store = options.store     // Excel: {componentOptions}
         this.emitter = options.emitter // Excel: {componentOptions}
         this.unsubscribers = []
         // this.storeSub = null

         this.prepare()
     }

    // component preparation and
    // supporting functionality before init():
     prepare() {}

    // returns the component template:
    toHTML() {
        return ``
    }

    // notifies listeners of an event:
    $emit(event, ...args) {
         this.emitter.emit(event, ...args)
    }

    // subscribing to event notifications:
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
         this.store.dispatch(action)
    }

    // $subscribe(fn) {
    //      this.storeSub = this.store.subscribe(fn)
    // }

    // listen to only subscribed fields:
    storeChanged() {}

    isWatching(key) {
         return this.subscribe.includes(key)
    }

    // component initialization,
    // adding DOM listeners:
     init() {
         this.initDOMListeners()
     }

     // delete component,
    // unsubscribe from listeners:
    destroy() {
        this.removeDOMListeners()
        this.unsubscribers.forEach(unsub => unsub())
        // this.storeSub.unsubscribe()
    }
}

