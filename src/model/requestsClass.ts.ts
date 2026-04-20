/**
 * ! Сделать класс!!!!
 */

export async function fetchTracks() {
    const response = await fetch('http://localhost:8000/api/tracks') //http://localhost:8000/api/tracks
    // /api/tracks
    // http://127.0.0.1:5500/api/tracks

    const data = await response.json()
    console.log(data);
}

export async function fetchFavouriteTracks() {
    const response = await fetch('http://localhost:8000/api/favourites') // http://localhost:8000/api/favourites
    //  /api/favourites
    // http://127.0.0.1:5500/api/favourites

    const data = await response.json()
    console.log(data);
}

interface fetchRegister {
    username: string,
    password: string
}

export async function fetchRegist(newUser: fetchRegister) {
    await fetch('http://localhost:8000/api/register', { //http://localhost:8000/api/register
        // /api/register
        // http://127.0.0.1:5500/api/register
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
        // mode: 'cors'
    })
}

export async function registerUser(
    username: string,
    password: string
) {
    return fetch('http://localhost:8000/api/register', { //http://localhost:8000/api/register
        //  /api/register
        // http://127.0.0.1:5500/api/register
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }) .then((response) => response.json())
}

export async function loginUser(
    username: string,
    password: string
) {
    return fetch('http://localhost:8000/api/login', { //http://localhost:8000/api/login
        // /api/login
        // http://127.0.0.1:5500/api/login
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    }) 
}