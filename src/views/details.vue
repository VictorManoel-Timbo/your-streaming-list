<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/services/streaming.service';

export default {
    data() {
        return {
            detail: new StreamingsContents(),
        };
    },
    mounted() {
        this.getTrailer();
    },
    computed: {
        service(): StreamingService {
            return new StreamingService();
        }
    },
    methods: {
        getTrailer() {
            this.service.streamings
                .subscribe({
                    next: (response: any) => {
                        this.detail = response;
                        console.log(response.videos.results[0])
                    }
                })
            this.service.getDetailStreaming(parseInt(this.$route.params.id.toString()), this.$route.params.media.toString()!)

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
            </div>

        </div>
    </div>
</template>