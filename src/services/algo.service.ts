import { BehaviorSubject, Observable, take } from "rxjs";
import { StreamingRest } from "./rest/streaming.rest";

export class StreamingService {
    constructor(private _dados = new StreamingRest()) {}

    private dados$: BehaviorSubject<any> = new BehaviorSubject<any>([]);

    dados: Observable<any> = this.dados$.asObservable();

    getStreamings(endpoint: any) {
        this._dados.getStreamings(endpoint)
            .pipe()
            .subscribe({
                next: (response: any) => {
                    this.dados$.next(response);
                    console.log("Deu certo pegar todos os contatos {getStreamings()}");
                    console.log(response.results)
                },
                error: () => {
                    console.log("Deu erro em pegar todos os contatos {getStreamings()}")
                }
            });
    }
}