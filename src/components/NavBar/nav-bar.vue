<script lang="ts">
import { RouterLink } from 'vue-router';

export default {
    name: 'Navbar',
    data() {
        return {
            navigation: [
                { name: 'Home', href: `/home/${1}`, current: false },
                { name: 'Filmes', href: `/movies/${1}`, current: false },
                { name: 'Series', href: `/series/${1}`, current: false },
            ],
            stateOpenMobileMenu: false,
            mobileButton: 'hi-menu'
        }
    },
    methods: {
        toggleIconMenuButton(): void {
            this.stateOpenMobileMenu = !this.stateOpenMobileMenu;
            if (this.stateOpenMobileMenu) {
                this.mobileButton = 'hi-solid-dots-vertical';
            } else {
                this.mobileButton = 'hi-menu';
            }
        },
    }
}
</script>

<template>
    <main class="bg-cyan-700 min-w-full">
        <div class="min-w-full max-w-7xl px-2 sm:px-6 lg:px-8">
            <div class="relative flex h-16 items-center justify-between">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <div @click="toggleIconMenuButton()"
                        class="relative inline-flex items-center justify-center rounded-md p-2 text-white hover:bg-cyan-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                        <span class="absolute -inset-0.5" />
                        <v-icon v-model:name="mobileButton" class="block h-6 w-6" aria-hidden="true" />
                    </div>
                </div>
                <div class="flex flex-1 items-center justify-center sm:items-center">
                    <RouterLink to="/home/1">
                        <div class="flex items-center justify-start italic text-white font-semibold text-xl">
                            Your Streaming List
                        </div>
                    </RouterLink>
                    <div class="hidden flex-1 text-center sm:block">
                        <div class="inline-flex space-x-4 sm:mr-6">
                            <RouterLink v-for="item in navigation" :key="item.name" :to="item.href"
                                :class="[item.current ? ' text-gray-100 hover:bg-cyan-800 hover:text-white' : 'focus:bg-cyan-900 text-gray-100 hover:bg-cyan-800 hover:text-white', 'rounded-md px-3 py-2 text-sm text-center font-medium']"
                                :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                            </RouterLink>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <RouterLink to="/favorite/1">
                        <button type="button"
                            class="relative rounded-full bg-cyan-700 p-1 text-gray-300 hover:text-white focus:outline-none focus:text-red-700 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-700">
                            <span class="absolute -inset-1.5" />
                            <span class="sr-only">Favoritos</span>
                            <v-icon name="ri-heart-fill" class="h-6 w-6" aria-hidden="true" />
                        </button>
                    </RouterLink>
                    <div class="relative ml-3">
                        <div>
                            <div
                                class="relative flex rounded-full bg-cyan-700 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                <span class="absolute -inset-1.5" />
                                <img class="h-8 w-8 rounded-full"
                                    src="https://img.freepik.com/fotos-gratis/vista-do-aviador-pinguim-3d-animado-de-desenho-animado_23-2150882072.jpg?t=st=1720964224~exp=1720967824~hmac=058710a890e0ba36c6a696faf011eafcade9c9b584c311261b62f830cdf1971d&w=740"
                                    alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <section class="sm:hidden" :class="stateOpenMobileMenu ? '' : 'hidden'">
            <div class="space-y-1 px-2 pb-3 pt-2">
                <div v-for="item in navigation" :key="item.name" as="a" :href="item.href"
                    :class="[item.current ? 'bg-cyan-900 text-white' : 'text-gray-200 hover:bg-cyan-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium']"
                    :aria-current="item.current ? 'page' : undefined">{{ item.name }}
                </div>
            </div>
        </section>
    </main>
</template>
