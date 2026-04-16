export function maxRange(num: number): number {
    const integer = Math.floor(num)
    const fraction = (Math.ceil((num - integer) * 100)) / 100
    let sec = Math.ceil(60 * fraction)

    return integer * 60 + sec
}

export function numRangeToDuration(num: number): string {
    const min = Math.floor(num / 60)
    const sec = Math.floor(num % 60)

    if (sec < 10) {
        return `${min}:0${sec}`
    }
    return `${min}:${sec}`
}

export function numToMin(num: number):string {
    const integer = Math.floor(num)
    const fraction = (Math.ceil((num - integer) * 100)) / 100

    let sec = Math.ceil(60 * fraction)

    if (sec < 10) {
        return `${integer}:0${sec}`  
    }
    return `${integer}:${sec}`
}

export function volumeValToWidth(volume: number, maxVolume: number): string {
    const width = Math.floor((72 * volume)/maxVolume)

    return `${width}px`
}