import type { App } from "vue";
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiMenu, HiSolidDotsVertical, RiMovie2Fill, LaSpinnerSolid } from "oh-vue-icons/icons";
import { RiHeartFill, RiHeartAddLine, FaHeartBroken, FaTrash, BiSearch } from "oh-vue-icons/icons"; 
import { MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound } from "oh-vue-icons/icons";

addIcons(HiMenu, HiSolidDotsVertical, RiMovie2Fill, LaSpinnerSolid);
addIcons(RiHeartFill, RiHeartAddLine, FaHeartBroken, FaTrash, BiSearch);
addIcons(MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound);

export function setComponentIcons(app: App) {
    app.component("v-icon", OhVueIcon);
}