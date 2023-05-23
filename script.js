const player = document.querySelectorAll(".btn-box");
const home = document.querySelector("#home");
const board = document.querySelector("#board");
const playButtons = document.querySelectorAll(".player-btn");
const xPlayer=document.querySelector("#x-playerscore");
const oPlayer=document.querySelector("#o-playerscore");
let xScore=document.querySelector("#x-score");
let oScore=document.querySelector("#o-score");
let tiesScore=document.querySelector(".ties-score")
let turnSrc=document.querySelector(".turn-img");

// modal
const modal=document.querySelector(".modal");
const resultText=document.querySelector(".result-text")
const nextRoundImg=document.querySelector(".next-round-img")
const nextRoundText=document.querySelector(".next-player-text")
const restartModal=document.querySelector(".modal-restart")
const tiedModal=document.querySelector(".modal-tied")

let player1 = "x";
let mode = "cpu";
let turn = "x";
let freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
let xArray = [];
let oArray = [];
let xScoreCount=0
let oScoreCount=0
let ties=0
let winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
];

const activateChoice = (icon) => {
  if (icon === "x") {
    player[0].classList.add("active");
    player[1].classList.remove("active");
    player1 = "x";
  } else if (icon==="o"){
    player[1].classList.add("active");
    player[0].classList.remove("active");
    player1 = "o";
    
    
  }
};

const checkWinner=(elem)=>{
    return winningCombinations.find((combination)=>combination.every((button)=>elem.includes(button))
    );
}

const winnerX=()=>{
    modal.style.display="flex"
    nextRoundImg.src="./assets/icon-x.svg"
    nextRoundText.textContent="TAKES THE ROUND"
    nextRoundText.style.color="#31C3BD"
    if (player1==="x"){
        resultText.textContent="YOU WON!"
    }else{
        resultText.textContent="OH NO, YOU LOST…"
    }
    xScoreCount++
    xScore.textContent=xScoreCount
}

const winnerO=()=>{
    modal.style.display="flex"
    nextRoundImg.src="./assets/icon-o.svg"
    nextRoundText.textContent="TAKES THE ROUND"
    nextRoundText.style.color="#F2B137"
    if (player1==="o"){
        resultText.textContent="YOU WON!"
    }else{
        resultText.textContent="OH NO, YOU LOST…"
    }
    oScoreCount++
    oScore.textContent=oScoreCount
}

const winningStyle=(array)=>{
    if (turn==="x"){
        playButtons[array[0]].firstElementChild.src="./assets/icon-x copy.svg";
        playButtons[array[0]].style.background="#31C3BD"
        playButtons[array[1]].firstElementChild.src="./assets/icon-x copy.svg";
        playButtons[array[1]].style.background="##31C3BD"
        playButtons[array[2]].firstElementChild.src="./assets/icon-x copy.svg";
        playButtons[array[2]].style.background="#31C3BD"
    }else if (turn==="o"){
        playButtons[array[0]].firstElementChild.src="./assets/icon-o copy.svg";
        playButtons[array[0]].style.background="#F2B137"
        playButtons[array[1]].firstElementChild.src="./assets/icon-o copy.svg";
        playButtons[array[1]].style.background="#F2B137"
        playButtons[array[2]].firstElementChild.src="./assets/icon-o copy.svg";
        playButtons[array[2]].style.background="#F2B137"
    }
}
const hoverEffect = () => {
  for (let i = 0; i < freeButtons.length; i++) {
    if (turn === "x") {
      playButtons[freeButtons[i]].classList.add("xHover");
      playButtons[freeButtons[i]].classList.remove("oHover");
    } else {
      playButtons[freeButtons[i]].classList.remove("xHover");
      playButtons[freeButtons[i]].classList.add("oHover");
    }
  }
};


const putIcons = () => {
  for (let index = 0; index < playButtons.length; index++) {

    playButtons[index].style.background="#1f3641";
    playButtons[index].innerHTML="";
     
    playButtons[index].onclick = (event) => {
      event.target.classList.remove("xHover");
      event.target.classList.remove("oHover");  
    let spliceFreeButt = freeButtons.indexOf(index);
    freeButtons.splice(spliceFreeButt, 1);

    let randomIndex=Math.floor(Math.random()*freeButtons.length)
    let  choicebuttcont=freeButtons[randomIndex]
    let choicebutt=playButtons[choicebuttcont]
    freeButtons.splice(randomIndex, 1)
 
    let icon = document.createElement("img");
    icon.classList.add("board-play-icon");
    let icon2 = document.createElement("img"); 
    icon2.classList.add("board-play-icon");
    if (mode==="player"){
        if (turn === "x") {
            icon.src = "./assets/icon-x.svg";
            event.target.append(icon);
            xArray.push(index)
            let win=checkWinner(xArray)
            if (win){
                winnerX();
                winningStyle(xArray);
                return;
            }
                if (xArray.length === 5){
                   tiedModal.style.display="flex"
                   ties++
                   tiesScore.textContent=ties
                }
                turn = "o";
                turnSrc.src="./assets/icon-o-small.svg"
              } else {
                icon.src = "./assets/icon-o.svg";
                event.target.append(icon);
                oArray.push(index)
                let win=checkWinner(oArray)
                if (win){
                    winnerO()
                    winningStyle(oArray)
                    return;
                }
                turn = "x";
                turnSrc.src="./assets/icon-x-small.svg"
              }
    }else if (mode==="cpu"){
        if (player1==="x"){
        icon.src = "./assets/icon-x.svg";
        event.target.append(icon);
        xArray.push(index)
        let win=checkWinner(xArray)
        if (win){
        winnerX();
        return;
        }
        if (xArray.length === 5){
        tiedModal.style.display="flex"
        ties++
        tiesScore.textContent=ties    
        }
        turn = "o";
        turnSrc.src="./assets/icon-o-small.svg"
        if (freeButtons.length !==0){
        setTimeout(()=>{   
            icon2.src = "./assets/icon-o.svg";
            choicebutt.append(icon2);
            choicebutt.onclick=false
            oArray.push(choicebuttcont)
            let win=checkWinner(oArray)
            if (win){
                winnerO()
                return;
            }
            turn = "x";
            turnSrc.src="./assets/icon-x-small.svg" 

        }, 1000)}
    }else{     
        icon.src = "./assets/icon-o.svg";
        event.target.append(icon);
        oArray.push(index)
        let win=checkWinner(oArray)
        if (win){
        winnerO();
        return;
        }
        if (xArray.length === 5){
        tiedModal.style.display="flex"
        ties++
        tiesScore.textContent=ties    
        }
        turn = "x";
        turnSrc.src="./assets/icon-x-small.svg"
            if (freeButtons.length !==0){
                setTimeout(()=>{   
                    icon2.src = "./assets/icon-x.svg";
                    choicebutt.append(icon2);
                    choicebutt.onclick=false
                    xArray.push(choicebuttcont)
                    let win=checkWinner(xArray)
                    if (win){
                        winnerX()
                        return;
                    }
                    turn = "o";
                    turnSrc.src="./assets/icon-o-small.svg" 
        
                }, 1000)}
        } 
    hoverEffect();
    event.target.onclick = null;
    }      
    };
    
  }
}
const startGame = (start) => {
  home.style.display = "none";
  board.style.display = "flex";
  mode = start;
  hoverEffect();
  putIcons();
  if (mode==="player"){
    if (player1==="x"){
        xPlayer.textContent="X (P1)"
        oPlayer.textContent="O (P2)"
    }else{
        xPlayer.textContent="X (P2)"
        oPlayer.textContent="O (P1)"
    }
  }else{
    if (player1==="x"){
        xPlayer.textContent="X (YOU)"
        oPlayer.textContent="O (CPU)"
        
    }else{
        turnSrc.src="./assets/icon-o-small.svg"
        xPlayer.textContent="X (CPU)"
        oPlayer.textContent="O (YOU)"
    }
  }
};


const quit=()=>{
    player1 = "x";
    mode = "cpu";
    turn = "x";
    turnSrc.src="./assets/icon-x-small.svg"
    freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xArray = [];
    oArray = [];
    xScoreCount=0
    oScoreCount=0
    board.style.display="none"
    home.style.display="flex"
    restartModal.style.display="none"
    modal.style.display="none"
    xScore.textContent=0
    oScore.textContent=0
    ties=0
    tiesScore.textContent=0
}


const nextRound=()=>{
    if (mode==="player" || mode==="cpu" && player1==="x"){
    player1 = "x";
    turn = "x";
    turnSrc.src="./assets/icon-x-small.svg"
    freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xArray = [];
    oArray = [];
    modal.style.display="none"
    tiedModal.style.display="none"
    startGame (mode)  
    }else{
        player1 = "o";
        turn = "o";
        turnSrc.src="./assets/icon-o-small.svg"
        freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        xArray = [];
        oArray = [];
        modal.style.display="none"
        tiedModal.style.display="none"
        startGame (mode)  
    }
    
    
}

const openRestart=()=>{
    restartModal.style.display="flex"
    

}

const closeRestart=()=>{
    restartModal.style.display="none"
}

const restart2=()=>{
    player1 = "x";
    mode = "cpu";
    turn = "x";
    board.style.display="none";
    home.style.display="flex";
    turnSrc.src="./assets/icon-x-small.svg"
    freeButtons = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    xArray = [];
    oArray = [];
    xScoreCount=0
    oScoreCount=0
    xScore.textContent=0
    oScore.textContent=0
    ties=0
    tiesScore.textContent=0
    restartModal.style.display="none"
    // startGame(mode) 
}