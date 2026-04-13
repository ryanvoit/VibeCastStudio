import { el, setChildren } from 'redom';
import { IPodcast, ITrack } from '../../types';

const cellNames: string[] = ['№', 'Название', 'Альбом', '', '', 'Длительность', '']

function cellsMain() {
    const mainTableRow = el('tr.main-table__row main-table__row--main')
    for (let i = 0; i < cellNames.length; i++) {
        const mainTableCell = el('th.main-table__cell', `${cellNames[i]}`)
        mainTableRow.append(mainTableCell)
    }
    return mainTableRow
}

/*
function cells() {
    const tableRow = el('tr.main-table__row', [
        el('td.main-table__cell', `${tracks.id}`)

    ])
    for (let i = 0; i < cellNames.length; i++) {
        const tableCell = el('td.main-table__cell', `${cellNames[i]}`)
        tableRow.append(tableCell)
    }

    return tableRow
}
    */

function cells() {
    for (let i = 0; i < tracks.length; i++) {
        const track = tracks[i];

        const tableRow = el('tr.main-table__row', [
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', [
                el('span.td.main-table__cell-title', `${track.title}`),
                el('span.td.main-table__cell-title')
            ]),
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', `${track.id}`),
            el('td.main-table__cell', `${track.id}`)
        ])
        setChildren(table, [tableRow])
    }
}

export const table = el('table.main-table__table', [
        cellsMain(),
        cells()
    ])

export const mainList = el('.main-table', [
    el('h2.main-table__title', 'Аудифайлы и треки'),

    table
])

const tracks: Array<IPodcast | ITrack>= [
    {
        id: 1,
        title: "Eternal Sunset",
        artist: "Skyline Sounds",
        duration: 9.36,
        size_mb: 8.57,
        encoded_audio:
            "QXVkaW8gZGF0YSBmb3IgRXRlcm5hbCBTdW5zZXQgYnkgU2t5bGluZSBTb3VuZHM=",
        favourite: true
    },
    {
        id: 2,
        title: "City Nights",
        artist: "Urban Beats",
        duration: 4.24,
        size_mb: 3.88,
        encoded_audio: "QXVkaW8gZGF0YSBmb3IgQ2l0eSBOaWdodHMgYnkgVXJiYW4gQmVhdHM=",
        favourite: false
    },
    {
        id: 3,
        title: "Ocean Breeze",
        artist: "Deep Wave",
        duration: 3.93,
        size_mb: 3.6,
        encoded_audio: "QXVkaW8gZGF0YSBmb3IgT2NlYW4gQnJlZXplIGJ5IERlZXAgV2F2ZQ==",
        favourite: false
    },
    {
        id: 4,
        title: "Morning Dew",
        artist: "Fresh Air",
        duration: 8.47,
        size_mb: 7.75,
        encoded_audio: "QXVkaW8gZGF0YSBmb3IgTW9ybmluZyBEZXcgYnkgRnJlc2ggQWly",
        favourite: true
    },
    {
        id: 1,
        title: "Tech Talk Weekly",
        host: "John Doe",
        duration: 40.15,
        size_mb: 37.5,
        category: "Technology",
        description:
            "In this episode, we dive deep into the latest trends in AI, the impact of machine learning, and how it’s changing industries worldwide.",
        encoded_audio:
            "QXVkaW8gZGF0YSBmb3IgVGVjaCBUaWxrIFdlZWtseSBieSBKb2huIERvZQ==",
        favourite: true
    },
    {
        id: 2,
        title: "History Unfolded",
        host: "Jane Smith",
        duration: 58.22,
        size_mb: 53.7,
        category: "History",
        description:
            "A captivating journey through the ancient civilizations of Egypt, Greece, and Rome, uncovering lost secrets and forgotten tales.",
        encoded_audio: "QXVkaW8gZGF0YSBmb3IgSGlzdG9yeSBVbmZvbGRlZA==",
        favourite: false
    },
    {
        id: 3,
        title: "Mindful Moments",
        host: "Emily White",
        duration: 30.5,
        size_mb: 28.3,
        category: "Wellness",
        description:
            "This episode focuses on meditation techniques for reducing stress and staying calm in challenging situations.",
        encoded_audio: "QXVkaW8gZGF0YSBmb3IgTWluZGZ1bCBNb21lbnRzIGluIFdlbGxuZXNz",
        favourite: true
    },
]