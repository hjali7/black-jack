let dealerSum = 0 ;

let yourSum =  0;

let dealerAceCount =  0 ;

let yourAceCount =  0 ;

let hidden;

let deck;

let canHit = true;

window.onload = ()=>{
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck (){

    let value = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"];

    let types = ["C","D","H","S"];

    deck = [];

    for(let i = 0; i< types.length; i++){
        for(let j = 0 ; j<value.length; j++){
            deck.push(value[j] + "-" + types[i])
            
        }
    }
    // console.log(deck)
}

function shuffleDeck(){
    // let deck = [];
    for(let i = 0 ; i < deck.length; i++){
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    // console.log(deck)
}

function startGame (){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);

    while(dealerSum < 17){
        // img
        let cardImg = document.createElement('img')
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png" ;
        dealerAceCount += checkAce(card);
        dealerSum += getValue(card);
        document.querySelector('#dealer-cards').append(cardImg);

    };

    for(let i = 0; i < 2; i++){
        let cardImg = document.createElement('img')
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png" ;
        yourAceCount += checkAce(card);
        yourSum += getValue(card);
        document.querySelector('#your-cards').append(cardImg);
    }
    // console.log(yourSum)
    document.querySelector('#hit').addEventListener('click',hit);
    document.querySelector('#stay').addEventListener('click',stay);
}

function hit () {
    if(!canHit){
        return;
    }else{
        let cardImg = document.createElement('img')
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png" ;
        yourAceCount += checkAce(card);
        yourSum += getValue(card);
        document.querySelector('#your-cards').append(cardImg);
    }

    if(reduceAce(yourSum , yourAceCount) > 21){
        canHit = false ;
    }
}

function stay () {
    dealerSum = reduceAce(dealerSum , dealerAceCount);
    yourSum = reduceAce(yourSum , yourAceCount);

    canHit = false;
    document.querySelector('#hidden').src = "/cards/" + hidden + ".png";

    let message = "" ;
    if(yourSum > 21){
        message = "You Lose!"
    }else if(dealerSum > 21){
        message = "You Win!"
    }else if (dealerSum == yourSum){
        message = "Tie!"
    }else if(yourSum > dealerSum){
        message = "You Win!"
    }else if(dealerSum > yourSum){
        message = "You Lose!"
    }
    document.querySelector('#results').innerText = message;
    document.querySelector('#dealer-sum').innerText = dealerSum;
    document.querySelector('#your-sum').innerText = yourSum ;
}

function getValue (card){
    let data = card.split("-");
    let value = data[0];

    if(isNaN(value)){
        if( value == "A"){
            return 11
        }else{
            return 10
        }
    }else{
        return parseInt(value)
    }
}

function checkAce(card){
    if( card[0] == "A"){
        return 1;
    }else{
        return 0;
    }
}

function reduceAce (playerSum , playerAceCount){
    while(playerSum > 21 && playerAceCount > 0){
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum ;
    
}