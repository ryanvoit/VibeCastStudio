import { tracks } from "../view/pages/tracks";
import { podcasts } from "../view/pages/podcasts"

export function tracksProcess() {
    let trax = []

    for (let i = 0; i < tracks.length; i++) {
        let track = tracks[i];

        const track2 = {
            ...track,
            favourite: false
        }

        trax.push(track2)
    }

    for (let i = 0; i < podcasts.length; i++) {
        let podcast = podcasts[i];

        const podcast2 = {
            ...podcast,
            favourite: false
        }

        trax.push(podcast2)
    }
    
    return trax
}