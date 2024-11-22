<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';

export default {
    name: "Background",
    data() {
        return {
            search: ''
        }
    },
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
        },
        sendSearch(search: string) {
            this.$emit('search', search);
        }
    }
}
</script>

<template>
    <div
        class="text-center inline-flex min-h-screen min-w-full justify-center flex-wrap p-8 bg-slate-950 overflow-hidden">
        <div>
            <div class="space-x-4 mx-3 text-center">
                <InputText type="text" class="rounded font-semibold text-sm h-7 pl-2" v-model="search" />
                <Button @click="sendSearch(search)" class="rounded-md bg-slate-800 border-2 border-white px-1 h-auto text-white" unstyled>
                    <v-icon name="bi-search" />
                </Button>
            </div>
            <ul>
                <li class="inline-block m-8 relative text-center" v-for="streaming in url" :key="streaming.id">
                    <!--v-if="value === '' || isVisibleButton"-->
                    <div v-if="streaming.poster_path || streaming.backdrop_path || streaming.profile_path" class="w-full relative">
                        <div class="transform transition duration-500 hover:scale-105">
                            <RouterLink class="lg:w-[304px] lg:h-[456px]" :to="`/details/${streaming.media_type}/${streaming.id}`">
                                <Card class="w-full h-full overflow-hidden main-card">
                                    <template #content>
                                        <img class="w-full h-full bg-cover"
                                            :src="`https://image.tmdb.org/t/p/w342/${streaming.poster_path || streaming.backdrop_path || streaming.profile_path}`">
                                        <!--<v-icon v-else name="la-spinner-solid" scale="3" fill="lightgray"
                                            animation="spin-pulse" speed="fast" />-->
                                    </template>
                                </Card>
                            </RouterLink>
                        </div>
                        <Button type="button" v-if="isVisibleButton" @click="sendFavoriteDelete(streaming)"
                            class="rounded-full w-6 h-auto bg-neutral-100 text-black hover:text-red-700 outline-none hover:ring-2 hover:ring-neutral-500 ring-offset-2 ring-offset-gray-800 m-6 transition duration-300 hover:scale-125" unstyled>
                            <v-icon name="fa-heart-broken" />
                        </Button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
:deep(.main-card .p-card-content) {
    @apply bg-slate-100 flex items-center;
}

:deep(.main-card .p-card-body) {
    @apply p-0;
}
</style>