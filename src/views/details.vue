<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';
import { FavoritesService } from '@/views/Favorite/favorite.service';

export default {
    data() {
        return {
            detail: new StreamingsContents(),
            newFavorite: {
                media: this.$route.params.media.toString(),
                id: Number(this.$route.params.id)
            },
            isFavorite: false,
        };
    },
    created() {
        this.getDetails();
        this.checkFavoriteStatus();
    },
    computed: {
        service(): StreamingService {
            return new StreamingService();
        },
        serviceFavorites(): FavoritesService {
            return new FavoritesService();
        },
        firstTrailer() {
            if (this.detail.videos && this.detail.videos.results) {
                return this.detail.videos.results.find(
                    video => video.type === 'Trailer' || video.type === 'Teaser'
                );
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
        toggleFavorite() {
            if (this.isFavorite) {
                this.serviceFavorites.removeFavorite(this.newFavorite);
            } else {
                this.serviceFavorites.addFavorite(this.newFavorite);
            }
            this.isFavorite = !this.isFavorite;
        },
        checkFavoriteStatus() {
            this.isFavorite = this.serviceFavorites.isFavorite(this.newFavorite);
        }
    }
}
</script>

<template>
    <div class="relative">
        <img v-if="detail.backdrop_path" class="w-full h-screen object-cover"
            :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`" />
        <img v-else-if="detail.poster_path" class="w-full h-screen object-cover"
            :src="`https://image.tmdb.org/t/p/original/${detail.poster_path}`" />
        <img v-else class="w-full h-screen object-cover"
            :src="`https://image.tmdb.org/t/p/original/${detail.profile_path}`" />
        <div
            class="absolute flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-center w-full h-screen top-0 left-0 bg-gradient-to-r from-black from-50% to-transparent opacity-95 p-8 lg:p-16">
            <div
                class="text-white max-w-md text-center mt-4 mb-4 lg:mt-0 lg:w-1/2 lg:pr-8 lg:flex lg:flex-col lg:justify-center lg:ml-16">
                <div class="text-3xl lg:text-5xl font-bold">{{ detail.title || detail.name }}</div>
                <div class="mt-2 lg:mt-4 w-full text-justify text-xl tracking-wide">{{ detail.overview }}</div>
                <div class="mt-4 lg:mt-8">
                    <Button @click="toggleFavorite"
                        class="rounded bg-red-700 text-black font-semibold hover:bg-black hover:text-red-700 hover:outline-none hover:ring-2 hover:ring-white p-1">
                        {{ isFavorite ? 'Remover' : 'Favoritar' }}
                        <v-icon :name="isFavorite ? 'fa-heart-broken' : 'ri-heart-add-line'"></v-icon>
                    </Button>
                </div>
            </div>
            <div v-if="firstTrailer"
                class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center">
                <iframe class="w-full h-full" :src="`https://www.youtube.com/embed/${firstTrailer.key}`"
                    :title="`${detail.name || detail.title}`" frameborder="0" allowfullscreen></iframe>
            </div>
            <div v-else
                class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center">
                <img class="w-full h-full"
                    :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path || detail.profile_path}`" />
            </div>
        </div>
    </div>
</template>