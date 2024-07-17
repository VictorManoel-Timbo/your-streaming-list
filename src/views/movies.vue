<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

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
      this.service.streamings.subscribe({ next: (response: any) => this.filmes = response.results })
      this.service.getMovies(page)
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
  <background :url="filmes" />
    <div class="flex items-center py-4 justify-center">
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
</template>
