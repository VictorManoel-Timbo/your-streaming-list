<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';

export default {
    name: "Background",
    data() {
        return {
            value: ''
        }
    },
    watch: {
        'value'(newValue: any) {
            this.$emit('search', newValue)
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
        mostrar(obj: any) {
            console.log(obj)
        }
    }
}
</script>

<template>
    <div
        class="text-center inline-flex min-h-screen min-w-full justify-center flex-wrap p-8 bg-slate-950 overflow-hidden">
        <div>
            <div class="space-x-4 mx-3 text-center">
                <InputText type="text" class="rounded font-semibold text-sm h-7 pl-2" v-model="value" />
            </div>
            <ul>
                <li class="inline-block m-8 relative text-center" v-for="streaming in url" :key="streaming.id" @mouseup="mostrar(streaming)">
                    <!--v-if="value === '' || isVisibleButton"-->
                    <div class="w-full relative">
                        <div class="transform transition duration-500 hover:scale-105">
                            <RouterLink :to="`/details/${streaming.media_type}/${streaming.id}`">
                                <Card class="lg:w-[304px] lg:h-[456px] overflow-hidden bg-red-600">
                                    <template #content>
                                        <img v-if="streaming.poster_path || streaming.backdrop_path || streaming.profile_path"
                                            :src="`https://image.tmdb.org/t/p/w342/${streaming.poster_path || streaming.backdrop_path || streaming.profile_path}`">
                                        <v-icon name="la-spinner-solid" scale="3" fill="lightgray"
                                            animation="spin-pulse" speed="fast" />
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