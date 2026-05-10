import { setChildren, el } from "redom";
import { ITrack, IPodcast } from "../services/types";
import { mainTable } from "../view/components/mainTable";
import { player } from "../view/components/player";
import { svgInit } from "../view/elements/svg";
import { navigate } from "../services/navigate";
import { numRangeToDuration } from "../services/playerRanges";
import { listening } from "../services/listening";
import requestClass from "../model/requestClass.ts";
import { tracksProcess } from "../services/trackProcess";
import { OmitFavouriteTrack } from "../services/types";

const request = new requestClass()

export default class HandleFunctionsClass {
    inputSearch(input: HTMLInputElement, tracks: Array<ITrack & IPodcast>, token: string, favTrax: ITrack[]) {
        const search = input.value

        const filteredTracks = tracks.filter(
            track => track.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )

        const mainTableWrapper = document.querySelector('.main-table__super-wrapper') as HTMLElement

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

    buttonStartPlay(tracks: Array<ITrack & IPodcast>, id: number, token: string) {
        if (id <= 0) {
            id = 1
        }
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        const playerSuper = document.querySelector('.player__super-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on')

        const tracksFav = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
        let traxFav: Promise<ITrack[] /*& IPodcast*/> = tracksProcess(tracksFav, /*podcasts*/);

        traxFav.then((trackingFav) => {
            setTimeout(() => {
                playerSuper.innerHTML = ''
                setChildren(playerSuper, [player(tracks, id, token, trackingFav)])
                setTimeout(() => {
                    mainPageWrapper.classList.add('main-page-wrapper--player-on')
                }, 10)
            }, 300)
        })
    }

    buttonFavourite(track: ITrack & IPodcast, buttonFav: HTMLElement, id: number, token: string, role: 'favourite' | 'favourite-noCell') {
        let tracks = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
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
            let tracks2 = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
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
                    console.log(favBtn);
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

    buttonAside(navigation: 'FavouritePage' | 'MainPage') {
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on');

        setTimeout(() => {
            navigate(navigation, null)
        }, 30)
    }

    btnPlay(btn: HTMLButtonElement) {
        setTimeout(() => {
            if (btn.classList.contains('button__playSong--off')) {
                listening(
                    document.querySelector('.player__range') as HTMLInputElement,
                    document.querySelector('.player__output') as HTMLElement
                )

                btn.classList.remove('button__playSong--off')
            } else {
                btn.classList.add('button__playSong--off')
            }
        }, 100)
    }

    btnShuffle(tracks: Array<ITrack & IPodcast>, token: string) {
        let idArr: number[] = []
        for (let i = 0; i < (tracks).length; i++) {
            idArr.push((tracks)[i].id)
        }
        const max = Math.max(...idArr)
        const randomId = Math.floor(Math.random() * max + 1)

        this.buttonStartPlay(tracks, randomId - 1, token)
    }

    btnRepeat(range: HTMLInputElement, outputRange: HTMLElement) {
        let interval = setInterval(() => {
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