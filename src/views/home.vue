<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/services/algo.service';

export default {
  data() {
    return {
      todos: new Array<StreamingsContents>(),
      count: 1,
    };
  },
  mounted() {
    this.getAll();
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getAll(page?: number) {
      this.service.dados.subscribe({ next: (response: any) => this.todos = response.results })
      this.service.getStreamings(`/all/day?page=${this.count || page}&language=pt-BR`)
    },
    voltarPagina() {
      if (this.count > 1) {
        this.count--;
        this.getAll(this.count);
      }
    },
    passarPagina() {
      if (this.count < 500) {
        this.count++;
        this.getAll(this.count);
      }
    }
  },
};
</script>


<template>
  <div class="h-full bg-blue-950">
    <header class="pt-4 text-center font-semibold italic text-3xl text-white">Todos</header>

   <!-- <div class="text-center px-4">
      <ul>
        <li class="inline-block m-6 mt-4 relative text-center" v-for="genre in todos" :key="genre.id">

          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div class="w-full relative mx-auto h-auto overflow-hidden rounded-lg m-2">
              <RouterLink to="/details">
                <img class="w-full h-auto relative z-0 rounded-lg scale-110 transition-all duration-300 hover:scale-100" :src="`https://image.tmdb.org/t/p/w342/${genre.poster_path}`" alt="imagem não carregada">
              </RouterLink>
            </div>
          </div>

        </li>
      </ul>
    </div>-->

    
    <div class="text-center px-6">
      <ul>
        <li class="inline-block m-9 mt-4 relative text-white text-center" v-for="genre in todos" :key="genre.id">
          <div>
            <div class="w-full relative mx-auto h-auto overflow-hidden bg-black bg-opacity-70" >
              <RouterLink to="/details">
                <img class=" w-full h-auto relative z-0 scale-100 transition-all duration-300 hover:scale-95 hover:opacity-70" :src="`https://image.tmdb.org/t/p/w342/${genre.poster_path}`" alt="imagem não carregada">
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
