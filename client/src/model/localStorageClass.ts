import { fetchUser } from "../services/types"

export default class localStorageWork {
    saveLogin(user: fetchUser) {
        localStorage.setItem('user', JSON.stringify(user))
    }

    loadUser() {
        const user: fetchUser = JSON.parse(localStorage.getItem('user') as string)
        return user
    }

    saveTrackId(trackId: number) {
        localStorage.setItem('trackId', JSON.stringify(trackId))
    }

    loadTrackId() {
        const trackId: number = JSON.parse(localStorage.getItem('trackId') as string)
        return trackId
    }

    removeUser() {
        localStorage.removeItem('user')
        localStorage.removeItem('trackId')
    }
}