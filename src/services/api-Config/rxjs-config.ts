// config rxjs
import { Observable, defer, map } from "rxjs";
import api from "./setup";

const get = <T>(
    url: string,
    params?: object,
    baseURL?: string,
): Observable<T> => {
    return defer(() =>
        api(baseURL).get<T>(url, { params })
    ).pipe(map((result) => result.data));
};

export default { get };