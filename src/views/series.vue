<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

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
      this.service.streamings.subscribe({ next: (response: any) => this.series = response.results })
      this.service.getSeries(page)
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
 <background :url="series" />
    <div class="flex items-center py-4 justify-center">
      <Button type="button" @click="voltarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Anterior</Button>
      <Button type="button" @click="passarPagina"
        class="no-underline text-sm p-2 leading-none border rounded text-black border-black hover:border-transparent hover:bg-yellow-500 hover:text-red-700 mt-4 sm:mt-0">Proximo</Button>
    </div>
</template>
