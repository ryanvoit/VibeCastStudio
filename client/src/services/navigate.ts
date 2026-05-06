import mainPageInit from "../view/pages/MainPage"
import favouritePageInit from "../view/pages/favouritePage"
import formPageInit from "../view/pages/formPage"

export async function navigate(
    page: 'MainPage' | 'FavouritePage' | 'AuthPage' | 'RegisterPage', 
    username?: string, 
    token?: string
) {
    document.body.innerHTML = ''

    switch(page) {
        case 'MainPage':
            mainPageInit(username as string, token as string)
            // const MainPage = await import("./view/pages/MainPage")
            // MainPage.default()
            break
        case 'FavouritePage':
            favouritePageInit(username as string, token as string)
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