<script lang="ts">
import { StreamingsContents } from '@/models/streaming.model';
import { StreamingService } from '@/views/streaming.service';

export default {
  data() {
    return {
      series: new Array<StreamingsContents>(),
      count: 1,
    };
  },
  mounted() {
    this.getSeries();
  },
  computed: {
    service(): StreamingService {
      return new StreamingService();
    }
  },
  methods: {
    getSeries(page?: number) {
      this.service.streamings.subscribe({ next: (response: any) => this.series = response.results })
      this.service.getSeries(page)
    },
    voltarPagina(first: boolean) {
      if (first) {
        this.count = 1;
      } else {
        if (this.count > 1) {
          this.count--;
        }
      }
    },
    passarPagina(last: boolean) {
      if (last) {
        this.count = 500
      } else {
        if (this.count < 500) {
          this.count++;
        }
      }
    }
  },
};
</script>

<template>
  <background :url="series" />
  <div class="flex items-center py-4 justify-center bg-gray-950 text-white">
    <Button type="button" @click="voltarPagina(true)"
      class="no-underline text-md p-1 leading-none  font-extrabold transition duration-500 hover:scale-125 mt-0">
      <v-icon name="md-keyboarddoublearrowleft-round" />
    </Button>
    <Button type="button" @click="voltarPagina(false)"
      class="no-underline text-md p-1 leading-none  font-extrabold transition duration-500 hover:scale-125 mt-0 mr-1">
      <v-icon name="md-keyboardarrowleft-round" />
    </Button>
    <div class="inline-flex text-center">
      <Button v-if="count > 1 && count < 500" type="button" class="mx-1 w-6" @click="count--">
        {{ count - 1 }}
      </Button>
      <Button type="button" class=" p-1 mx-1 w-8 text-center rounded-full ring-2 ring-white">
        {{ count }}
      </Button>
      <Button v-if="count > 1 && count < 500" type="button" class="mx-1 w-6" @click="count++">
        {{ count + 1 }}
      </Button>
    </div>
    <Button type="button" @click="passarPagina(false)"
      class="no-underline text-lg p-1 leading-none font-extrabold transition duration-500 hover:scale-125 mt-0 ml-1">
      <v-icon name="md-keyboardarrowright-round" />
    </Button>
    <Button type="button" @click="passarPagina(true)"
      class="no-underline text-lg p-1 leading-none font-extrabold transition duration-500 hover:scale-125 mt-0">
      <v-icon name="md-keyboarddoublearrowright-round" />
    </Button>
  </div>
</template>
