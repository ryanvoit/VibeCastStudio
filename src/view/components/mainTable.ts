import { el } from 'redom';
import { IPodcast, ITrack } from '../../services/types';
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

export function cells(trax: (ITrack & IPodcast)[], tracks: (ITrack & IPodcast)[]): HTMLElement[] {
    console.log(trax)
    console.log(tracks);
    const rows = []
    for (let i = 0; i < trax.length; i++) {
        const tableRow = el('tr.main-table__row main-table__row--secondary', [
            buttonPlayInit(trax, i),
            buttonInit('favourite', trax, i),
            el('td.main-table__cell', `${numToMin(trax[i].duration)}`),
            buttonInit('settings', trax, i)
        ])
        rows.push(tableRow)
    }
    return rows
}

export function table(tracks: (ITrack & IPodcast)[], tracksAmountPage: number, btns: HTMLButtonElement[]) {
    const active = btns.find(btn => btn.classList.contains('button__pagination--active'))
    let pageNumber = 1

    if (active) {
        console.log(active);
        pageNumber = Number(active.textContent)
    } else {
        btns[0].classList.add('button__pagination--active')
    }

    const trax = tracks.slice((pageNumber - 1) * tracksAmountPage, (pageNumber - 1) * tracksAmountPage + 5)
    return el('table.main-table__table', [
        cellsMain(),
        cells(trax, tracks),
    ])
}

export function mainTable(tracks: (ITrack & IPodcast)[]) {
    const amountTracks = tracks.length
    const tracksAmountPage = 5
    let pages = amountTracks / tracksAmountPage
    if(pages === 0) {
        pages = 1
    } 

    let btns:HTMLButtonElement[] = []
    for (let i = 1; i < pages + 1; i++) {
        btns.push(btnPagination(i, tracks, btns) as HTMLButtonElement)
    }

    return el('.main-table', [
        el('h2.main-table__title', 'Аудифайлы и треки'),
        el('.main-table__super', [
            table(tracks, tracksAmountPage, btns)
        ]),
        el('.main-table__pagination-wrapper', [
            btns
        ])
    ])
}
