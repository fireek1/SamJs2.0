const sam = new SamJs({
    debug: 1,
    pitch: 100,
    speed: 50,
    mouth: 128,
    throat: 128,
    singmode: true
})
const translitMap = {
    'а': 'a',
    'б': 'b',
    'в': 'v',
    'г': 'g',
    'д': 'd',
    'е': 'ee',
    'ё': 'yo',
    'ж': 'zh',
    'з': 'z',
    'и': 'i',
    'й': 'y',
    'к': 'k',
    'л': 'l',
    'м': 'm',
    'н': 'n',
    'о': 'o',
    'п': 'p',
    'р': 'r',
    'с': 's',
    'т': 't',
    'у': 'u',
    'ф': 'f',
    'х': 'h',
    'ц': 'ts',
    'ч': 'ch',
    'ш': 'sh',
    'щ': 'sch',
    'ы': 'ee',
    'э': 'e',
    'ю': 'yu',
    'я': 'ya',
    '+': 'plus',
    '-': 'minus',
    '1': 'adin',
    '2': 'dwa',
    '3': 'tree',
    '4': 'cheteeree',
    '5': 'pyat',
    '6': 'shest',
    '7': 'sem',
    '8': 'vosem',
    '9': 'devyat',
    '0': 'nol',
    '=': 'ravno'
}
const regex = /[\@\#\$\%\^\&\*\(\=\)\_\+-\=\[\]\{\}\;\'\:\"\\\|\<\>\/\~\`\—\,\.]/g
function transliterate(text) {
    const trText = text.toLowerCase()
    let result = ''
    for (let i = 0; i < trText.length; i++) {
        let letter = trText[i]
        if (letter === 'ъ' || letter === 'ь') {
            continue
        }
        let translitLetter = translitMap[letter]
        result += translitLetter || letter
    }
    return result
}
function matchText(str) {
    const wordArray = str.split(/\s+/)
    return wordArray
}
function removeSpecialCharacters(str) {
    return str.replace(regex, '')
}
async function speak(text) {
    if (text.length === 0) {
        // sam.speak(transliterate('desiat!,9!,8!,7!,6!,5!,4!,3!,2!,1!!')).then(() => document.querySelector('img').style.display = 'block')
        return
    }
    // console.log(removeSpecialCharacters(text[0]))
    sam.speak(removeSpecialCharacters(text[0]) + ',').then(() => {
        text.shift()
        speak(text)
    })
}
document.querySelector('button').onclick = async () => {
    console.log(JSON.stringify(document.querySelector('input').value))
    const resp = await fetch('/', {
        method: "POST",
        body: JSON.stringify({
            "message": document.querySelector('input').value,
        }),
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        }
    }).then(async data => data.json().then(text => {
        console.log(text.text)
        speak(matchText(transliterate(text.text)))
    }))
}