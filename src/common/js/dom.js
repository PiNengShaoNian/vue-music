export function hasClass(el, className) {
    let reg = new RegExp(`(^|\s)${className}(\s|$)`)
    return reg.test(el.className)
}

export function addClass(el, className) {
    if (hasClass(el, className)) return

    let newClass = el.className.split(/\s+/)
    newClass.push(className)
    el.className = newClass.join(' ')
}

export function getData(el, name, val) {
    const prefix = 'data-'
    name = prefix + name

    if (val) el.setAttribute(name, val)
    else return el.getAttribute(name)
}

let styleObject = document.createElement('div').style

let vendor = (() => {
    let transformNames = [
        '',
        'webkit',
        'Moz',
        'O',
        'ms',
    ]


    for (let i = 0; i < transformNames.length; i++) {
        let prefix = transformNames[i]
        if (styleObject[prefix ? `${prefix}Transform` : 'transform'] !== undefined) {
            return prefix
        }
    }

    return false
})()

export function fixPrefix(cssPropertyName) {
    if (vendor === false) return false

    if (vendor === '') return cssPropertyName

    return vendor
        + cssPropertyName.charAt(0).toUpperCase()
        + cssPropertyName.substr(1)
}