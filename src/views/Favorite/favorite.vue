<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { FavoritesService } from '@/views/Favorite/favorite.service';
import { StreamingService } from '../streaming.service';

export default {
    /*data() {
        return {
            all: [] as StreamingsContents[],
            favorites: [] as StreamingsContents[],
            page: Number(this.$route.params.page),
            type: "favorite"
        }
    },
    created() {
        this.getAll();
    },
    watch: {
        '$route.params.page'(newPage) {
            this.page = Number(newPage);
        }
    },
    computed: {
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        },
        service(): StreamingService {
            return new StreamingService();
        }
    },
    methods: {
        removeFavorite(value: StreamingsContents) {
            this.serviceFavorites.removeFavorite(value);
        },
        clearAll() {
            this.serviceFavorites.clearFavorites();
            this.favorites = [];
        },
        getAll() {
            this.favorites = this.serviceFavorites.favoritesList.list
            for (let id = 0; id < this.favorites.length; id++) {
                this.service.streamings
                    .subscribe({
                        next: (response: any) => {
                            this.all.push(response);
                            this.all[id].media_type = this.favorites[id].media_type
                            console.log(response)
                            console.log("id: " + this.favorites[id].id + "  tipo: " + this.favorites[id].media_type)
                        }
                    })
                this.service.getDetailStreaming(Number(this.favorites[id].id), this.favorites[id].media_type!)
            }
            this.favorites.forEach(favorite => {
                this.service.getDetailStreaming(favorite.id, favorite.media_type).subscribe(response => {
                    this.all.push({ ...response, media_type: favorite.media_type });
                });
            })
        },
    },*/
    data() {
        return {
            all: [] as StreamingsContents[],
            favorites: [] as StreamingsContents[],
            page: Number(this.$route.params.page),
            type: 'favorite'
        };
    },
    computed: {
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        },
        service(): StreamingService {
            return new StreamingService();
        }
    },
    methods: {
        removeFavorite(value: StreamingsContents) {
            this.serviceFavorites.removeFavorite(value);
            this.favorites = this.favorites.filter(fav => fav.id !== value.id);
            this.all = this.all.filter(item => item.id !== value.id);
        },
        clearAll() {
            this.serviceFavorites.clearFavorites();
            this.favorites = [];
            console.log(this.all)
            this.all = [];

        },
        getAll() {
            this.favorites = this.serviceFavorites.favoritesList.list;
            this.all = [];
            this.favorites.forEach(favorite => {
                this.service.streamings
                    .subscribe({
                        next: (response: any) => {
                            this.all.push({ ...response, media_type: favorite.media_type });
                        }
                    })
                this.service.getDetailStreaming(favorite.id!, favorite.media_type!)
            });
        }
    },
    watch: {
        '$route.params.page'(newPage: string) {
            this.page = Number(newPage);
        }
    },
    mounted() {
        this.getAll();
    }
}

</script>

<template>
    <div class="bg-gray-950 text-center">
        <div>
            <Button type="button" @click="clearAll"
                class="rounded-md bg-white m-6 p-1 text-black text-md font-semibold outline-none hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-gray-800 transition duration-300 hover:scale-105">
                Limpar
            </Button>
        </div>
        <div>
            <background :url="all" :botao="true" />
        </div>
        <paginator v-if="serviceFavorites.favoritesList.list.length > 20" :pageFather="page" :type_media="type"
            @response="(newPage: any) => page = newPage" />
    </div>
</template>