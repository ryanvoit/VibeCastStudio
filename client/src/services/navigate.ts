import mainPageInit from "../view/pages/MainPage"
import formPageInit from "../view/pages/formPage"
import Navigo from 'navigo'

const router = new Navigo('/')

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
            router.navigate('/')
            router.on('/', () => {
                mainPageInit(username as string, token as string, message)
            })
            // router.resolve()
            // const MainPage = await import("./view/pages/MainPage")
            // MainPage.default()
            break
        case 'AuthPage':
            router.navigate('/auth')
            router.on('/auth', () => {
                formPageInit('auth', message)
            })
            // router.resolve()
            // const AuthPage = await import("./view/pages/AuthPage")
            // AuthPage.default()
            break  
        case 'RegisterPage':
            router.navigate('/register')
            router.on('/register', () => {
                formPageInit('register', message)
            })
            // router.resolve()
            break
    }
    router.resolve()
}