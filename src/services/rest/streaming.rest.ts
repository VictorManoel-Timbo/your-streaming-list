import api from "../api-Config/rxjs-config";

export class StreamingRest {
    getAll(page?: number) {
        return api.get(`/trending/all/day?page=${page || 1}`);
    }

    getMovies(page?: number) {
        return api.get(`/trending/movie/day?page=${page || 1}`);
    }

    getSeries(page?: number) {
        return api.get(`/trending/tv/day?page=${page || 1}`);
    }

    getDetails(id: number, mediaType: string) {
        return api.get(`/${ mediaType }/${ id }?append_to_response=videos`);
    }
}