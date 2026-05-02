import { OmitFavouriteTrack, OmitFavouritePodcast, IPodcast, ITrack } from "./types";

export function tracksProcess(tracks: Array<OmitFavouriteTrack>, podcasts: Array<OmitFavouritePodcast>): Array<ITrack & IPodcast> {
    let trax = []
    let idArr: number[] = []

    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];

        const track2 = {
            ...track,
            favourite: false
        }
        
        idArr.push((tracks)[i].id)
        trax.push(track2)
    }

    const max = Math.max(...idArr)

    for (let i = 0; i < podcasts.length; i++) {
        let podcast = podcasts[i];

        const podcast2 = {
            ...podcast,
            id: podcast.id + max,
            favourite: false
        }

        trax.push(podcast2)
    }

    /**
     * ! fetch /favourite - GET --> if(favourite) --> favourite: true
     */
    
    return trax
}