export class StreamingsContents {
    constructor(
        public adult?: boolean,
        public backdrop_path?: string,
        public id?: number,
        public name?: string, // series
        public title?: string, // filmes
        public overview?: string,
        public poster_path?: string,
        public media_type?: string,
        public genre_ids?: number[],
        public popularity?: number,
        public release_date?: string, // filmes
        public first_air_date?: string, // series
        public videos?: Videos
    ) { }
}

class Videos {
    constructor(
        public results: [
            {
                key?: string,
                type?: string,
                official?: boolean,
            }
        ]
    ) { }
}