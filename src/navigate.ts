import MainPageInit from "./view/pages/MainPage"
import FavouritePageInit from "./view/pages/FavouritePage"
import AuthPageInit from "./view/pages/AuthPage"

export async function navigate(page: 'MainPage' | 'FavouritePage' | 'AuthPage') {
    document.body.innerHTML = ''

    switch(page) {
        case 'MainPage':
            MainPageInit()
            // const MainPage = await import("./view/pages/MainPage")
            // MainPage.default()
            break
        case 'FavouritePage':
            FavouritePageInit()
            // const FavouritePage = await import("./view/pages/FavouritePage")
            // FavouritePage.default()
            break
        case 'AuthPage':
            AuthPageInit()
            // const AuthPage = await import("./view/pages/AuthPage")
            // AuthPage.default()
            break        
    }
}