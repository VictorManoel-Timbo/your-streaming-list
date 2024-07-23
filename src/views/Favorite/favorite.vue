<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { FavoritesService } from '@/views/Favorite/favorite.service';
import { StreamingService } from '../streaming.service';
import { ButtonFavoritesService } from '@/components/ButtonFavorite/button-favorite.service';

export default {
    data() {
        return {
            favorites: [] as StreamingsContents[],
            //page: Number(this.$route.params.page),
            //type: 'favorite'
        };
    },
    created() {
        this.getFavorites();
    },
    /*watch: {
        '$route.params.page'(newPage: string) {
            this.page = Number(newPage);
        }
    },*/
    computed: {
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        },
        service(): StreamingService {
            return new StreamingService();
        },
        serviceButton() {
            return new ButtonFavoritesService();
        }
    },
    methods: {
        removeFavorite(value: StreamingsContents) {
            this.serviceFavorites.removeFavorite(value);
            this.favorites = this.favorites.filter(fav => fav.id !== value.id);
        },
        clearAll() {
            this.serviceFavorites.clearFavorites();
            this.favorites = [];
            this.serviceButton.clearFavorites()
        },
        getFavorites() {
            this.favorites = this.serviceFavorites.favoritesList.list;
        },
    },
}

</script>

<template>
    <div class="bg-gray-950 text-center">
        <Button type="button" @click="clearAll"
            class="rounded-md bg-gray-950 border-2 border-white mx-6 mt-6 w-64 p-1 text-white text-md  hover:bg-gray-800 transition duration-300 hover:scale-105">
            
            <v-icon name="fa-trash"/>
        </Button>
        <background :url="favorites" :botao="true" @delete-favorite="removeFavorite"/>
        <!----<paginator v-if="favorites.length > 20" :pageFather="page" :type_media="type"
            @response="(newPage: any) => page = newPage"/>-->
    </div>
</template>