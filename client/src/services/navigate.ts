import mainPageInit from "../view/pages/MainPage"
import formPageInit from "../view/pages/formPage"
import Navigo from 'navigo'

export async function navigate(
    page: 'MainPage' | 'FavouritePage' | 'AuthPage' | 'RegisterPage',
    message: "произошла ошибка при авторизации - неверные данные" | "пользователь уже существует" |
        "авторизация прошла успешно" | "пользователь успешно добавлен" | null,
    username?: string,
    token?: string
) {
    document.body.innerHTML = ''

    const router = new Navigo('/')
    router.on('/', () => {
        formPageInit('auth', message)
    })

    router.on('/main', () => {
        mainPageInit(username as string, token as string, message)
    })

    router.on('/register', () => {
        formPageInit('register', message)
    })

    switch (page) {
        case 'MainPage':
            router.navigate('/main')
            router.resolve()
            break
        case 'AuthPage':
            router.navigate('/')
            router.resolve()
            break
        case 'RegisterPage':
            router.navigate('/register')
            router.resolve()
            break
    }
}