import { ITrack } from "../services/types"
import requestClass from "../model/requestClass"
import { setChildren } from "redom"
import { mainTable } from "../view/components/mainTable"
import { aside } from "../view/components/aside"
import { searchInput } from "../view/elements/input"

const request = new requestClass()

export default function buttonAsideClick(navigation: 'FavouritePage' | 'MainPage', token: string, trax: ITrack[]) {
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
                            aside('favourite', token, trax)
                        ])
                        /**
                         * ! ASIDE - SEARCH !!!!!
                         */
                        ,
                        setChildren(searchEl, [
                            searchInput(f, token, f)
                        ])
                } else {
                    setChildren(mainTableWrapper, [
                        mainTable(trax, token, f)
                    ]),
                        setChildren(asideNav, [
                            aside('main', token, trax)
                        ]) 
                        ,
                        setChildren(searchEl, [
                            searchInput(trax, token, f)
                        ])
                }
            }, 30)
        })
    }