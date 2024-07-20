import type { App } from "vue";
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { RiHeartFill, RiHeartAddLine, HiMenu, HiSolidDotsVertical, FaHeartBroken, MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound } from "oh-vue-icons/icons";

addIcons(RiHeartFill, RiHeartAddLine, HiMenu, HiSolidDotsVertical, FaHeartBroken, MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound);

export function setComponentIcons(app: App) {
    app.component("v-icon", OhVueIcon);
}