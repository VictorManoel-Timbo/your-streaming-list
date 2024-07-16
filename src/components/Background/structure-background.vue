<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';

export default {
    name: "Background",
    props: {
        url: Array<StreamingsContents>,
    },
    emits: ["next","past"]
}
</script>

<template>
    <div class="w-full text-center inline-flex min-h-screen min-w-full justify-center flex-wrap p-8 bg-gray-950">
        <div>
            <ul>
                <li class="inline-block m-8 relative text-center" v-for="streaming in url" :key="streaming.id">
                    <div class="w-full relative ">
                        <div class="transform transition duration-500 hover:scale-110 ">
                            <RouterLink :to="`/details/${streaming.media_type}/${streaming.id}`">
                                <Card style="width: 304px; height: 456px; overflow: hidden">
                                    <template #header>
                                        <img :src="`https://image.tmdb.org/t/p/w342/${streaming.poster_path}`"
                                            alt="imagem não carregada">
                                    </template>
                                </Card>
                            </RouterLink>
                        </div>
                    </div>
                </li>
            </ul>
            <div class="flex items-center py-4 justify-center">
                <Button type="button" @click=""
                    class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
                <Button type="button" @click=""
                    class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
            </div>
        </div>
    </div>
</template>