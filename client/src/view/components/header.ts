import { el } from 'redom';
import { searchInput } from '../elements/input';
import { svgInit } from '../elements/svg';
import user from './user.svg';
import { ITrack, IPodcast } from '../../services/types';

export function header(tracks: ITrack[], username: string, token: string, favTrax: ITrack[]) {
	const header = el('header.header', [
		el('.container', [
			el('.header__wrapper', [
				el(".header__logo", [
					svgInit('logo'),
					el("span.header__title", "VibeCast Studio")
				]),
				searchInput(tracks, token, favTrax),
				el('.header__user', [
					el("img.header__icon", { src: user, height: '42', width: '42' }),
					el("span.header__username", `${username}`),
					svgInit('arrow')
				])
			])
		])
	]);

	setTimeout(() => {
        header.classList.add('header--animated')
    }, 10)

	return header
}