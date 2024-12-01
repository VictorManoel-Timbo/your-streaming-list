<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      all: [] as StreamingsContents[],
      page: Number(this.$route.params.page),
      type: "home",
      isLoading: true
    };
  },
  watch: {
    '$route.params.page'(newPage) {
      this.page = Number(newPage);
      this.getAll(this.page);
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
            this.all = response.results;
            this.isLoading = false;
          }
        })
      this.service.getAll(page)
    },
  },
};
</script>

<template>
  <main>
    <page-loader v-if="isLoading"/>
    <section v-else class="bg-slate-950">
      <background :url="all" :isVisibleButton="false"/>
      <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
    </section>
  </main>
</template>
