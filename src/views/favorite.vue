<script lang="ts">
import { getFavorites } from '@/utils/storageFavorites.util';
import { removeFavorite } from '@/utils/storageFavorites.util';
import { clearFavorites } from '@/utils/storageFavorites.util';

export default {
    data() {
        return {
            favorites: []
        }
    },
    created() {
        this.favorites = getFavorites()
    },
    methods: {
        removeFavorite(name: string) {
            removeFavorite(name)
        },
        clearAll() {
            clearFavorites()
        }
    }
}
</script>

<template>
    <div>
        <Button type="button" @click="clearAll"
            class="rounded bg-black text-white outline-none ring-2 ring-neutral-500 ring-offset-2 ring-offset-gray-800 m-6">
            Remover Todos
        </Button>
        <div v-for="item in favorites" class="m-6">
            {{ item }}
            <br>
            <Button type="button" @click="removeFavorite(item)"
                class="rounded-full w-6 h-auto bg-black text-red-700 outline-none ring-2 ring-neutral-500 ring-offset-2 ring-offset-gray-800 m-6">
                <v-icon name="fa-heart-broken" />
            </Button>
        </div>
    </div>
</template>