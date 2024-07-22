<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { FavoritesService } from '@/views/Favorite/favorite.service';
import { StreamingService } from '../streaming.service';

export default {
    data() {
        return {
            all: [] as StreamingsContents[],
            favorites: [] as StreamingsContents[],
            pagessss: 1,
            maxPages: 500,
            page: Number(this.$route.params.page),
            type: "favorite"
        }
    },
    created() {
        this.getAll(this.pagessss);
    },
    watch: {
        '$route.params.page'(newPage) {
            this.page = Number(newPage);
            //this.getAll(this.page);
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
            this.updateFavorites();
        },
        clearAll() {
            this.serviceFavorites.clearFavorites();
            this.favorites = [];
        },
        getAll(page: number) {
            if (page > this.maxPages) return;

            this.service.streamings
                .subscribe({
                    next: (response: any) => {
                        this.all = response.results
                        this.updateFavorites();
                    }
                });
            this.service.getAll(page);
        },
        updateFavorites() {
            this.favorites = this.all.filter(item =>
                this.serviceFavorites.isFavorite({ id: item.id!, media: item.media_type! })
            );
        },
    },
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
            <background :url="favorites" :botao="true" />
        </div>
        <paginator v-if="serviceFavorites.favoritesList.list.length > 5" :pageFather="page" :type_media="type"
            @response="(newPage: any) => page = newPage" />
    </div>
</template>