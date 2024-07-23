!--<script lang="ts">
export default {
    props: {
        favorite: { 
            type: Boolean,
            required: true
        }
    },
    data() {
        return {
            isFavorite: this.favorite
        }
    },
    watch: {
        favorite(newVal) {
            this.isFavorite = newVal;
        }
    },
    methods: {
        statusButton() {
            this.isFavorite = !this.isFavorite
            this.$emit("status", this.isFavorite)
        }
    }
}
</script>

<template>
    <div class="mt-4 lg:mt-8">
        <Button @click="statusButton"
            class="rounded bg-red-700 text-black font-semibold hover:bg-black hover:text-red-700 hover:outline-none hover:ring-2 hover:ring-white p-1">
            {{ isFavorite ? 'Remover' : 'Favoritar' }}
            <v-icon :name="isFavorite ? 'fa-heart-broken' : 'ri-heart-add-line'"></v-icon>
        </Button>
    </div>
</template>