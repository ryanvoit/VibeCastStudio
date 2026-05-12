import { setChildren } from "redom";
import { ITrack } from "../services/types";
import { mainTable } from "../view/components/mainTable";
import { player } from "../view/components/player";
import { svgInit } from "../view/elements/svg";
import { navigate } from "../services/navigate";
import { numRangeToDuration } from "../services/playerRanges";
import { listening } from "../services/listening";
import requestClass from "../model/requestClass";
import { aside } from "../view/components/aside";
import { searchInput } from "../view/elements/input";

const request = new requestClass()

export default class HandleFunctionsClass {
    inputSearch(input: HTMLInputElement, tracks: Array<ITrack>, token: string, favTrax: ITrack[]) {
        const search = input.value

        const filteredTracks = tracks.filter(
            track => track.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )

        const mainTableWrapper = document.querySelector('.main-table') as HTMLElement

        setChildren(mainTableWrapper, [
            mainTable(filteredTracks, token, favTrax)
        ])
    }

    btnLogOut() {
        (document.querySelector('.main-page-wrapper') as HTMLElement).classList.remove('main-page-wrapper--animated'),
        (document.querySelector('.header') as HTMLElement).classList.remove('header--animated')

        setTimeout(() => {
            navigate('AuthPage', null)
        }, 1000)
    }

    buttonStartPlay(tracks: Array<ITrack>, id: number, token: string) {
        if (id <= 0) {
            id = 1
        }
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        const playerSuper = document.querySelector('.player') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on')

        const tracksFav = request.fetchFavouriteTracks(token) as Promise<ITrack[]>

        tracksFav.then((trackingFav) => {
            setTimeout(() => {
                playerSuper.innerHTML = ''
                setChildren(playerSuper, [player(tracks, id, token, trackingFav)])
                setTimeout(() => {
                    mainPageWrapper.classList.add('main-page-wrapper--player-on')
                }, 10)
            }, 300)
        })
    }

    buttonFavourite(track: ITrack, buttonFav: HTMLElement, id: number, token: string, role: 'favourite' | 'favourite-noCell') {
        const tracks = request.fetchFavouriteTracks(token) as Promise<ITrack[]>
        tracks.then((trax) => {
            const tracking = trax.find(track => track.id === id)

            if (tracking) {
                request.removeFavourite({
                    trackId: id
                }, token)
            } else {
                request.AddFavourite({
                    trackId: id
                }, token)
            }
        })

        setTimeout(() => {
            const tracks2 = request.fetchFavouriteTracks(token) as Promise<ITrack[]>
            tracks2.then((trax) => {

                const tableCells = document.querySelectorAll('.main-table__cell')
                let idCell = null
                for (let i = 0; i < tableCells.length; i++) {
                    const element = tableCells[i];
                    if (element.textContent.trim() === track.id.toString().trim()) {
                        idCell = tableCells[i]
                    }
                }

                const trackF = trax.find(track => track.id === id);

                if (idCell) {
                    const favBtn = ((idCell?.parentNode as HTMLElement).nextElementSibling as HTMLElement).firstElementChild as HTMLElement
                    favBtn.innerHTML = ''
                    if (trackF) {
                        setChildren(favBtn, [
                            svgInit('heart-favourite')
                        ])
                    } else {
                        setChildren(favBtn, [
                            svgInit('heart')
                        ])
                    }
                }

                const playerTitle = document.querySelector('.player__name') as HTMLElement
                const playerTrackTitle = playerTitle.textContent.trim()
                if (playerTrackTitle === track.title.trim()) {
                    ((playerTitle.nextElementSibling as HTMLElement).firstElementChild as HTMLElement).innerHTML = ''
                    if (trackF) {
                        setChildren(((playerTitle.nextElementSibling as HTMLElement).firstElementChild as HTMLElement), [
                            svgInit('heart-favourite')
                        ])
                    } else {
                        setChildren(((playerTitle.nextElementSibling as HTMLElement).firstElementChild as HTMLElement), [
                            svgInit('heart')
                        ])
                    }
                }
            })
        }, 100)
    }

    buttonAside(navigation: 'FavouritePage' | 'MainPage', favTrax: ITrack[], token: string, trax: ITrack[]) {
        const fav = request.fetchFavouriteTracks(token)
        fav.then((f) => {
            setTimeout(() => {
                // navigate(navigation, null)
                const mainTableWrapper = document.querySelector('.main-table') as HTMLElement
                const asideNav = document.querySelector('.aside-nav') as HTMLElement
                const searchEl = document.querySelector('.header__search') as HTMLElement

                if (navigation === 'FavouritePage') {
                    setChildren(mainTableWrapper, [
                        mainTable(f, token, f)
                    ]),
                        setChildren(asideNav, [
                            aside('favourite', f, token, trax)
                        ])
                        /**
                         * ! ASIDE - SEARCH !!!!!
                         */
                        // ,
                        // setChildren(searchEl, [
                            // searchInput(f, token, f)
                        // ])
                } else {
                    setChildren(mainTableWrapper, [
                        mainTable(trax, token, f)
                    ]),
                        setChildren(asideNav, [
                            aside('main', f, token, trax)
                        ]) 
                        // ,
                        // setChildren(searchEl, [
                            // searchInput(trax, token, f)
                        // ])
                }
            }, 30)
        })
    }

    btnPlay(btn: HTMLButtonElement) {
        setTimeout(() => {
            if (btn.classList.contains('button--playSong--off')) {
                listening(
                    document.querySelector('.player__range') as HTMLInputElement,
                    document.querySelector('.player__output') as HTMLElement
                )

                btn.classList.remove('button--playSong--off')
            } else {
                btn.classList.add('button--playSong--off')
            }
        }, 100)
    }

    btnShuffle(tracks: Array<ITrack>, token: string) {
        const idArr: number[] = []
        for (let i = 0; i < (tracks).length; i++) {
            idArr.push((tracks)[i].id)
        }
        const max = Math.max(...idArr)
        const randomId = Math.floor(Math.random() * max + 1)

        this.buttonStartPlay(tracks, randomId - 1, token)
    }

    btnRepeat(range: HTMLInputElement, outputRange: HTMLElement) {
        const interval = setInterval(() => {
            let seconds = Number(range.value)
            seconds++
            range.value = `${seconds}`
            outputRange.textContent = numRangeToDuration(Number(range.value))
            if (Number(range.value) === Number(range.max)) {
                range.value = '0'
            }
        }, 100)
    }
}