import MainPageInit from "./view/pages/MainPage"
import FavouritePageInit from "./view/pages/FavouritePage"
import authPageInit from "./view/pages/AuthPage"
import registerPageInit from "./view/pages/RegisterPage"

export async function navigate(page: 'MainPage' | 'FavouritePage' | 'AuthPage' | 'RegisterPage') {
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
            authPageInit()
            // const AuthPage = await import("./view/pages/AuthPage")
            // AuthPage.default()
            break  
        case 'RegisterPage':
            registerPageInit()
            break
    }
}