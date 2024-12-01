<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      series: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "series",
      isLoading: true
    }
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getSeries(this.page);
    }
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
          next: (response: any) => {
            this.series = response.results;
            this.isLoading = false;
          }
        })
      this.service.getSeries(page)
    },
  },
};
</script>

<template>
  <page-loader v-if="isLoading" />
  <section v-else class="bg-slate-950">
    <background :url="series" :isVisibleButton="false" />
    <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
  </section>
</template>
