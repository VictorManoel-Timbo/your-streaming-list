/*
import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";
import type { StreamingsContents } from "@/models/streaming.model";

export class FavoritesService {
    private favorite$ = new BehaviorSubject<StreamingsContents[]>([]);

    public favoritesList = reactive({
        list: [] as StreamingsContents[],
    });
    public buttonFav = reactive({
        isFav: [{
            item: String,
            status: Boolean
        }]
    })

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
            fav => fav.id === item.id && fav.media_type === item.media_type)) {
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
}*/
/*
import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";
import type { StreamingsContents } from "@/models/streaming.model";

export class ButtonFav {
    constructor(
        public item?: string,
        public status?: boolean
    ) { }
}

export class FavoritesService {
    private favoriteContents$ = new BehaviorSubject<StreamingsContents[]>([]);
    private favoriteButtons$ = new BehaviorSubject<ButtonFav[]>([]);

    public favoritesList = reactive({
        list: [] as StreamingsContents[],
    });

    public buttonFav = reactive({
        isFav: [] as ButtonFav[]
    });

    constructor() {
        this.initializeFavorites();
        this.favoriteContents$.subscribe(favorites => {
            this.favoritesList.list = favorites;
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });

        this.favoriteButtons$.subscribe(favorites => {
            this.buttonFav.isFav = favorites;
            localStorage.setItem("button-favorites", JSON.stringify(favorites));
        });
    }

    private initializeFavorites() {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            this.favoriteContents$.next(JSON.parse(storedFavorites));
        }

        const storedButtonFavorites = localStorage.getItem("button-favorites");
        if (storedButtonFavorites) {
            this.favoriteButtons$.next(JSON.parse(storedButtonFavorites));
        }
    }

    // Methods for StreamingsContents
    public addFavorite(item: StreamingsContents) {
        if (!this.favoritesList.list.some(
            fav => fav.id === item.id && fav.media_type === item.media_type)) {
            this.favoriteContents$.next([...this.favoritesList.list, item]);
        }
    }

    public removeFavorite(item: StreamingsContents) {
        this.favoriteContents$.next(this.favoritesList.list.filter(
            favorite => favorite.id !== item.id || favorite.media_type !== item.media_type
        ));
    }

    public clearFavorites() {
        this.favoriteContents$.next([]);
        localStorage.removeItem("favorites");
    }

    // Methods for ButtonFav
    public addButton(item: ButtonFav) {
        if (!this.buttonFav.isFav.some(fav => fav.item === item.item)) {
            this.favoriteButtons$.next([...this.buttonFav.isFav, item]);
        }
    }

    public removeButton(item: ButtonFav) {
        this.favoriteButtons$.next(this.buttonFav.isFav.filter(fav => fav.item !== item.item));
    }

    public clearButtonFavorites() {
        localStorage.removeItem("button-favorites");
        this.favoriteButtons$.next([]);
    }

    // Combined clear method
    public clearAllFavorites() {
        this.clearFavorites();
        this.clearButtonFavorites();
    }
}*/

import { reactive } from "vue";
import { BehaviorSubject } from "rxjs";
import { StreamingsContents } from "@/models/streaming.model";

export class ButtonFav {
    constructor(
        public item?: string,
        public status?: boolean
    ) { }
}

export class FavoritesService {
    private favoriteContents$ = new BehaviorSubject<StreamingsContents[]>([]);
    private favoriteButtons$ = new BehaviorSubject<ButtonFav[]>([]);

    public favoritesList = reactive({
        list: [] as StreamingsContents[],
    });

    public buttonFav = reactive({
        isFav: [] as ButtonFav[]
    });

    constructor() {
        this.initializeFavorites();
        this.favoriteContents$.subscribe(favorites => {
            this.favoritesList.list = favorites;
            localStorage.setItem("favorites", JSON.stringify(favorites));
        });

        this.favoriteButtons$.subscribe(favorites => {
            this.buttonFav.isFav = favorites;
            localStorage.setItem("button-favorites", JSON.stringify(favorites));
        });
    }

    private initializeFavorites() {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            this.favoriteContents$.next(JSON.parse(storedFavorites));
        }

        const storedButtonFavorites = localStorage.getItem("button-favorites");
        if (storedButtonFavorites) {
            this.favoriteButtons$.next(JSON.parse(storedButtonFavorites));
        }
    }

    public addFavorite(item: StreamingsContents | ButtonFav) {
        if (item instanceof StreamingsContents) {
            if (!this.favoritesList.list.some(
                fav => fav.id === item.id && fav.media_type === item.media_type)) {
                this.favoriteContents$.next([...this.favoritesList.list, item]);
            }
        } else {
            if (!this.buttonFav.isFav.some(fav => fav.item === item.item)) {
                this.favoriteButtons$.next([...this.buttonFav.isFav, item]);
            }
        }
    }

    public removeFavorite(item: StreamingsContents | ButtonFav) {
        if (item instanceof StreamingsContents) {
            this.favoriteContents$.next(this.favoritesList.list.filter(
                favorite => favorite.id !== item.id || favorite.media_type !== item.media_type
            ));
        } else {
            this.favoriteButtons$.next(this.buttonFav.isFav.filter(fav => fav.item !== item.item));
        }
    }

    public clearFavorites() {
        this.favoriteContents$.next([]);
        this.favoriteButtons$.next([]);
        localStorage.removeItem("favorites");
        localStorage.removeItem("button-favorites");
    }
}

