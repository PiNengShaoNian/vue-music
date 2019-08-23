export const throttle =  (func, wait) => {
    let previous = 0;
    return (...args) => {
        let now = Date.now();
        console.log(args)
        if (now - previous > wait) {
            func.apply(this, args);
            previous = now;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

export const shuffle = (list) => {
    let _arr = list.slice()
    for(let i = 0; i < _arr.length; i++) {
        let j = getRandomInt(0, i)
        let t = _arr[i]
        _arr[i] = _arr[j]
        _arr[j] = t
    }
    return _arr
}

export const debounce = (func, delay) => {
    let timer = null

    return (...args) => {
        if(timer) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
        else {
            timer = setTimeout(() => {
                func(...args)
            }, delay)
        }
    }
}