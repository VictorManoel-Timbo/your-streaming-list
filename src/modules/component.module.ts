import NavBar from "@/components/NavBar/nav-bar.vue";
import Background from "@/components/Background/structure-background.vue"
import Paginator from "@/components/Paginator/paginator.vue";
import PageLoader from "@/components/PageLoader/pageLoader.vue";

import type { App } from "vue";

export function setComponent(app: App) {
    app.component("nav-bar", NavBar),
    app.component("background", Background),
    app.component("paginator", Paginator),
    app.component("page-loader", PageLoader)
}