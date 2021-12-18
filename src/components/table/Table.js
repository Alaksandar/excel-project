import {ExcelComponent} from "@core/ExcelComponent";

export class Table extends ExcelComponent {
    static className = 'excel__table'
    toHTML() {
        return `
            <div class="table-row">
                <div class="row-info"></div>
                <div class="row-data">
                    <div class="column-info">A</div>
                    <div class="column-info">B</div>
                    <div class="column-info">C</div>
                    <div class="column-info">D</div>
                    <div class="column-info">E</div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">3</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">4</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">3</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">4</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">3</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">4</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">3</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">4</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">1</div>
                <div class="row-data">
                    <div class="cell selected" contenteditable></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">2</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">3</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
            <div class="table-row">
                <div class="row-info">4</div>
                <div class="row-data">
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                    <div class="cell"></div>
                </div>
            </div>
        `
    }
}