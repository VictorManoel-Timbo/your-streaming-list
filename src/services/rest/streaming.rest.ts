import api from "../api-Config/rxjs-config";

export class StreamingRest {
    getStreamings(endpoint: any) {
        return api.get(`${endpoint}`);
    }
}