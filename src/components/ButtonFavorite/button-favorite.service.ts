import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";

export class ButtonFav {
    constructor(
        public item?: string,
        public status?: boolean
    ) { }
}

export class ButtonFavoritesService {
    private favorite$ = new BehaviorSubject<ButtonFav[]>([]);

    public buttonFav = reactive({
        isFav: [] as ButtonFav[]
    });

    constructor() {
        this.initializeButtons();
        this.favorite$.subscribe(favorites => {
            this.buttonFav.isFav = favorites;
            localStorage.setItem("button-favorites", JSON.stringify(favorites));
        });
    }

    private initializeButtons() {
        const storedFavorites = localStorage.getItem("button-favorites");
        if (storedFavorites) {
            this.favorite$.next(JSON.parse(storedFavorites));
        }
    }

    public addButton(item: ButtonFav) {
        if (!this.buttonFav.isFav.some(fav => fav.item === item.item)) {
            this.favorite$.next([...this.buttonFav.isFav, item]);
        }
    }

    public removeButton(item: ButtonFav) {
        this.favorite$.next(this.buttonFav.isFav.filter(fav => fav.item !== item.item));
    }

    public clearFavorites() {
        localStorage.removeItem("button-favorites");
        this.favorite$.next([]);
    }
}
