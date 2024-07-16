import api from "../api-Config/rxjs-config";

export class StreamingRest {
    getAll(page?: number) {
        return api.get(`/trending/all/day?page=${page || 1}&language=pt-BR`);
    }

    getMovies(page?: number) {
        return api.get(`/trending/movie/day?page=${page || 1}&language=pt-BR`);
    }

    getSeries(page?: number) {
        return api.get(`/trending/tv/day?page=${page || 1}&language=pt-BR`);
    }

    getDetails(id: number, mediaType: string) {
        return api.get(`/${ mediaType }/${ id }?language=pt-BR&append_to_response=videos`);
    }
}