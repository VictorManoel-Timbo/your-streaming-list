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
    'search'() {
      if (this.search !== '') {
        this.getSearch(this.search.toLowerCase());
      } else {
        this.getAll(this.page)
      }
    }
  },
  created() {
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
  <background :url="all" :isVisibleButton="false" @search="(value: any) => search = value" />
  <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
</template>
