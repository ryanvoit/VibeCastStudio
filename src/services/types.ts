export interface ITrack {
    id: number;
    title: string;
    artist?: string;
    duration: number;
    size_mb: number;
    encoded_audio: string;
    favourite: boolean
}

export interface IPodcast {
    id: number;
    title: string;
    host?: string;
    duration: number;
    size_mb: number;
    category?: string;
    description?: string;
    encoded_audio: string;
    favourite: boolean
}

export interface fetchUser {
    username: string,
    password: string
}
