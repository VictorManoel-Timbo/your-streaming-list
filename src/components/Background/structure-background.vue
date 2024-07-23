<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';

export default {
    name: "Background",
    props: {
        url: {
            type: Array<StreamingsContents>,
            required: true
        },
        isVisibleButton: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        sendFavoriteDelete(favorite: StreamingsContents) {
            this.$emit('delete-favorite', favorite)
        }
    }
}
</script>

<template>
    <div class="text-center inline-flex min-h-screen min-w-full justify-center flex-wrap p-8 bg-slate-950 overflow-hidden">
        <div>
            <ul>
                <li class="inline-block m-8 relative text-center" v-for="streaming in url" :key="streaming.id">
                    <div class="w-full relative ">
                        <div class="transform transition duration-500 hover:scale-105">
                            <RouterLink :to="`/details/${streaming.media_type}/${streaming.id}`">
                                <Card style="width: 304px; height: 456px; overflow: hidden">
                                    <template #header>
                                        <img v-if="streaming.poster_path"
                                            :src="`https://image.tmdb.org/t/p/w342/${streaming.poster_path}`">
                                        <img v-else-if="streaming.backdrop_path"
                                            :src="`https://image.tmdb.org/t/p/w342/${streaming.backdrop_path}`">
                                        <img v-else :src="`https://image.tmdb.org/t/p/w342/${streaming.profile_path}`"
                                            alt="Sem Imagem" class="text-white">
                                    </template>
                                </Card>
                            </RouterLink>
                        </div>
                        <Button type="button" v-if="isVisibleButton" @click="sendFavoriteDelete(streaming)"
                            class="rounded-full w-6 h-auto bg-neutral-100 text-black hover:text-red-700 outline-none hover:ring-2 hover:ring-neutral-500 ring-offset-2 ring-offset-gray-800 m-6 transition duration-300 hover:scale-125">
                            <v-icon name="fa-heart-broken" />
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>