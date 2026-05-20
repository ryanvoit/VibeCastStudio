import { el } from 'redom';
import { asideBtn } from '../elements/button';
import { ITrack } from '../../services/types';

export function aside(page: 'favourite' | 'main', token: string, trax: ITrack[]) {
    let aside
    
    switch (page) {
        case 'main':
            aside = el('aside.sidebar', [
                asideBtn(false, 'Избранное', token, trax),
                asideBtn(true, 'Аудиокомпозиции', token, trax)
            ])
            break
        case 'favourite':
            aside = el('aside.sidebar', [
                asideBtn(true, 'Избранное', token, trax),
                asideBtn(false, 'Аудиокомпозиции', token, trax)
            ])
            break
    }
    return aside
}

