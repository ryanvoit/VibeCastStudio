import { el } from 'redom';
import { searchInput } from '../elements/input';
import { svgInit } from '../elements/svg';
import user from './user.svg';
import { ITrack } from '../../services/types';
import HandleFunctionsClass from '../../controller/HandleFunctionsClass';

const click = new HandleFunctionsClass()

export function header(tracks: ITrack[], username: string, token: string, favTrax: ITrack[]) {
	const btnLogOut = el('button.header__user', [
		el("img.header__icon", { src: user, height: '42', width: '42', alt: 'Аватарка'}),
		el("span.header__username", `${username}`),
		svgInit('arrow')
	])

	btnLogOut.addEventListener('click', function (e) {
		click.btnLogOut()
	})

	const header = el('header.header', [
		el('.container', [
			el('.header__wrapper', [
				el(".header__logo", [
					svgInit('logo'),
					el("span.header__title", "VibeCast Studio")
				]),
				el('.header__search-wrapper', [searchInput(tracks, token, favTrax)]),
				btnLogOut
			])
		])
	]);

	setTimeout(() => {
		header.classList.add('header--animated')
	}, 10)

	return header
}