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
            this.$emit('delete-favorite', favorite);
        }
    }
}
</script>

<template>
    <main
        class="text-center inline-flex min-h-screen min-w-full justify-center flex-wrap p-8 bg-slate-950 overflow-hidden">
        <section class="inline-block m-8 text-center" v-for="streaming in url" :key="streaming.id">
            <div class="transform transition duration-500 hover:scale-105">
                <RouterLink :to="`/details/${streaming.media_type}/${streaming.id}`">
                    <Card style="width: 304px; height: 456px; overflow: hidden" class="custom-card">
                        <template #header>
                            <img v-if="streaming.poster_path || streaming.backdrop_path || streaming.profile_path" class="bg-cover h-full w-full"
                                :src="`https://image.tmdb.org/t/p/w342/${streaming.poster_path || streaming.backdrop_path || streaming.profile_path}`">
                            <div v-else class="w-full h-full flex items-center">
                                <img src="@/assets/videos_empty.jpg">
                            </div>
                        </template>
                    </Card>
                </RouterLink>
            </div>
            <Button type="button" v-if="isVisibleButton" @click="sendFavoriteDelete(streaming)"
                class="rounded-full w-6 h-auto bg-neutral-100 text-black hover:text-red-700 outline-none hover:ring-2 hover:ring-neutral-500 ring-offset-2 ring-offset-gray-800 m-6 transition duration-300 hover:scale-125"
                unstyled>
                <v-icon name="fa-heart-broken" />
            </Button>
        </section>
    </main>
</template>

<style scoped>
:deep(.custom-card .p-card-body) {
    @apply !p-0;
}

:deep(.custom-card .p-card-header) {
    @apply h-[456px];
}
</style>