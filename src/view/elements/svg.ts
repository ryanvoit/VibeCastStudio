import { el } from "redom";

export function svgInit(role: 'search' | 'logo' | 'arrow' | 'speaker' | 'musicNote' | 'settings' | 'calendar' | 'heart' | 'heart-favourite' | 'duration') {
    switch(role) {
        case 'logo':
            const svgLogo = el('.svg-logo')
            svgLogo.innerHTML = 
            `<svg class="logo-icon" width="33" height="28" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-logo"></use> 
            </svg>`

            return svgLogo
        case 'search':
            const svgSearch = el('.svg-search')
            svgSearch.innerHTML = 
            `<svg class="search-icon" width="24" height="24" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-search"></use> 
            </svg>`

            return svgSearch
        case 'arrow':
            const svgArrow = el('.svg-arrow')
            svgArrow.innerHTML = 
            `<svg class="arrow-icon" width="16" height="16" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-arrow"></use> 
            </svg>`

            return svgArrow
        case 'musicNote':
            const svgMusicNote = el('.svg-music-note')
            svgMusicNote.innerHTML = 
            `<svg class="music-note-icon" width="32" height="32" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-music-note"></use> 
            </svg>`

            return svgMusicNote
        case 'calendar':
            const svgCalendar = el('.svg-calendar')
            svgCalendar.innerHTML = 
            `<svg class="calendar-icon" width="16" height="16" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-calendar"></use> 
            </svg>`

            return svgCalendar
        case 'duration':
            const svgDuration = el('.svg-duration')
            svgDuration.innerHTML = 
            `<svg class="duration-icon" width="16" height="16" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-duration"></use> 
            </svg>`

            return svgDuration
        case 'heart-favourite':
            const svgHeartFavourite = el('.svg-heart--favourite')
            svgHeartFavourite.innerHTML = 
            `<svg class="heart-icon--favourite" width="24" height="24" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-heart-favourite"></use> 
            </svg>`

            return svgHeartFavourite
        case 'heart':
            const svgHeart = el('.svg-heart')
            svgHeart.innerHTML = 
            `<svg class="heart-icon" width="24" height="24" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-heart"></use> 
            </svg>`

            return svgHeart
        case 'settings':
            const svgSettings = el('.svg-settings')
            svgSettings.innerHTML = 
            `<svg class="settings-icon" width="23" height="4" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-settings"></use> 
            </svg>`

            return svgSettings
        case 'speaker':
            const svgSpeaker = el('.svg-speaker')
            svgSpeaker.innerHTML = 
            `<svg class="speaker-icon" width="16" height="16" aria-hidden="true"> 
                <use xlink:href="sprite.svg#icon-speaker"></use> 
            </svg>`

            return svgSpeaker
    }
}