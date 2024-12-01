<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';
import { FavoritesService } from '@/views/Favorite/favorite.service';
import Resume from './components/resume.vue';

export default {
    components: {
        Resume
    },
    data() {
        return {
            detail: new StreamingsContents(),
            isFavorite: false,
            isLoading: true,
            genres: [] as string[]
        }
    },
    created() {
        this.getDetails();
        this.updateButtonStatus();
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
        },
    },
    methods: {
        getDetails() {
            this.service.streamings
                .subscribe({
                    next: (response: any) => {
                        this.detail = response;
                        this.detail.vote_average! /= 2;
                        this.isLoading = false;
                    }
                })
            this.service.getDetailStreaming(Number(this.$route.params.id.toString()), this.$route.params.media.toString()!);
        },
        toggleFavorite() {
            this.detail.media_type = this.$route.params.media.toString();
            if (this.isFavorite) {
                this.serviceFavorites.removeFavorite(this.detail);
            } else {
                this.serviceFavorites.addFavorite(this.detail);
            }
            this.isFavorite = !this.isFavorite;
        },
        updateButtonStatus() {
            const favorites = this.serviceFavorites.favoritesList.list
            favorites.forEach(item => {
                if (item.id === Number(this.$route.params.id) && item.media_type === this.$route.params.media) {
                    this.isFavorite = true;
                }
            })
        },
    }
}
</script>

<template>
    <main>
        <page-loader v-if="isLoading" />
        <section v-else class="relative">
            <img class="w-full h-screen object-cover bg-slate-950"
                :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path || detail.poster_path || detail.profile_path}`" />
            <div class="w-full h-screen absolute top-0 left-0 bg-gradient-to-r from-black from-30% to-transparent opacity-95"></div>
            <section
                class="absolute flex flex-col justify-center items-center lg:flex-row lg:justify-around lg:items-center w-full h-screen top-0 left-0 p-8 lg:p-16">
                <div
                    class="text-white max-w-md text-center mt-4 mb-4 lg:mt-0 lg:w-1/2 lg:pr-8 lg:flex lg:flex-col lg:justify-center lg:ml-16">
                    <Resume :details="detail"/>
                    <div class="mt-4 lg:mt-8">
                        <Button @click="toggleFavorite"
                            class="rounded bg-red-700 text-black font-semibold hover:bg-black hover:text-red-700 hover:outline-none hover:ring-2 hover:ring-white p-1"
                            unstyled>
                            {{ isFavorite ? 'Remover' : 'Favoritar' }}
                            <v-icon :name="isFavorite ? 'fa-heart-broken' : 'ri-heart-add-line'"></v-icon>
                        </Button>
                    </div>
                </div>
                <div
                    class="w-4/5 h-60 sm:h-72 sm:w-2/3 md:h-96 md:w-2/3 lg:w-[700px] lg:h-[430px] overflow-hidden lg:mb-0 lg:ml-8 lg:flex lg:items-center border-2 border-red-700 bg-black bg-opacity-85 flex items-center justify-center">
                    <iframe v-if="firstTrailer" class="w-full h-full"
                        :src="`https://www.youtube.com/embed/${firstTrailer.key}`"></iframe>
                    <img v-else-if="detail.backdrop_path || detail.profile_path" class="w-full h-full"
                        :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path || detail.profile_path}`" />
                    <ProgressSpinner v-else/>
                </div>
            </section>
        </section>
    </main>
</template>

<style scoped>
:deep(.custom-rating .p-rating-option-active .p-rating-icon) {
    @apply text-yellow-500;
}
</style>