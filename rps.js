let score = JSON.parse(localStorage.getItem("score"));
if (!score) {
    score = {
        Wins: 0,
        Losses: 0,
        Ties: 0
    };
}

const result = document.querySelector(".result");
result.innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;

let cMove;
function computerMove() {
    const num = Math.random();
    if (num >= 0 && num < 1 / 3) {
        return "rock";
    } else if (num >= 1 / 3 && num < 2 / 3) {
        return "paper";
    } else {
        return "scissors";
    }
}

function coreGame(cMove, pMove) {
    if (cMove == pMove) {
        score.Ties += 1;
        resultUpdate();
        const top_res = document.querySelector(".top-res");
        top_res.innerText = "Tie.";
        const mid_res = document.querySelector(".mid-res");
        mid_res.innerHTML = `You: 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${pMove}.png" height='50px' width='50px'> 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${cMove}.png" height='50px' width='50px'> :Computer`;
    } else if ((cMove == "rock" && pMove == "scissors") ||
               (cMove == "paper" && pMove == "rock") ||
               (cMove == "scissors" && pMove == "paper")) {
        score.Losses += 1;
        resultUpdate();
        const top_res = document.querySelector(".top-res");
        top_res.innerText = "You Lose.";
        const mid_res = document.querySelector(".mid-res");
        mid_res.innerHTML = `You: 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${pMove}.png" height='50px' width='50px'> 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${cMove}.png" height='50px' width='50px'> :Computer`;
    } else {
        score.Wins += 1;
        resultUpdate();
        const top_res = document.querySelector(".top-res");
        top_res.innerText = "You Won.";
        const mid_res = document.querySelector(".mid-res");
        mid_res.innerHTML = `You: 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${pMove}.png" height='50px' width='50px'> 
        <img class='space' src="https://missopi.github.io/rock-paper-scissors/images/${cMove}.png" height='50px' width='50px'> :Computer`;
    }
}

let AutoPlay = false;
let ID;

function autoPlay(){
    if(!AutoPlay){
        let btn = document.querySelector(".autoplay");
        btn.innerHTML = "StopPlay";
        AutoPlay = true;
            ID = setInterval(function(){
            cMove = computerMove();
            pMove = computerMove();
            coreGame(cMove,pMove);
        },1000);        
    }
    else{
        clearInterval(ID);
        let btn = document.querySelector(".autoplay");
        btn.innerHTML = "AutoPlay";
        AutoPlay = false;
    }
    
    
}

function remove(){
    const sure = document.querySelector(".sure");
    sure.innerHTML = "";
}

function reset(){
    const sure = document.querySelector(".sure");
    sure.innerHTML=`Are you sure you want to reset the score?  
    <button class="bttn"onclick="remove();resetScore();">Yes</button>
    <button class="bttn" onclick="remove();">  No</button>`;
}
function resetScore() {
    score.Wins = 0;
    score.Losses = 0;
    score.Ties = 0;
    localStorage.setItem('score', JSON.stringify(score));
    const result = document.querySelector(".result");
    result.innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
}

function resultUpdate() {
    const result = document.querySelector(".result");
    result.innerText = `Wins: ${score.Wins}, Losses: ${score.Losses}, Ties: ${score.Ties}`;
    localStorage.setItem("score", JSON.stringify(score));
}
