import { el } from "redom"
import { IPodcast, ITrack } from "../../services/types"
import pic from "./img.svg"
import { buttonInit, btnPlayer } from "../elements/button"
import { numToMin } from "../../services/playerRanges"
import { maxRange, numRangeToDuration, volumeValToWidth } from "../../services/playerRanges"
import { svgInit } from "../elements/svg"


export function player(track: ITrack & IPodcast) {
    const range = el('input.player__range', {
        type: 'range',
        min: 0,
        max: maxRange(track.duration),
        step: 1,
    }) as HTMLInputElement
    const outputRange = el('output.player__output', `${numRangeToDuration(Number(range.value))}`)

    range.addEventListener("input", (event) /*rangeEv(outputRange, event)*/ => {
        outputRange.textContent = numRangeToDuration(Number((event.target as HTMLInputElement).value))
    })

    const maxVolume: number = 20

    const rangeVolume = el('input.player__range-volume', {
        type: 'range',
        min: 0,
        max: maxVolume,
        step: 1,
        value: 10
    }) as HTMLInputElement

    const rangeVolumeLevel = el('span.player__level')

    rangeVolume.addEventListener("input", (event) => {
        rangeVolumeLevel.style.width = volumeValToWidth(Number((event.target as HTMLInputElement).value), maxVolume)
    })

    /*rangeEv(outputRange, event)*/
    /*=> {
        outputRange.textContent = (event.target as HTMLInputElement).value
    })
    function rangeEv(rangeOut: HTMLElement, e: InputEvent):any {
        rangeOut.textContent = (e.target as HTMLInputElement).value
    }
    */

    const player = el('.player', [
        el('.player__wrapper', [
            el('img.player__pic', { src: pic, height: 60, width: 60 }),
            el('.player__inner', [
                el('span.player__title', [
                    el('span.player__name', `${track.title}`),
                    el('span.player__favourite', buttonInit('favourite-noCell', track.favourite))
                ]),
                el('span.player__artist', (track.artist) ? `${track.artist}` : `${track.host}`)
            ])
        ]),
        el('.player__duration-wrapper', [
            el('.player__buttons', [
                btnPlayer('shuffle'),
                btnPlayer('back'),
                btnPlayer('playSong'),
                btnPlayer('next'),
                btnPlayer('repeat')
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