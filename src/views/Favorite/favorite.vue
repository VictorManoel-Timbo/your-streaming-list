<script lang="ts">
import { FavoritesManager } from '@/views/Favorite/favorite.service';

export default {
    data() {
        return {
            favorites: new FavoritesManager()
        }
    },
    methods: {
        removeFavorite(value: Object) {
            this.favorites.removeFavorite(value)
        },
        clearAll() {
            this.favorites.clearFavorites()
            localStorage.clear()
        }
    }
}
</script>

<template>
    <div class="bg-gray-950 text-center">
        <div>
            <Button type="button" @click="clearAll"
                class=" rounded-md bg-white m-6 p-1 text-black text-md font-semibold outline-none hover:ring-2 hover:ring-neutral-300 hover:ring-offset-2 hover:ring-offset-gray-800  transition duration-500 hover:scale-105">
                Limpar
            </Button>
        </div>
        <div>
            <background :url="favorites.favoritesList.list" :botao="true"/> 
        </div>  
    </div>
</template>