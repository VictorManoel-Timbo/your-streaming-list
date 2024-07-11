export class StreamingsContents {
    constructor(
        public adult?: boolean,
        public backdrop_path?: string,
        public id?: number,
        public name?: string, // series
        public title?: string, // filmes
        public original_language?: string,
        public original_name?: string, // series
        public original_title?: string, // filmes
        public overview?: string,
        public poster_path?: string,
        public media_type?: string,
        public genre_ids?: number[],
        public popularity?: number,
        public release_date?: string, // filmes
        public first_air_date?: string, // series
        public video?: boolean, // filmes
        public vote_average?: number,
        public vote_count?: number,
        public origin_country?: string[], // series
    ) {}
}