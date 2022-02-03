import './styles/style.scss';
import {Router} from "@core/route/Router";
import {DashboardPage} from "@core/pages/DashboardPage";
import {ExcelPage} from "@core/pages/ExcelPage";

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
