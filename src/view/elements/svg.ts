import { el } from "redom";

export function svgInit(role: 'search' | 'logo' | 'arrow') {
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
    }
}