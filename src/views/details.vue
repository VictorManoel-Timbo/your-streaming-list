<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';
import { FavoritesManager } from '@/views/Favorite/favorite.service';

export default {
    data() {
        return {
            detail: new StreamingsContents(),
            favorites: new FavoritesManager(),
            btn: true,
        };
    },
    mounted() {
        this.getDetails();
    },
    computed: {
        service(): StreamingService {
            return new StreamingService();
        },
        firstTrailer() {
            if (this.detail.videos && this.detail.videos.results) {
                return this.detail.videos.results.find(video => video.type === 'Trailer' || video.type === 'Teaser');
            }
            return null;
        }
    },
    methods: {
        getDetails() {
            this.service.streamings
                .subscribe({
                    next: (response: any) => {
                        this.detail = response;
                        console.log(response)
                    }
                })
            this.service.getDetailStreaming(Number(this.$route.params.id.toString()), this.$route.params.media.toString()!)
        },
        submit() {
            this.btn = !this.btn;
            /*this.favorites.favoritesList.newFavorite = {
                media:  this.$route.params.media.toString(),
                id: Number(this.$route.params.id)
            }*/
            if (this.detail && !this.favorites.favoritesList.list.includes(this.detail)) {
                this.favorites.addFavorite(this.detail);
            }
        },
        remove(favorite: StreamingsContents) {
            this.favorites.removeFavorite(favorite)
            this.btn = !this.btn;
        },
    }
}
</script>

<template>
    <div class="relative">
        <img v-if="detail.backdrop_path" class="w-full h-screen object-cover" :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`"/>
        <img v-else-if="detail.poster_path" class="w-full h-screen object-cover" :src="`https://image.tmdb.org/t/p/original/${detail.poster_path}`"/>
        <img v-else class="w-full h-screen object-cover" :src="`https://image.tmdb.org/t/p/original/${detail.profile_path}`"/>
        <div
            class="absolute flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-center w-full h-screen top-0 left-0 bg-gradient-to-r from-black from-50% to-transparent opacity-95 p-8 lg:p-16">
            <div
                class="text-white max-w-md text-center mt-4 mb-4 lg:mt-0 lg:w-1/2 lg:pr-8 lg:flex lg:flex-col lg:justify-center lg:ml-16">
                <div class="text-3xl lg:text-5xl font-bold">
                    {{ detail.title || detail.name }}
                </div>
                <div class="mt-2 lg:mt-4 w-full text-justify text-xl tracking-wide">
                    {{ detail.overview }}
                </div>
                <div class="mt-4 lg:mt-8">
                    <Button v-if="!btn" @click="submit"
                        class="bg-red-700 rounded text-black font-semibold hover:bg-black hover:text-red-700 focus:outline-none focus:text-red-700 focus:bg-black focus:ring-2 focus:ring-white hover:ring-2 hover:ring-white p-1">
                        Favoritar
                        <v-icon name="ri-heart-add-line"></v-icon>
                    </Button>
                    <Button v-else @click="remove(detail)"
                        class="bg-red-700 rounded-md text-black font-semibold hover:bg-black hover:text-red-700 outline-none focus:text-red-500 focus:bg-black hover:ring-2 hover:ring-white p-1">
                        Remover
                        <v-icon name="fa-heart-broken"></v-icon>
                    </Button>
                </div>
            </div>
            <div v-if="firstTrailer"
                class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center">
                <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${firstTrailer.key}`"
                    :title="`${detail.name || detail.title}`" frameborder="0" allowfullscreen></iframe>
            </div>
            <div v-else-if="detail.backdrop_path"
                class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center">
                <img class="w-full h-full" :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`" />
            </div>
            <div v-else
                class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center">
                <img class="w-full h-full" :src="`https://image.tmdb.org/t/p/original/${detail.profile_path}`" />
            </div>
        </div>
    </div>
</template>