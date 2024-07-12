<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/services/algo.service';

export default {
  data() {
    return {
      series: new Array<StreamingsContents>(),
      count: 1,
    };
  },
  mounted() {
    this.getSeries();
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getSeries(page?: number) {
      this.service.dados.subscribe({ next: (response: any) => this.series = response.results })
      this.service.getStreamings(`/tv/day?page=${this.count || page}&language=pt-BR`)
    },
    voltarPagina() {
      if(this.count > 1) {
        this.count--;
        this.getSeries(this.count);
      }
    },
    passarPagina() {
      if(this.count < 500) {
        this.count++;
        this.getSeries(this.count);
      }
    }
  },
};
</script>

<template>
  <div class=" h-full bg-blue-950">
    <header class="text-center font-semibold italic text-3xl text-white">Series</header>

    <div class="text-center px-4">
      <ul>
        <li class="inline-block m-6 mt-4 relative text-center" v-for="genre in series" :key="genre.id">

          <div class="w-full relative ">

            <div class="transform transition duration-500 hover:scale-110 ">
              <RouterLink to="/details">
                <img :src="`https://image.tmdb.org/t/p/w342/${genre.poster_path}`" alt="imagem não carregada">
              </RouterLink>
            </div>
          </div>

        </li>
      </ul>
    </div>

    <div class="flex items-center py-4 justify-center">
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
  </div>
</template>
