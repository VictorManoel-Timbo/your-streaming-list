import type { App } from "vue";
import Button from 'primevue/button';
import Card from 'primevue/card';
import InputText from "primevue/inputtext";
import ProgressSpinner from 'primevue/progressspinner';
import Rating from "primevue/rating";
import Skeleton from "primevue/skeleton";

export function setComponentPrime(app: App) {
    app.component("Button", Button);
    app.component("Card", Card);
    app.component("InputText", InputText);
    app.component("ProgressSpinner", ProgressSpinner);
    app.component("Rating", Rating);
    app.component("Skeleton", Skeleton);
}