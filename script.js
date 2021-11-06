const head = document.getElementsByClassName('head')[0]
const body = document.getElementsByClassName('body')[0]
const armLeft = document.getElementsByClassName('arm-left')[0]
const armRight = document.getElementsByClassName('arm-right')[0]
const legLeft = document.getElementsByClassName('leg-left')[0]
const legRight = document.getElementsByClassName('leg-right')[0]
const wordGuessDiv = document.getElementsByClassName('word-guess')[0]
const wrongLetters = document.getElementsByClassName('wrong-letters')[0]
const gameOverDiv = document.querySelector('.gameOver')
const gameScreen = document.querySelector('.game-screen')
const gameWon = document.querySelector('.game-won')
const restartButton = document.querySelectorAll('#restart-button')

const words = ['interface', 'coding', 'experience', 'element']
const randomNumber = Math.floor(Math.random()*4)
let currentWord = words[randomNumber]
const hangmanBody = [head,body,armLeft,armRight,legLeft,legRight]
const wrongLettersArray = []

for(let i=0; i < currentWord.length; i++){
    wordGuessDiv.innerHTML += `<span class='guess'></span>`
}

const TotalSpanElements = document.getElementsByClassName('guess')

restartButton[0].addEventListener('click', () => {
    location.reload()
})
restartButton[1].addEventListener('click', () => {
    location.reload()
})

document.addEventListener('keypress', (e) => {

    const guessDivs = document.querySelectorAll('.guess')
    const guessdivLength = guessDivs.length
    let guessdivLengthCounter =[]

    guessDivs.forEach(item => {
        if(!(item.innerHTML === "")){
            guessdivLengthCounter.push(item.innerHTML)
        }
    })

    if(guessdivLength === guessdivLengthCounter.length){
        gameScreen.style.display = 'none'
        gameWon.style.display = 'block'
    }

    if(hangmanBody.length === 1){
        gameScreen.style.display = 'none'
        gameOverDiv.style.display = 'block'
    }

    if(wrongLettersArray.includes(e.key)){
        window.alert('you have already entered the letter')
        return
    }

    let indices = []
    for(let i = 0; i < currentWord.length; i++){
        const currentLetter = currentWord[i]
        if(e.key === currentLetter) {
            indices.push(i)
            for(let i = 0; i < indices.length; i++){
                const presentSpan = document.getElementsByClassName('guess')[indices[i]]
                presentSpan.innerHTML = currentLetter
            }
            indices = []
        }
    }
    if(!currentWord.includes(e.key)){
        hangmanBody[0].style.visibility = "visible"
        hangmanBody.shift()
        wrongLetters.innerHTML += e.key+','
        wrongLettersArray.push(e.key)
    }
})