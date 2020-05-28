// variables
const restart = document.querySelector('.start');
const newGame = document.querySelector('.new');
let cells = document.querySelectorAll('.cell');
let display = document.querySelector('.display');
let X = document.querySelector('.X');
let O = document.querySelector('.O');

let currPlayer , active ;
let arr = [] , scX , scO;

// intialize
init();
// restart button
restart.addEventListener('click' , start);
newGame.addEventListener('click' , init);
// click on particular cell event
cells.forEach((ele) => {
    addEventListener('click' , clickCell);
});

// functions
function start(){
    currPlayer = 'X';
    active = true;
    display.innerHTML = `it's ${currPlayer}'s turn`
    for(let i = 0 ; i < 9 ; ++i){
        arr[i] = '';
    }
    cells.forEach((ele) => {
        ele.innerHTML = ''
    });
    
    cells.forEach((ele) => {
        ele.style.color = 'black'
    });
}

function init(){
    currPlayer = 'X';
    active = true;
    scO = 0 , scX = 0;
    display.innerHTML = `it's ${currPlayer}'s turn`
    for(let i = 0 ; i < 9 ; ++i){
        arr[i] = '';
    }
    cells.forEach((ele) => {
        ele.innerHTML = ''
    });
    
    cells.forEach((ele) => {
        ele.style.color = 'black'
    });
    X.innerHTML = scX;
    O.innerHTML = scO;
}

function clickCell(event){
    let cellNum = parseInt(event.target.id);

    if(!active){
        display.innerHTML = `please restart the game to play more.`
        return ;
    }

    if(arr[cellNum] !== ''){
        // display.innerHTML = `it's already taken. please choose another cell !!!`
        return ;
    }
    
    arr[cellNum] = currPlayer;
    event.target.innerHTML = currPlayer;
    // console.log(arr);
    verifyResult()
}

function verifyResult(){
    let winArray = [[0,1,2], [0,3,6], [0,4,8], [1,4,7], [2,5,8], [2,4,6], [3,4,5], [6,7,8]];
    let winflag = false;
    let col1 , col2 , col3 , i;
    for(i = 0; i < winArray.length ; ++i) {
        col1 = arr[winArray[i][0]];
        col2 = arr[winArray[i][1]];
        col3 = arr[winArray[i][2]];
        if(col1 !== '' && col2 !== '' && col3 !== ''){
            if(col1 === col2 && col1 === col3){
                winflag = true;
                break;
            }
        }
    }

    if(winflag) {
        if(currPlayer === 'X')
            scX++;
        else
            scO++;
        display.innerHTML = `congratulation! player ${currPlayer} won this game.`
        X.innerHTML = scX;
        O.innerHTML = scO;
        cells[winArray[i][0]].style.color = 'red';
        cells[winArray[i][1]].style.color = 'red';
        cells[winArray[i][2]].style.color = 'red';
        active = false;
        return ;
    }

    let draw = true;
    for(let i = 0 ; i < arr.length ; ++i) {
        if(arr[i] === '')
            draw = false;
    }
    if(draw){
        display.innerHTML = 'So close! play another round to decide the winner.'
        active = false;
        return ;
    }
    currPlayer = currPlayer === 'X' ? '0' : 'X';
    display.innerHTML = `it's ${currPlayer}'s turn `;
}
