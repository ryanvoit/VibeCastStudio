import { numRangeToDuration } from "./playerRanges"
// import HandleFunctionsClass from "../controller/HandleFunctionsClass"
// import { IPodcast, ITrack } from "./types"

// const HandleFunctions = new HandleFunctionsClass()

export function listening(range: HTMLInputElement, outputRange: HTMLElement,
    // tracks: Array<ITrack & IPodcast>, id: number
    ) {
    let interval = setInterval(() => {
        let seconds = Number(range.value)
        seconds++
        range.value = `${seconds}`
        outputRange.textContent = numRangeToDuration(Number(range.value))
        if (Number(range.value) === Number(range.max)) {
            clearInterval(interval)
            /**
             * TODO: improving
             * HandleFunctions.buttonStartPlay(tracks, id)
             */
        }
    }, 1000)

    setTimeout(() => {
        const btns = document.querySelectorAll('.button__play')

        btns.forEach(btn => {
            btn.addEventListener('click', function () {
                clearInterval(interval)
            })
        })

        const btnPlay = document.querySelector('.button__playSong') as HTMLButtonElement

        btnPlay.addEventListener('click', function () {
            clearInterval(interval)
        })
    }, 10)
}