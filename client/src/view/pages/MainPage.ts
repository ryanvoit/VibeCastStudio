import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { ITrack } from "../../services/types";
import requestClass from "../../model/requestClass";
import { modalWindow } from "../components/modalWindow";
import localStorageWork from "../../model/localStorageClass";

const request = new requestClass()
const lS = new localStorageWork()

export default function mainPageInit(username: string, token: string, message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
    "авторизация прошла успешно" | "пользователь успешно добавлен" | null) {
    let tracks = request.fetchTracks(token) as Promise<ITrack[]>
    let tracksFav = request.fetchFavouriteTracks(token) as Promise<ITrack[]>
    let trackId = lS.loadTrackId() || 0
    const localStorage = trackId === 0 ? false : true

    tracks.then((tracking) => {
        tracksFav.then((trackingFav) => {
            setChildren(window.document.body, [
                header(tracking, username, token, trackingFav),
                el('main', [
                    el('.container', [
                        el('.main-page-wrapper', [
                            el('.aside-nav', [
                                aside('main', token, tracking)
                            ]),
                            el('.main-table', [
                                mainTable(tracking, token, trackingFav),
                            ])
                        ]),
                        el('.player', [
                            player(tracking, trackId, token, trackingFav)
                        ])
                    ])
                ]),
                modalWindow(message, true)
            ]);

        })
    })

    if (localStorage) {
        setTimeout(() => {
            (document.querySelector('.main-page-wrapper') as HTMLElement).classList.add('main-page-wrapper--player-on')
        }, 2000)
    }

    setTimeout(() => {
        (document.querySelector('.main-page-wrapper') as HTMLElement).classList.add('main-page-wrapper--animated')
    }, 1000)
}
