const state = {
    view: {
        squares: document.querySelectorAll('.square'),
        enemy: document.querySelector('.enemy'),
        timeLeft: document.querySelector('#time-left'),
        score: document.querySelector('#score'),
    },
    values: {
        hitPosicion: 0,
        result: 0,
        currentTime: 60,
    },
    actions:{
        timerID: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
}

function playSound(audioName){
    // let audio = new Audio("./assets/audios/hit.m4a"); *Sem paremetro
    let audio = new Audio(`./assets/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerID);
        alert(`Game Over! Your score is ${state.values.result}`);
    }
}

function randomSquare(){
    state.view.squares.forEach((square) => {
        square.classList.remove('enemy');
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add('enemy');
    state.values.hitPosicion = randomSquare.id;
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosicion){
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosicion = null;
                playSound("hit");
            }
        });
    });
}

function main(){
    addListenerHitBox();
}

main();