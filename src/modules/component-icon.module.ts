import type { App } from "vue";
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import * as MdIcons from "oh-vue-icons/icons/md";
import * as FaIcons from "oh-vue-icons/icons/fa";
import * as HiIcons from "oh-vue-icons/icons/hi";

const icons = Object.values({
    ...MdIcons,
    ...FaIcons,
    ...HiIcons
});

addIcons(...icons);

export function setComponentIcons(app: App) {
    app.component("v-icon", OhVueIcon);
}