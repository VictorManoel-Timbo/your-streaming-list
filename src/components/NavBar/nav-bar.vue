<script lang="ts">
import { OhVueIcon } from "oh-vue-icons";
import { RouterLink } from "vue-router";

export default {
    name: "NavBar",
    components: {
        "v-icon": OhVueIcon
    },
    data() {
        return {
            menu: false,
        }
    },
    methods: {
        toggle() {
            this.menu = !this.menu
        }
    }
}
</script>

<template>
    <div class="font-sans antialiased" id="nav-bar">
        <nav class="flex items-center justify-between flex-wrap bg-blue-900 p-6">
            <div class="flex items-center flex-no-shrink text-white mr-6">
                <span class="font-semibold italic text-2xl tracking-tight">Canal com K</span>
            </div>
            <div class="block sm:hidden">
                <Button @click="toggle"
                    class="flex items-center px-3 py-2 border rounded hover:text-white hover:border-white">
                    <v-icon class="fill-current h-3 w-3" viewBox="0 0 20 20" name="hi-menu"/>
                </Button>
            </div>
            <div :class="menu ? 'block' : 'hidden'" class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                <div class="text-sm sm:flex-grow">
                    <RouterLink to="/"
                        class="no-underline block text-base mt-4 sm:inline-block sm:mt-0 text-white hover:text-red-500 font-semibold mr-4">
                        Home
                    </RouterLink>
                    <RouterLink to="/"
                        class="no-underline block text-base mt-4 sm:inline-block sm:mt-0 text-white hover:text-red-500 font-semibold mr-4">
                        Filmes
                    </RouterLink>
                    <RouterLink to="/"
                        class="no-underline block text-base mt-4 sm:inline-block sm:mt-0  text-white hover:text-red-500 font-semibold mr-4">
                        Series
                    </RouterLink>
                </div>
                <div>
                    <RouterLink
                        class="no-underline inline-block text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:bg-white hover:text-red-700 mt-4 sm:mt-0"
                        to="/">
                        <span>
                            Favoritos
                            <v-icon name="ri-heart-fill" />
                        </span>
                    </RouterLink>
                </div>
            </div>
        </nav>
    </div>
</template>
