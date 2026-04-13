import { el } from "redom"
import { IPodcast, ITrack } from "../../types"
import pic from "./img.svg"
import { buttonInit } from "../elements/button"

const track: ITrack & IPodcast = {
        id: 1,
        title: "Eternal Sunset",
        artist: "Skyline Sounds",
        duration: 9.36,
        size_mb: 8.57,
        encoded_audio:
            "QXVkaW8gZGF0YSBmb3IgRXRlcm5hbCBTdW5zZXQgYnkgU2t5bGluZSBTb3VuZHM=",
        favourite: true
    }

export const player = el('.player', [
    el('.player__wrapper',  [
        el('img.player__pic', { src: pic, height: 60, width: 60 }),
        el('.player__inner', [
            el('span.player__title', [
                el('span.player__name', `${track.title}`),
                el('span.player__favourite', buttonInit('favourite', track.favourite))
            ]),
            el('span.player__artist', (track.artist) ? `${track.artist}` : `${track.host}`)
        ])
    ]),
    el('.player__range'),
    el('.player__volume')
])