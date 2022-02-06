import {$} from "@core/dom";

export function resizeHandler($root, event) {
    return new Promise(resolve => {
        const $resizer = $(event.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const coords = $parent.getCoords()
        const rootCoords = $root.getCoords()

        const type = event.target.dataset.resize
        const sideProp = type === 'col' ? 'height' : 'width'
        const cellMinWidth = 40
        const cellHeight = 24
        let value

        $resizer.css({
            opacity: '.3',
            [sideProp]: rootCoords[sideProp] + 'px',
        })

        document.onmousemove = e => {
            if (type === 'col') {
                const delta = Math.floor(e.pageX - coords.right)
                value = Math.floor(coords.width + delta) < cellMinWidth
                    ? cellMinWidth
                    : Math.floor(coords.width + delta)

                $resizer.css({
                    width: value + 'px',
                    right: (value > cellMinWidth
                        ? -delta + 'px'
                        : coords.width - cellMinWidth + 'px'),
                    borderTop: '24px solid #1a73e8',
                })

            } else {
                const delta = e.pageY - coords.bottom
                value = Math.floor(coords.height + delta) < cellHeight
                    ? cellHeight
                    : Math.floor(coords.height + delta)

                $resizer.css({
                    height: value + 'px',
                    bottom: (value > cellHeight
                        ? -delta + 'px'
                        : coords.height - cellHeight + 'px'), // ???
                    left: '0px',
                    borderLeft: cellMinWidth + 'px solid #1a73e8',
                })
            }

            document.onmouseup = () => {
                document.onmousemove = null
                document.onmouseup = null

                if (type === 'col') {
                    $parent.css({width: value + 'px'})
                    $root.findAll(
                        `[data-col="${$parent.data.col}"]`)
                        .forEach(el => el.style.width = value + 'px')

                    $resizer.css({
                        right: '0',
                        width: '3px',
                        height: cellHeight + 'px',
                    })

                } else {
                    $parent.css({height: value + 'px'})
                    $root.findAll(`[data-row="${$parent.data.row}"]`)
                        .forEach(el => el.style.height = value + 'px')

                    $resizer.css({
                        left: '0',
                        bottom: '0',
                        height: '3px',
                        width: cellMinWidth + 'px'
                    })
                }

                resolve({
                    value,
                    id: $parent.data[type],
                    type
                })

                $resizer.css({
                    opacity: '0'
                })
            }
        }
    })
}
