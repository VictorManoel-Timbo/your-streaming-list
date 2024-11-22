<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      series: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "series",
      search: ""
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getSeries(this.page);
    },
  },
  created() {
    this.getSeries(this.page);
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getSeries(page?: number) {
      this.service.streamings
        .subscribe({
          next: (response: any) =>
            this.series = response.results
        })
      this.service.getSeries(page)
    },
    getSearch(search: string) {
      this.service.streamings
        .subscribe({
          next: (response) => {
            this.series = response.results
            this.series.forEach(serie => serie.media_type = "tv")
          }
        })
      this.service.getSearch(search, "tv");
    }
  },
};
</script>

<template>
  <main>
    <background :url="series" :isVisibleButton="false" @search="getSearch" />
    <paginator v-if="search === ''" :pageFather="page" :type_media="type"
      @response="(newPage: any) => page = newPage" />
  </main>
</template>
