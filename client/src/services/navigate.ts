import mainPageInit from "../view/pages/MainPage"
import favouritePageInit from "../view/pages/favouritePage"
import formPageInit from "../view/pages/formPage"

export async function navigate(page: 'MainPage' | 'FavouritePage' | 'AuthPage' | 'RegisterPage') {
    document.body.innerHTML = ''

    switch(page) {
        case 'MainPage':
            mainPageInit()
            // const MainPage = await import("./view/pages/MainPage")
            // MainPage.default()
            break
        case 'FavouritePage':
            favouritePageInit()
            // const FavouritePage = await import("./view/pages/FavouritePage")
            // FavouritePage.default()
            break
        case 'AuthPage':
            formPageInit('auth')
            // const AuthPage = await import("./view/pages/AuthPage")
            // AuthPage.default()
            break  
        case 'RegisterPage':
            formPageInit('register')
            break
    }
}