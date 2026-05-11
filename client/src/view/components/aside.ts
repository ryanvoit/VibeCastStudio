import { el } from 'redom';
import { asideBtn } from '../elements/button';
import { ITrack } from '../../services/types';

export function aside(page: 'favourite' | 'main', favTrax: ITrack[], token: string, trax: ITrack[]) {
    let aside
    
    switch (page) {
        case 'main':
            aside = el('aside.sidebar', [
                asideBtn(false, 'Избранное', favTrax, token, trax),
                asideBtn(true, 'Аудиокомпозиции', favTrax, token, trax)
            ])
            break
        case 'favourite':
            aside = el('aside.sidebar', [
                asideBtn(true, 'Избранное', favTrax, token, trax),
                asideBtn(false, 'Аудиокомпозиции', favTrax, token, trax)
            ])
            break
    }

    return aside
}

