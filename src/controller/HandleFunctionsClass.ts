import { setChildren, el } from "redom";
import { ITrack, IPodcast } from "../services/types";
import { table } from "../view/components/mainTable";
import { player } from "../view/components/player";
import { svgInit } from "../view/elements/svg";
import { navigate } from "../services/navigate";
import { numRangeToDuration } from "../services/playerRanges";

/** 
 * ! Создать класс функций кликов и input
 */

export default class HandleFunctionsClass {
    inputSearch(input: HTMLInputElement, tracks: Array<ITrack & IPodcast>) {
        const search = input.value

        const filteredTracks = tracks.filter(
            track => track.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )

        const mainTable = document.querySelector('.main-table') as HTMLElement
        mainTable.innerHTML = ''

        setChildren(mainTable, [
            el('h2.main-table__title', 'Аудифайлы и треки'),
            table(filteredTracks)
        ])
    }

    buttonStartPlay(track: ITrack & IPodcast) {
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        const playerSuper = document.querySelector('.player__super-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on')

        setTimeout(() => {
            playerSuper.innerHTML = ''
            setChildren(playerSuper, [player(track)])
            setTimeout(() => {
                mainPageWrapper.classList.add('main-page-wrapper--player-on')
            }, 10)

        }, 300)
    }

    buttonFavourite(track: ITrack & IPodcast, buttonFav: HTMLElement) {
        console.log(track.title);
        if (track.favourite) {
            /**
              * ! fetch /favourite -- DELETE
              */

        } else {
            /**
              * ! fetch /favourite -- POST
              */
        }
        /**
          * ! const favourites = fetch /favourite -- GET | []
          */

        const favourites: (ITrack & IPodcast)[] = []

        favourites.includes(track)

        track.favourite = (favourites.includes(track)) ? true : false;

        (buttonFav.firstElementChild as HTMLElement).innerHTML = '';
        setChildren((buttonFav.firstElementChild as HTMLElement), [(track.favourite) ? svgInit('heart-favourite') : svgInit('heart')])
    }

    buttonAside(navigation: 'FavouritePage' | 'MainPage') {
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on');

        setTimeout(() => {
            navigate(navigation)
        }, 300)
    }

    btnPlay(btn: HTMLButtonElement, interval: NodeJS.Timeout, range: HTMLInputElement, outputRange: HTMLElement) {
        btn.classList.toggle('button__playSong--off')

        if (btn.classList.contains('button__playSong--off')) {
            clearInterval(interval)
        } else {
            let interval = setInterval(() => {
                let seconds = Number(range.value)
                seconds++
                range.value = `${seconds}`
                outputRange.textContent = numRangeToDuration(Number(range.value))
                if (Number(range.value) === Number(range.max)) {
                    clearInterval(interval)
                }
            }, 1000)
        }
    }
}