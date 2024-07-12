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
  <nav-bar />
  <div class="h-full bg-blue-950">
    <header class="pt-4 text-center font-semibold italic text-3xl text-white">Todos</header>
    <div class="text-center px-4">
      <ul>
        <li class="inline-block m-6 mt-4 text-white text-center" v-for="genre in todos" :key="genre.id">
          <div class="w-fit m-auto">
            <div class="my-1 p-2 hover:bg-orange-500">
              <RouterLink to="/details">
                <img :src="`https://image.tmdb.org/t/p/w342/${genre.poster_path}`" alt="imagem não carregada">
              </RouterLink>
            </div>
            {{ genre.title || genre.name }} +
            {{ genre.popularity }}
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
