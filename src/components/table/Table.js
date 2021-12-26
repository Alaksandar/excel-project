import {ExcelComponent} from "@core/ExcelComponent";
import {createTable} from "@/components/table/table.template";
import {$} from "@core/dom";

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Formula',
            listeners: ['mousedown']
        });
    }

    toHTML() {
        return createTable(15)
    }

    onMousedown(event) {
        if(event.target.dataset.resize) {
            const $resizer = $(event.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const colIndex = $parent.data.column
            const rowIndex = $parent.data.row

            const column = this.$root.findAll(`[data-column="${colIndex}"]`)
            const row = this.$root.findAll(`[data-row="${rowIndex}"]`)
            const type = event.target.dataset.resize


            document.onmousemove = e => {
                if(type === 'col') {
                    const delta = e.pageX - coords.right
                    const value = Math.floor(coords.width + delta)

                    $parent.css({
                        width: value + 'px',
                        backgroundColor: '#bad3c7'
                    })
                    column.forEach(el => {
                        return (
                            el.style.width = value < 40
                                ? '40px' : value + 'px',
                            el.style.borderRightColor = '#1a73e8'
                        )
                    })
                } else {
                    const delta = e.pageY - coords.bottom
                    const value = Math.floor(coords.height + delta)
                    $parent.css({
                        height: value + 'px',
                        backgroundColor: '#bad3c7'
                    })
                    row.forEach(el => {
                        return (
                            el.style.height = value < 20
                                ? '20px' : value + 'px',
                            el.style.borderBottomColor = '#1a73e8'
                        )
                    })
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
                $parent.css({
                    backgroundColor: '#f0ecec'
                })
                if(type === 'col') {
                    column.forEach(el => {
                        return (
                            el.style.borderRightColor = '#c0c0c0'
                        )
                    })
                } else {
                    row.forEach(el => {
                        return el.style.borderBottomColor = '#c0c0c0'
                    })
                }
            }
        }
    }
}