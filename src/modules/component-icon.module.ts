import type { App } from "vue";
import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { HiMenu, HiSolidDotsVertical, RiMovie2Fill, LaSpinnerSolid } from "oh-vue-icons/icons"; // Menu responsivo
import { RiHeartFill, RiHeartAddLine, FaHeartBroken, FaTrash } from "oh-vue-icons/icons"; // Botões de favoritar e desfavoritar
import { MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound } from "oh-vue-icons/icons" // Paginação

addIcons(HiMenu, HiSolidDotsVertical, RiMovie2Fill, LaSpinnerSolid);
addIcons(RiHeartFill, RiHeartAddLine, FaHeartBroken, FaTrash);
addIcons(MdKeyboardarrowrightRound, MdKeyboardarrowleftRound, MdKeyboarddoublearrowleftRound, MdKeyboarddoublearrowrightRound);

export function setComponentIcons(app: App) {
    app.component("v-icon", OhVueIcon);
}