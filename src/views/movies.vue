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
  <div class="flex items-center py-4 justify-center bg-gray-950 text-white">
    <Button type="button" @click="voltarPagina"
      class="no-underline text-md p-1 w-6 leading-none  font-extrabold transition duration-700 hover:scale-125 mt-0 mx-1">
      < 
    </Button>
    <div class="inline-flex text-center" >
      <Button v-if="count > 1 && count < 500" type="button" class="mx-1 w-6" @click="count--">
        {{ count-1 }}
      </Button>
      <Button type="button" class="mx-1 w-6 rounded-full ring-2 ring-white">
        {{ count }}
      </Button>
      <Button v-if="count > 1 && count < 500" type="button" class="mx-1 w-6" @click="count++">
        {{ count+1 }}
      </Button>
    </div>
    <Button type="button" @click="passarPagina"
      class="no-underline text-md p-1 w-6 leading-none font-extrabold transition duration-700 hover:scale-125 mt-0 mx-1">
      >
    </Button>
  </div>
</template>
