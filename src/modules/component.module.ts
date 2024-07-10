import NavBar from "@/components/NavBar/nav-bar.vue";
import type { App } from "vue";

export function setComponent(app: App) {
    app.component("nav-bar", NavBar)
}