import {storage} from "@core/utils";

function toHtml(key) {
    const id = key.split(':')[1]
    const date = new Date(JSON.parse(id))

    return `
        <li class="dashboard__list-record" key=${key}>
            <a href="#excel/${id}">
                <span>
                    ${storage(key).title}
                </span>
                <div class="record-date">
                    <strong>
                        ${date.toLocaleDateString()}
                        ${date.toLocaleTimeString()}
                    </strong>
                    <span>
                        ${new Date(storage(key).openedDate).toLocaleDateString()}
                        ${new Date(storage(key).openedDate).toLocaleTimeString()}
                    </span>
                </div>
            </a>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for(let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if(!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createTableRecords() {
    const keys = getAllKeys()
    if(!keys.length) {
        return `<p>Нет сохранённых таблиц</p>`
    }
    return `
        <div class="dashboard__list-header">
            <span class="header-title">Название</span>
            <div class="header-date">
                <span>Дата создания</span>
                <span>Просмотрено</span>
            </div>
        </div>
        <ul class="dashboard__list-content">
            ${keys.map(toHtml).join('')}
        </ul>
    `
}