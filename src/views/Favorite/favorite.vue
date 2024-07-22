<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { FavoritesService } from '@/views/Favorite/favorite.service';

export default {
    data() {
        return {

        }
    },
    computed: {
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        }
    },
    methods: {
        removeFavorite(value: StreamingsContents) {
            this.serviceFavorites.removeFavorite(value)
        },
        clearAll() {
            this.serviceFavorites.clearFavorites()
        }
    }
}
</script>

<template>
    <div class="bg-gray-950 text-center">
        <div>
            <Button type="button" @click="clearAll"
                class=" rounded-md bg-white m-6 p-1 text-black text-md font-semibold outline-none hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-gray-800  transition duration-300 hover:scale-105">
                Limpar
            </Button>
        </div>
        <div>
            <background :url="serviceFavorites.favoritesList.list" :botao="true"/> 
        </div>  
    </div>
</template>