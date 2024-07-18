<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/services/streaming.service';
import { favoritesList } from '@/utils/storageFavorites.util';
import { setFavorite } from '@/utils/storageFavorites.util';
import { removeFavorite } from '@/utils/storageFavorites.util';

export default {
    data() {
        return {
            detail: new StreamingsContents(),
            btn: false,
            favoritesList
        };
    },
    mounted() {
        this.getDetails();

    },
    computed: {
        service(): StreamingService {
            return new StreamingService();
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
            this.service.getDetailStreaming(parseInt(this.$route.params.id.toString()), this.$route.params.media.toString()!)
        },
        submit() {
            this.btn = !this.btn;
            let newFavorite = this.detail.name || this.detail.title;
            favoritesList.list.push(newFavorite!)
            setFavorite(newFavorite!);
            
        },
        remove(streaming: string) {
            removeFavorite(streaming)
            this.btn = !this.btn;
        }
    }
}
</script>
<template>
    <div class="relative">
        <img class="min-w-full h-screen" :src="`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`"
            alt="plano de fundo">
        <div
            class="absolute justify-between min-w-full h-screen top-0 left-0 bg-gradient-to-r from-black from-50% to-transparent opacity-95">
            <Card v-for="result in detail.videos?.results"
                class="lg:w-[700px] lg:h-[430px] w-96 h-96 overflow-hidden absolute lg:right-32 lg:top-52">
                <template #header>
                    <iframe v-if="result.type === `Trailer` || `Teaser`" class="lg:w-[700px] lg:h-[430px]"
                        :src="`https://www.youtube.com/embed/${result.key}`" :title="`${detail.name || detail.title}`"
                        frameborder="124" allowfullscreen>
                    </iframe>
                </template>
            </Card>
            <div class="text-white block">
                <div>
                    {{ detail.title || detail.name }}
                </div>
                <div class=" w-96">
                    {{ detail.overview }}
                </div>
                <div>
                    <Button type="button" @click="submit" v-if="btn === false"
                        class="bg-red-700 rounded text-black font-semibold hover:bg-black hover:text-red-700 focus:outline-none focus:text-red-700 focus:bg-black focus:ring-2 focus:ring-white hover:ring-2 hover:ring-white p-1">
                        Favoritar
                        <v-icon name="ri-heart-add-line"></v-icon>
                    </Button>
                    <Button type="button" @click="remove(detail.name || detail.title!)" v-else
                        class="bg-black rounded text-red-700 font-semibold hover:bg-red-700 hover:text-black outline-none focus:text-red-500 focus:bg-black ring-2 ring-white p-1">
                        Remover
                        <v-icon name="fa-heart-broken"></v-icon>
                    </Button>
                </div>
            </div>

        </div>
    </div>
</template>