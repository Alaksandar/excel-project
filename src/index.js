import './styles/style.scss';
import {Router} from "@core/route/Router";
import {DashboardPage} from "@/pages/DashboardPage";
import {ExcelPage} from "@/pages/ExcelPage";

new Router('#app', {
    dashboard: DashboardPage,
    excel: ExcelPage
})
