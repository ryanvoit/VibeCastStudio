export async function fetchTracks() {
    const response = await fetch('http://localhost:8000/api/tracks')

    const data = await response.json()
    console.log(data);
}

interface fetchRegister {
    username: string, 
    password: string
}

export async function fetchRegist(newUser: fetchRegister) {
    await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
        // mode: 'cors'
    })
}