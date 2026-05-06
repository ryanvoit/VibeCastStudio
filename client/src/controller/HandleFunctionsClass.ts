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
        // mainTableWrapper.innerHTML = ''

        setChildren(mainTableWrapper, [
            mainTable(filteredTracks, token, favTrax)
        ])
    }

    buttonStartPlay(tracks: Array<ITrack & IPodcast>, id: number, token: string) {
        if (id <= 0) {
            id = 1
        }
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        const playerSuper = document.querySelector('.player__super-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on')

        setTimeout(() => {
            playerSuper.innerHTML = ''
            setChildren(playerSuper, [player(tracks, id, token)])
            setTimeout(() => {
                mainPageWrapper.classList.add('main-page-wrapper--player-on')
            }, 10)
        }, 300)

    }

    buttonFavourite(track: ITrack & IPodcast, buttonFav: HTMLElement, id: number, token: string) {
        let tracks = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
        tracks.then((trax) => {
            const tracking = trax.find(track => track.id === id)

            if (tracking) {
                /**
                 * ! fetch /favourite -- DELETE
                 */
                request.removeFavourite({
                    trackId: id
                }, token)
            } else {
                /**
                 * ! fetch /favourite -- POST
                 */
                request.AddFavourite({
                    trackId: id
                }, token)
            }
        })

        setTimeout(() => {
            let tracks2 = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
            tracks2.then((trax) => {
                const track2 = trax.find(track => track.id === id);
                console.log(buttonFav.firstElementChild);
                // const btnF = document.querySelectorAll('.svg-heart')
                (buttonFav.firstElementChild as HTMLElement).innerHTML = ''
                if(track2) {
                    setChildren((buttonFav.firstElementChild as HTMLElement), [
                        svgInit('heart-favourite')
                    ])
                } else {
                    setChildren((buttonFav.firstElementChild as HTMLElement), [
                        svgInit('heart')
                    ])
                }
                console.log(trax);
            })
        }, 100)


        // request.AddFavourite({
        // trackId: id
        // }, token)
        // }
        /**
          * ! const favourites = fetch /favourite -- GET | []
          */
        // setTimeout(() => {
        // let tracks = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
        // console.log(tracks);
        // let trax: Promise<ITrack[]> = tracksProcess(tracks, /*podcasts*/)
        // console.log(trax);

        // trax.then((tracking) => {
        // tracking[id].favourite = (tracking.includes(track)) ? true : false;

        // (buttonFav.firstElementChild as HTMLElement).innerHTML = '';
        // setChildren((buttonFav.firstElementChild as HTMLElement), [(tracking[id].favourite) ? svgInit('heart-favourite') : svgInit('heart')])
        // })
        // }, 10)
    }

    buttonAside(navigation: 'FavouritePage' | 'MainPage') {
        const mainPageWrapper = document.querySelector('.main-page-wrapper') as HTMLElement
        mainPageWrapper.classList.remove('main-page-wrapper--player-on');

        setTimeout(() => {
            navigate(navigation)
        }, 300)
    }

    btnPlay(btn: HTMLButtonElement,
        // tracks: Array<ITrack & IPodcast>, id: number
    ) {
        setTimeout(() => {
            if (btn.classList.contains('button__playSong--off')) {
                listening(
                    document.querySelector('.player__range') as HTMLInputElement,
                    document.querySelector('.player__output') as HTMLElement,
                    // tracks, id
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