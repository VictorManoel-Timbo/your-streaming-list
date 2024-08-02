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
    'search'() {
      if (this.search !== '') {
        this.getSearch(this.search.toLowerCase());
      } else {
        this.getMovies(this.page)
      }
    }
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
            this.filmes.forEach( filme => filme.media_type = "movie")
          }
        })
      this.service.getSearch(search, "movie");
    }
  },
};
</script>


<template>
  <background :url="filmes" :isVisibleButton="false" @search="(value: any) => search = value" />
  <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
</template>
