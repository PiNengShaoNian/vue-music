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