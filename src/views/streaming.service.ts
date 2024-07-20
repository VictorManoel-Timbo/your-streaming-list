import { BehaviorSubject, Observable, take } from "rxjs";
import { StreamingRest } from "../services/rest/streaming.rest";

export class StreamingService {
    constructor(private _streamings = new StreamingRest()) { }

    private streamings$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    streamings: Observable<any> = this.streamings$.asObservable();

    getAll(page?: number) {
        this._streamings.getAll(page)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.streamings$.next(response);
                },
                error: () => {
                    alert("Não foi possível recuperar os dados das Series e Filmes");
                }
            });
    }

    getMovies(page?: number) {
        this._streamings.getMovies(page)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.streamings$.next(response);
                },
                error: () => {
                    alert("Não foi possível recuperar os dados dos Filmes");
                }
            });
    }

    getSeries(page?: number) {
        this._streamings.getSeries(page)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.streamings$.next(response);
                },
                error: () => {
                    alert("Não foi possível recuperar os dados das Series");
                }
            });
    }

    getDetailStreaming(id: number, mediaType: string) {
        this._streamings.getDetails(id, mediaType)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.streamings$.next(response);
                },
                error: () => {
                    alert("Não foi possível recuperar o Trailer");
                }
            });
    }
}