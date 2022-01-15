export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        $el.focus().addClass(TableSelection.className)
        this.group.push($el)
        this.current = $el
        return this.group
    }

    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className)
            $el.css({backgroundColor: 'whitesmoke'})
        })
        this.group = []
    }

    selectGroup(group = []) {
        this.clear()
        this.group = group
        this.group.forEach($el => {
            if($el.id() === this.current.id()) {
                $el.focus().addClass(TableSelection.className)
            } else {
                $el.css({backgroundColor: '#1a73e821'})
            }
        })
        return this.group
    }

    applyStyle(style) {
        this.group.forEach($el => {
            $el.css(style)
        })
    }
}