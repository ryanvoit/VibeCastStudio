import { aside } from "../components/aside";
import { header } from "../components/header";
import { setChildren, el } from "redom";
import { mainTable } from "../components/mainTable";
import { player } from "../components/player";
import { IPodcast, ITrack } from "../../services/types";
import { tracksProcess } from "../../services/trackProcess";
import requestClass from "../../model/requestClass.ts";
import { OmitFavouriteTrack } from "../../services/types";
import { modalWindow } from "../components/modalWindow";

const request = new requestClass()

export default function mainPageInit(username: string, token: string, message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
    "авторизация прошла успешно" | "пользователь успешно добавлен" | null) {
    /**
    * ! fetch /favourite - GET
    */
    let tracks = request.fetchTracks(token) as Promise<OmitFavouriteTrack[]>
    let trax: Promise<ITrack[]> = tracksProcess(tracks);
    let tracksFav = request.fetchFavouriteTracks(token) as Promise<OmitFavouriteTrack[]>
    let traxFav: Promise<ITrack[]> = tracksProcess(tracksFav);

    trax.then((tracking) => {
        traxFav.then((trackingFav) => {
            setChildren(window.document.body, [
                header(tracking, username, token, trackingFav),
                el('main', [
                    el('.container', [
                        el('.main-page-wrapper', [
                            aside('main'),
                            el('.main-table__super-wrapper', [
                                mainTable(tracking, token, trackingFav),
                            ]),
                            el('.player__super-wrapper', [
                                player(tracking, 0, token)
                            ])
                        ])
                    ])
                ]),
                modalWindow(message, true)
            ]);

        })
    })

    setTimeout(() => {
        (document.querySelector('.main-page-wrapper') as HTMLElement).classList.add('main-page-wrapper--animated')
    }, 1000)
}
