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
      if(this.count > 1) {
        this.count--;
        this.getAll(this.count);
      }
    },
    passarPagina() {
      if(this.count < 500) {
        this.count++;
        this.getAll(this.count);
      }
    }
  },
};
</script>


<template>
  <nav-bar />
  <div class=" h-full bg-blue-950">
    <header class="text-center font-semibold italic text-3xl text-white">Todos</header>
    <ul>
      <li v-for="genre in todos" :key="genre.id" class="my-6 text-white text-center">
        {{ genre.title || genre.name }}
      </li>
    </ul>
    <div class="flex items-center py-4 justify-center" >
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
  </div>
</template>
