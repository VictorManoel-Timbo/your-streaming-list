<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      filmes: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "movies",
      search: ""
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getMovies(this.page);
    },
  },
  created() {
    this.getMovies(this.page);
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
    getSearch(search: string) {
      this.service.streamings
        .subscribe({
          next: (response) => {
            this.filmes = response.results
            this.filmes.forEach(filme => filme.media_type = "movie")
          }
        })
      this.service.getSearch(search, "movie");
    }
  },
};
</script>


<template>
  <main>
    <background :url="filmes" :isVisibleButton="false" @search="getSearch" />
    <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
  </main>
</template>
