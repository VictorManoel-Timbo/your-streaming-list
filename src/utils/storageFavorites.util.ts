import { reactive } from "vue";

export let favoritesList = reactive({
    item: "",
    list: [] as string[]
})

export function setFavorite(item?: string) {
    localStorage.setItem("favorites", JSON.stringify(favoritesList.list))
}

export function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")!)
}

export function removeFavorite(item: string) {
    localStorage.removeItem(item)
    favoritesList.list = getFavorites()
}

export function clearFavorites() {
    localStorage.clear()
    favoritesList.list = getFavorites()
}

export default { getFavorites, setFavorite, removeFavorite, clearFavorites };