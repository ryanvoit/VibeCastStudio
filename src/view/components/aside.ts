import { el } from 'redom';
import { buttonInit } from '../elements/button';

export const aside = el('aside.sidebar', [
    buttonInit('sidebar', false, 'Избранное'),
    buttonInit('sidebar', true, 'Аудиокомпозиции')
])