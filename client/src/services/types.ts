export interface ITrack {
    id: number;
    title: string;
    artist?: string;
    duration: number;
    size_mb: number;
    encoded_audio: string;
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
}

export interface fetchUser {
    username: string,
    password: string
}

export interface idTrack {
    trackId: number
}
