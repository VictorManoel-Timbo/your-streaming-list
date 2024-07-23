<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      series: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "series"
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getSeries(this.page);
    }
  },
  created() {
    this.getSeries();
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
  },
};
</script>

<template>
  <background :url="series" :isVisibleButton="false" />
  <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
</template>
