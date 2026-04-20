import { numRangeToDuration } from "./playerRanges"
import HandleFunctionsClass from "../controller/HandleFunctionsClass"

export function listening(range: HTMLInputElement, outputRange: HTMLElement) {
    let interval = setInterval(() => {
        let seconds = Number(range.value)
        seconds++
        range.value = `${seconds}`
        outputRange.textContent = numRangeToDuration(Number(range.value))
        if (Number(range.value) === Number(range.max)) {
            clearInterval(interval)
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
        const handleFunctions = new HandleFunctionsClass()

        btnPlay.addEventListener('click', function () {
            handleFunctions.btnPlay(btnPlay, interval, range, outputRange)
        })
    }, 10)

    return interval
}