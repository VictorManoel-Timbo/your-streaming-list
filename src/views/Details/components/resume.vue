<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import type { PropType } from 'vue';

export default {
    props: {
        details: {
            type: {} as PropType<StreamingsContents>,
            required: true
        },
    },
    data() {
        return {
            isLoading: true
        }
    },
    watch: {
        "genres"(newValue) {
            if (newValue.length !== 0) {
                this.isLoading = false;
            }
        }
    },
    methods: {
        isMovie(): boolean {
            return this.$route.params.media === "movie" ? true : false;
        },
    },
    computed: {
        genres(): Array<string> {
            let array = [] as string[];
            if (this.details.genres) {
                this.details.genres!.forEach(item => {
                    array.push(item.name!);
                });
            }
            return array;
        },
        votes(): number {
            return this.details.vote_average ? this.details.vote_average : 0;
        }
    }
}
</script>

<template>
    <main>
        <Skeleton v-if="isLoading" size="400px" class="!bg-slate-900"/>
        <section v-else class="bg-black bg-opacity-80 px-3 py-5 rounded-xl border">
            <span class="text-3xl lg:text-5xl font-bold">{{ details.title || details.name }}</span>
            <section class="font-mono text-justify font-bold mt-2 text-red-700">
                <div class="flex-col flex sm:flex-row justify-evenly">
                    <Rating v-model="votes" readonly class="custom-rating my-2" />
                    <span v-if="isMovie()" class="mt-2">{{ details.runtime }} min</span>
                    <span v-else class="mt-2">
                        {{ details.number_of_episodes }} Episodes | {{ details.number_of_seasons }} Seasons
                    </span>
                </div>
                <div class="text-start sm:text-center mt-2">
                    <span v-for="genre in genres" class="mr-3">
                        {{ genre }}
                    </span>
                </div>
            </section>
            <p class="mt-2 lg:mt-4 w-full text-justify text-xl tracking-wide">{{ details.overview }}</p>
        </section>
    </main>
</template>