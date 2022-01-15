function toButton(btn) {
    const meta = `
        data-type="button"
        data-value='${JSON.stringify(btn.value)}'`
    return `
        <button class="button-icon ${btn.active ? 'active' : ''}"
        ${meta}
        >
            <i class="material-icons"
                ${meta}
            >${btn.icon}</i>
        </button>
    `
}

export function createToolbar() {
    const buttons = [
        {
            icon: 'format_bold',
            active: false,
            value: {fontWeight: 'bold'}

        },
        {
            icon: 'format_italic',
            active: false,
            value: {fontStyle: 'italic'}
        },
        {
            icon: 'format_underlined',
            active: false,
            value: {textDecoration: 'underline'}
        },
        {
            icon: 'format_color_text',
            active: false,
            value: {color: 'red'}
        },
        {
            icon: 'format_align_left',
            active: false,
            value: {textAlign: 'left'}
        },
        {
            icon: 'format_align_center',
            active: false,
            value: {textAlign: 'center'}
        },
        {
            icon: 'format_align_right',
            active: false,
            value: {textAlign: 'right'}
        }
    ]

    return buttons.map(toButton).join('')

    // return `
    //     <div class="toolbar-buttons">
    //         <button class="button-icon">
    //             <i class="material-icons">format_bold</i>
    //         </button>
    //     </div>
    // `
}