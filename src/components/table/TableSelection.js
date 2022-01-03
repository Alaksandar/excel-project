export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.prev = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.prev = $el
        return this.group
    }

    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className)
            $el.css({backgroundColor: 'whitesmoke'})
        })
        this.group = []
        document.activeElement.blur()
    }

    selectGroup(group = []) {
        this.clear()
        this.group = group
        this.group.forEach($el => {
            console.log($el.id() === this.prev.id())
            if($el.id() === this.prev.id()) {
                $el.focus().addClass(TableSelection.className)
            } else {
                $el.css({backgroundColor: '#1a73e821'})
            }
        })
        console.log(this.group)
        return this.group
    }
}