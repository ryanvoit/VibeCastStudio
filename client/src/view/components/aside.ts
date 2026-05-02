import { el } from 'redom';
import { asideBtn } from '../elements/button';

export function aside(page: 'favourite' | 'main') {
    let aside
    
    switch (page) {
        case 'main':
            aside = el('aside.sidebar', [
                asideBtn(false, 'Избранное'),
                asideBtn(true, 'Аудиокомпозиции')
            ])
            break
        case 'favourite':
            aside = el('aside.sidebar', [
                asideBtn(true, 'Избранное'),
                asideBtn(false, 'Аудиокомпозиции')
            ])
            break
    }

    return aside
}

