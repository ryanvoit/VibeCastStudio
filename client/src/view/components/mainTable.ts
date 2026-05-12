import { el } from 'redom';
import { ITrack } from '../../services/types';
import { numToMin } from '../../services/playerRanges';
import { svgInit } from '../elements/svg';
import { buttonInit, buttonPlayInit } from '../elements/button';
// import pic from "./img.svg"
import { btnPagination } from "../elements/button"

export function cellsMain() {
    const cellNames: string[] = ['№', 'Название', 'Альбом', '', '', '', '']
    const mainTableRow = el('tr.main-table__row main-table__row--primary')

    let cells = []

    for (let i = 0; i < cellNames.length; i++) {
        const mainTableCell = el('th.main-table__cell', `${cellNames[i]}`)
        cells.push(mainTableCell)
        mainTableRow.append(mainTableCell)
    }
    cells[3].append(svgInit('calendar'))
    cells[5].append(svgInit('duration'))
    return mainTableRow
}

export function cells(trax: ITrack[], tracks: ITrack[], token: string, favTrax: ITrack[]): HTMLElement[] {
    const rows = []
    for (let i = 0; i < trax.length; i++) {
        const tableRow = el('tr.main-table__row main-table__row--secondary', [
            buttonPlayInit(tracks, trax[i].id, token),
            buttonInit('favourite', tracks, trax[i].id, token, favTrax),
            el('td.main-table__cell', `${numToMin(trax[i].duration)}`),
            buttonInit('settings', tracks, trax[i].id, token)
        ])
        rows.push(tableRow)
    }
    return rows
}

export function table(tracks: ITrack[], tracksAmountPage: number, btns: HTMLButtonElement[], token: string, favTrax: ITrack[]) {
    const active = btns.find(btn => btn.classList.contains('button--pagination-active'))
    let pageNumber = 1

    if (active) {
        pageNumber = Number(active.textContent)
    } else {
        btns[0].classList.add('button--pagination-active')
    }

    const trax = tracks.slice((pageNumber - 1) * tracksAmountPage, (pageNumber - 1) * tracksAmountPage + 5);

    return el('table.main-table__table', [
        cellsMain(),
        cells(trax, tracks, token, favTrax),
    ])
}

export function mainTable(tracks: ITrack[], token: string, favTrax: ITrack[]): HTMLElement {
    const amountTracks = tracks.length
    const tracksAmountPage = 5
    let pages = amountTracks / tracksAmountPage
    if (pages === 0) {
        pages = 1
    }

    let btns: HTMLButtonElement[] = []
    for (let i = 1; i < pages + 1 ; i++) {
        btns.push(btnPagination(i, tracks, btns, token, favTrax, tracksAmountPage) as HTMLButtonElement)
    }

    return el('.main-table__special-wrapper', [
        el('h1.main-table__title', 'Аудифайлы и треки'),
        el('.main-table__super', [
            table(tracks, tracksAmountPage, btns, token, favTrax)
        ]),
        el('.main-table__pagination-wrapper', [
            btns
        ])
    ])
}
