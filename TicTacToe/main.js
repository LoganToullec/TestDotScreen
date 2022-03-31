let timeCounterText = document.getElementById("time-counter")
let arrow1 = document.getElementById("arrow1")
let arrow2 = document.getElementById("arrow2")
let timeCounter = 180
let gameActive = false;
let currentPlayer;
let otherPlayer;
let firstGame = true;
let winCounterP1 = document.getElementById("p1-win-counter")
let winCounterP2 = document.getElementById("p2-win-counter")
let counter = 1;
let errorText = document.getElementById("error")
let board = document.getElementsByClassName("cell")

const winPossibilities = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

function resetBoard(board) {
    for(let i = 0; i < board.length; i++){
        let cell = board[i]
        cell.setAttribute("name", "unplayed")
        cell.innerHTML = ""
    }
    counter = 1  
    gameActive = true  
}

function checkWin(board, form, player) {
    winPossibilities.forEach((combinaison) => {      

        let a = combinaison[0];
        let b = combinaison[1];
        let c = combinaison[2];
        if(board[a].innerHTML !== "" && board[b].innerHTML !== "" && board[c].innerHTML !== "" && gameActive){
            if(board[a].innerHTML === board[b].innerHTML && board[b].innerHTML === board[c].innerHTML){
                gameActive = false
                player.winCount++
                resetBoard(board)
            }
        }   

    })
    let find = true;
    for(let i = 0; i < board.length; i++){
        if (board[i].innerHTML === ""){
            find = false
        }
    }
    if(find)(
        resetBoard(board)
    )
}

class Player {

    constructor(nameId, form){
        this.winCount = 0;
        this.nameId = nameId;
        this.form = form;
    }
    
    play(board, cell) {
        if(currentPlayer.nameId !== 1){
            arrow1.style.display = "block";
            arrow2.style.display = "none";
        } else {
            arrow1.style.display = "none";
            arrow2.style.display = "block";
        }
        cell.setAttribute("name", "played")
        if(this.form === "x"){
            cell.innerHTML = "x"
        } else {  
            cell.innerHTML = "o"
        }
        

        checkWin(board, this.form, this);
        
    }
}

function startTimer() {
    if(firstGame){
        setInterval(() => {
            timeCounter -= 1;
            let seconds = timeCounter % 60;
            let minutes = Math.floor(timeCounter / 60)
    
            timeCounterText.innerHTML = minutes + ' : ' + seconds
            if(timeCounter === 0){
                if(currentPlayer.winCount > otherPlayer.winCount){
                    alert(`Player ${currentPlayer.nameId} won the game with ${currentPlayer.winCount} games won`)
                } else if (currentPlayer.winCount < otherPlayer.winCount){
                    alert(`Player ${otherPlayer.nameId} won the game with ${otherPlayer.winCount} games won`)
                } else {
                    alert(`Draw ! ${currentPlayer.winCount} | ${otherPlayer.winCount}`)
                }
                timeCounter = 180
                
            }
        },1000)
        
    }    
}

function startGame(player1, player2){

    if(firstGame && player1 === undefined && player2 === undefined){

        player1 = new Player(1, "x");
        player2 = new Player(2, "o");
        currentPlayer = player1;
        otherPlayer = player2;

        arrow2.style.display = "none";
        startTimer()
        firstGame = false
    }

    gameActive = true;

    for(let i = 0; i < board.length; i++){
        let cell = board[i]
        if(gameActive){
            cell.addEventListener('click', (event) => {
                if(cell.getAttribute("name") === "unplayed"){
                    currentPlayer.play(board, cell)
                    if(counter%2 === 0){
                        currentPlayer = player1;
                        otherPlayer = player2;
                    } else {
                        currentPlayer = player2;
                        otherPlayer = player1;
                    }
    
                    winCounterP1.innerHTML = player1.winCount
                    winCounterP2.innerHTML = player2.winCount
                    counter++
                    return
                    
                }
                
                errorText.innerHTML = "Cellule déjà utilisée"
                
            });

        }
        
    }
}

startGame(undefined, undefined)


