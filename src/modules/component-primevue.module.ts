import type { App } from "vue";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext";
import Skeleton from "primevue/skeleton";


export function setComponentPrime(app: App) {
    app.component("Button", Button);
    app.component("Card", Card);
    app.component("InputText", InputText);
    app.component("Skeleton", Skeleton);
}