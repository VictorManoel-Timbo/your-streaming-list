<script lang="ts">
export default {
  props: {
    pageFather: {
      type: Number,
      required: true
    },
    type_media: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      page: this.pageFather,
    };
  },
  watch: {
    pageFather(newPage) {
      this.page = newPage;
    }
  },
  emits: ["response"],
  methods: {
    voltarPagina(first: boolean) {
      if (first) {
        this.page = 1;
      } else if (this.page > 1) {
        this.page--;
      }
      this.windowScroll()
      this.$emit("response", this.page);
    },
    passarPagina(last: boolean) {
      if (last) {
        this.page = 500;
      } else if (this.page < 500) {
        this.page++;
      }
      this.windowScroll()
      this.$emit("response", this.page);
    },
    windowScroll() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }
  }
};
</script>

<template>
  <div class="flex items-center py-4 justify-center bg-slate-950 text-white">
    <RouterLink :to="`/${type_media}/${page}`">
      <Button type="button" @click="voltarPagina(true)"
        class="no-underline scale-125 p-1 leading-none font-extrabold transition duration-300 hover:scale-100 mt-0" unstyled>
        <v-icon name="md-keyboarddoublearrowleft-round" />
      </Button>
      <Button type="button" @click="voltarPagina(false)"
        class="no-underline scale-125 p-1 leading-none font-extrabold transition duration-300 hover:scale-100 mt-0 mr-1" unstyled>
        <v-icon name="md-keyboardarrowleft-round" />
      </Button>
      <div class="inline-flex text-center">
        <Button v-if="page > 1 && page < 500" type="button" class="mx-1 w-6" @click="page--" unstyled>
          {{ page - 1 }}
        </Button>
        <Button type="button" class="p-1 mx-1 w-8 text-center rounded-full ring-2 ring-white" unstyled>
          {{ page }}
        </Button>
        <Button v-if="page > 1 && page < 500" type="button" class="mx-1 w-6" @click="page++" unstyled>
          {{ page + 1 }}
        </Button>
      </div>
      <Button type="button" @click="passarPagina(false)"
        class="no-underline scale-125 p-1 leading-none font-extrabold transition duration-300 hover:scale-100 mt-0 ml-1" unstyled>
        <v-icon name="md-keyboardarrowright-round" />
      </Button>
      <Button type="button" @click="passarPagina(true)"
        class="no-underline scale-125 p-1 leading-none font-extrabold transition duration-300 hover:scale-100 mt-0" unstyled>
        <v-icon name="md-keyboarddoublearrowright-round" />
      </Button>
    </RouterLink>
  </div>
</template>
