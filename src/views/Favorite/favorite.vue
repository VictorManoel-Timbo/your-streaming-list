<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { FavoritesService } from '@/views/Favorite/favorite.service';
import { StreamingService } from '../streaming.service';

export default {
    data() {
        return {
            favorites: [] as StreamingsContents[],
            isLoading: true
        };
    },
    created() {
        this.getFavorites();
    },
    computed: {
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        },
        service(): StreamingService {
            return new StreamingService();
        },
    },
    methods: {
        removeFavorite(value: StreamingsContents) {
            this.serviceFavorites.removeFavorite(value);
            this.favorites = this.favorites.filter(fav => fav.id !== value.id);
        },
        clearAll() {
            this.serviceFavorites.clearFavorites();
            this.favorites = [];
        },
        getFavorites() {
            this.favorites = this.serviceFavorites.favoritesList.list;
            this.isLoading = false;
        },
    },
}

</script>

<template>
    <main class="bg-slate-950 text-center">
        <Button type="button" @click="clearAll"
            class="rounded-md bg-slate-800 border-2 border-white mx-6 mt-6 w-64 p-1 text-white text-md  hover:bg-gray-900 transition duration-300 hover:scale-105" unstyled>
            <v-icon name="fa-trash"/>
        </Button>
        <page-loader v-if="isLoading"/>
        <background v-else :url="favorites" :isVisibleButton="true" @delete-favorite="removeFavorite"/>
    </main>
</template>