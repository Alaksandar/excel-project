export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.prev = null
    }

    select($el) {
        this.clear()
        $el.addClass(TableSelection.className)
        this.group.push($el)
        this.prev = $el
        this.prev.css({backgroundColor: '#1a73e821'})
    }

    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className)
            $el.css({backgroundColor: 'whitesmoke'})
        })
        this.group = []
    }

    selectGroup(group = [], target) {
        this.clear()
        this.group = group
        this.group.forEach($el => {
            ($el.id() === this.prev.id()
                || $el.id() === target)
                    ? $el.css({backgroundColor: '#1a73e821'})
                    : null
            $el.addClass(TableSelection.className)
        })
        return this.group
    }
}