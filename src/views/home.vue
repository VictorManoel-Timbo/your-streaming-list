<script lang="ts">
import type { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      all: new Array<StreamingsContents>(),
      page: Number(this.$route.params.page),
      type: "home"
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
          next: (response: any) =>
            this.all = response.results
        })
      this.service.getAll(page)
    },
  },
};
</script>

<template>
  <background :url="all" :botao="false" />
  <paginator :pageFather="page" :type_media="type" @response="(newPage: any) => page = newPage" />
</template>
