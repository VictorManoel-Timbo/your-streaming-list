<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/services/algo.service';

export default {
  data() {
    return {
      filmes: new Array<StreamingsContents>(),
      count: 1,
    };
  },
  mounted() {
    this.getMovies();
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getMovies(page?: number) {
      this.service.dados.subscribe({ next: (response: any) => this.filmes = response.results })
      this.service.getStreamings(`/movie/day?page=${this.count || page}&language=pt-BR`)
    },
    voltarPagina() {
      if (this.count > 1) {
        this.count--;
        this.getMovies(this.count);
      }
    },
    passarPagina() {
      if (this.count < 500) {
        this.count++;
        this.getMovies(this.count);
      }
    }
  },
};
</script>


<template>
  <div class="h-full bg-blue-950">
    <header class="pt-4 text-center font-semibold italic text-3xl text-white">Filmes</header>


    <div class="text-center px-4">
      <ul>
        <li class="inline-block relative m-6 mt-4 text-center" v-for="genre in filmes" :key="genre.id">

          <div >

            <div class="w-full relative mx-auto h-auto overflow-hidden rounded-lg bg-black">
              <RouterLink to="/details">
                <img class="w-full h-auto relative z-0 rounded-lg transition-all duration-300 hover:scale-110"
                  :src="`https://image.tmdb.org/t/p/w342/${genre.poster_path}`" alt="imagem não carregada">
              </RouterLink>
            </div>
          </div>

        </li>
      </ul>
    </div>


    <div class="flex items-center py-4 justify-center">
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
  </div>
</template>
