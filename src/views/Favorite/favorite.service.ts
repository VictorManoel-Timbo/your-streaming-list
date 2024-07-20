/*import { reactive } from "vue";

export let favoritesList = reactive({
    item: "",
    list: [] as string[]
})

export function setFavorite(item?: string) {
    localStorage.setItem("favorites", JSON.stringify(favoritesList.list))
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")!)
}

export function removeFavorite(item: string) {
    localStorage.removeItem(item)
    favoritesList.list = getFavorites()
}

export function clearFavorites() {
    localStorage.clear()
}

export default { getFavorites, setFavorite, removeFavorite, clearFavorites };*/



import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";
import type { StreamingsContents } from "@/models/streaming.model";

export class FavoritesManager {
    private favorite$ = new BehaviorSubject<StreamingsContents[]>([]);

    public favoritesList = reactive({
        list: [] as Object[],
        newFavorite: {
            media: "",
            id: 0
        }
    });

    constructor() {
        this.initializeFavorites();
        this.favorite$.subscribe((favorites) => {
            this.favoritesList.list = favorites;
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });
    }

    private initializeFavorites() {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            this.favorite$.next(JSON.parse(storedFavorites));
        }
    }

    public addFavorite(item: StreamingsContents) {
        if (!this.favoritesList.list.includes(item)) {
            this.favorite$.next([...this.favoritesList.list, item]);
        }
    }

    public removeFavorite(item: StreamingsContents) {
        this.favorite$.next(this.favoritesList.list.filter((favorite) => favorite !== item));
    }

    public clearFavorites() {
        this.favorite$.next([]);
        localStorage.removeItem("favorites");
    }
}


