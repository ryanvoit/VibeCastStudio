import { el, setChildren } from 'redom';
import { inputInit } from '../elements/input';
import { buttonInit } from '../elements/button';
import { svgInit } from '../elements/svg';

export const header = el('header.header', [
	el('.container', [
		el('.header__wrapper', [
			el(".header__logo", [
				svgInit('logo'),
				el("span.header__title", "VibeCast Studio")
			]),
			inputInit('search'),
			buttonInit('user')
		])
	])
]);