<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      all: new Array<StreamingsContents>(),
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
      this.service.streamings
        .subscribe({
          next: (response: any) => this.all = response.results
        })
      this.service.getAll(page)
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
    <background :url="all" />
    <div class="flex items-center py-4 justify-center">
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
</template>
