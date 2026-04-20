import { el } from 'redom';
import { IPodcast, ITrack } from '../../services/types';
import { numToMin } from '../../services/playerRanges';
import { svgInit } from '../elements/svg';
import { buttonInit, buttonPlayInit } from '../elements/button';
// import pic from "./img.svg"

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

export function cells(tracks: (ITrack & IPodcast)[]): HTMLElement[] {
    const rows = []
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];

        const tableRow = el('tr.main-table__row main-table__row--secondary', [
            buttonPlayInit(track),
            buttonInit('favourite', track),
            el('td.main-table__cell', `${numToMin(track.duration)}`),
            buttonInit('settings', track)
        ])
        rows.push(tableRow)
    }
    return rows
}

export function table(tracks: (ITrack & IPodcast)[]) {
    return el('table.main-table__table', [
        cellsMain(),
        cells(tracks)
    ])
}

export function mainTable(tracks: (ITrack & IPodcast)[]) {
    return el('.main-table', [
        el('h2.main-table__title', 'Аудифайлы и треки'),
        table(tracks)
    ])
}
