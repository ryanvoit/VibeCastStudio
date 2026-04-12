import { el } from 'redom';
import { buttonInit } from '../elements/button';

export const aside = el('aside.sidebar', [
    buttonInit('sidebar', 'Избранное', false),
    buttonInit('sidebar', 'Аудиокомпозиции', true)
])