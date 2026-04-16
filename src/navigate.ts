export async function navigate(page: 'MainPage' | 'FavouritePage' | 'AuthPage') {
    document.body.innerHTML = ''

    switch(page) {
        case 'MainPage':
            const MainPage = await import("./view/pages/MainPage");
            MainPage.default()
        case 'FavouritePage':
            const FavouritePage = await import("./view/pages/FavouritePage")
            FavouritePage.default()
        case 'AuthPage':
            const AuthPage = await import("./view/pages/AuthPage")
            AuthPage.default()
    }
}