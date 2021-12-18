import {DOMListener} from "@core/DOMListener";

export class ExcelComponent extends DOMListener {
     constructor($root) {
         super($root);

         this.$root = $root
         console.log('$root for ExcelComponent', $root)
     }

    toHTML() {
        return ``
    }
}

