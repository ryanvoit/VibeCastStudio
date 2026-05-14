import { el } from "redom"
import { ITrack } from "../../services/types";
import pic from "./img.svg";
import { buttonInit, btnPlayer } from "../elements/button"
import { numToMin } from "../../services/playerRanges"
import { maxRange, numRangeToDuration, volumeValToWidth } from "../../services/playerRanges"
import { svgInit } from "../elements/svg"
import { listening } from "../../services/listening"
import localStorageWork from "../../model/localStorageClass";

const lS = new localStorageWork()

export function player(tracks: Array<ITrack>, id: number, token: string, tracksFav: Array<ITrack>) {
    let track = tracks.find(tracking => tracking.id === id)
    // let track = tracks[id - 1]
    if(!track) {
        track = tracks[0]
    }

    lS.saveTrackId(track.id)
    const index = tracks.indexOf(track)
    console.log(index);

    let range = el('input.player__range', {
        type: 'range',
        min: 0,
        max: maxRange(track.duration),
        step: 1,
        value: 0
    }) as HTMLInputElement
    const outputRange = el('output.player__output', `${numRangeToDuration(Number(range.value))}`)

    range.addEventListener("input", (event) => {
        outputRange.textContent = numRangeToDuration(Number((event.target as HTMLInputElement).value))
    })

    listening(range, outputRange)
    const maxVolume: number = 20

    const rangeVolume = el('input.player__range-volume', {
        type: 'range',
        min: 0,
        max: maxVolume,
        step: 1,
        value: Math.floor(maxVolume * 0.5)
    }) as HTMLInputElement

    const rangeVolumeLevel = el('span.player__level')

    rangeVolume.addEventListener("input", (event) => {
        rangeVolumeLevel.style.width = volumeValToWidth(Number((event.target as HTMLInputElement).value), maxVolume)
    })

    const player = el('.player__super-wrapper', [
        el('.player__wrapper', [
            el('img.player__pic', { src: pic, height: 60, width: 60, alt: 'Обложка альбома' }),
            el('.player__inner', [
                el('span.player__title', [
                    el('span.player__name', `${track.title}`),
                    el('span.player__favourite', buttonInit('favourite-noCell', tracks, id, token, tracksFav))
                ]),
                el('span.player__artist', `${track.artist}`)
            ])
        ]),
        el('.player__duration-wrapper', [
            el('.player__buttons', [
                btnPlayer('shuffle', tracks, id, token),
                btnPlayer('back', tracks, id, token, index),
                btnPlayer('playSong'),
                btnPlayer('next', tracks, id, token, index),
                btnPlayer('repeat', tracks, id, token)
            ]),
            el('.player__range-wrapper', [
                outputRange,
                range,
                el('span.player__duration', `${numToMin(track.duration)}`)
            ])
        ]),
        el('.player__volume', [
            svgInit('speaker'),
            rangeVolume,
            rangeVolumeLevel
        ])
    ])

    return player
}