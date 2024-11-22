<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      all: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "home",
      search: ""
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getAll(this.page);
    },
  },
  mounted() {
    this.getAll(this.page);
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
          next: (response: any) => {
            this.all = response.results
          }
        })
      this.service.getAll(page)
    },
    getSearch(search: string) {
      this.service.streamings
        .subscribe({
          next: (response) => {
            this.all = response.results
          }
        })
      this.service.getSearch(search);
    }
  },
};
</script>

<template>
  <main>
    <background :url="all" :isVisibleButton="false" @search="getSearch" />
    <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
  </main>
</template>
