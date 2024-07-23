<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      filmes: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "movies"
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getMovies(this.page);
    }
  },
  created() {
    this.getMovies();
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getMovies(page?: number) {
      this.service.streamings
        .subscribe({
          next: (response: any) =>
            this.filmes = response.results
        })
      this.service.getMovies(page)
    },
  },
};
</script>


<template>
  <background :url="filmes" :isVisibleButton="false" />
  <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
</template>
