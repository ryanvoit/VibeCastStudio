import mainPageInit from "../view/pages/MainPage"
import favouritePageInit from "../view/pages/favouritePage"
import formPageInit from "../view/pages/formPage"
import { modalWindow } from '../view/components/modalWindow'
import { setChildren } from "redom"

export async function navigate(
    page: 'MainPage' | 'FavouritePage' | 'AuthPage' | 'RegisterPage', 
    message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
    "авторизация прошла успешно" | "пользователь успешно добавлен" | null,
    username?: string, 
    token?: string
) {
    document.body.innerHTML = ''

    switch(page) {
        case 'MainPage':
            mainPageInit(username as string, token as string, message)
            // const MainPage = await import("./view/pages/MainPage")
            // MainPage.default()
            break
        case 'FavouritePage':
            favouritePageInit(username as string, token as string)
            // const FavouritePage = await import("./view/pages/FavouritePage")
            // FavouritePage.default()
            break
        case 'AuthPage':
            formPageInit('auth', message)
            // const AuthPage = await import("./view/pages/AuthPage")
            // AuthPage.default()
            break  
        case 'RegisterPage':
            formPageInit('register', message)
            break
    }
}