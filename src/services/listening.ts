import { numRangeToDuration } from "./playerRanges"

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

        btnPlay.addEventListener('click', function () {
            clearInterval(interval)
        })

        const btnRepeat = document.querySelector('.button__repeat') as HTMLButtonElement

        btnRepeat.addEventListener('click', function () {
            clearInterval(interval)

        })
    }, 10)
}