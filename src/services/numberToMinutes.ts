export function numToMin(num: number):string {
    const integer = Math.floor(num)
    const fraction = (Math.ceil((num - integer) * 100)) / 100

    let sec = Math.ceil(60 * fraction)

    if (sec <= 10) {
        return `${integer}:0${sec}`  
    }
    return `${integer}:${sec}`
}