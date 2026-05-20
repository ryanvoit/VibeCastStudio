import localStorageWork from "../model/localStorageClass"
import { numRangeToDuration } from "./playerRanges"
const lS = new localStorageWork()

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

    function stopListening(btn: HTMLButtonElement) {
        btn.addEventListener('click', function () {
            clearInterval(interval)
        })
    }

    setTimeout(() => {
        const btns = document.querySelectorAll('.button--play')

        btns.forEach(btn => {
            stopListening(btn as HTMLButtonElement)
        })

        const btnPlay = document.querySelector('.button--playSong') as HTMLButtonElement

        stopListening(btnPlay as HTMLButtonElement)

        const btnLogOut = document.querySelector('.header__user') as HTMLButtonElement

        btnLogOut.addEventListener('click', function() {
            clearInterval(interval)
            lS.removeUser()
        })
    }, 10)
}