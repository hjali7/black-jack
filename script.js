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
    console.log(deck)
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

    }
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