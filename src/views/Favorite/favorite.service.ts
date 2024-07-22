import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";
import type { StreamingsContents } from "@/models/streaming.model";

export class FavoritesService {
    private favorite$ = new BehaviorSubject<StreamingsContents[]>([]);

    public favoritesList = reactive({
        list: [] as StreamingsContents[],
        isFavorite: false
    });

    constructor() {
        this.initializeFavorites();
        this.favorite$.subscribe(favorites => {
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
        if (!this.favoritesList.list.some(
            fav => fav.id === item.id && fav.media_type === item.media_type
        )) {
            this.favorite$.next([...this.favoritesList.list, item]);
        }
    }

    public removeFavorite(item: StreamingsContents) {
        this.favorite$.next(this.favoritesList.list
            .filter(
                favorite =>
                    favorite.id !== item.id || favorite.media_type !== item.media_type
            )
        );
    }

    public clearFavorites() {
        this.favorite$.next([]);
        localStorage.removeItem("favorites");
    }

    public isFavorite(item: { id: number, media: string }): boolean {
        return this.favoritesList.list.some(
            fav => fav.id === item.id && fav.media_type === item.media
        );
    }
}

