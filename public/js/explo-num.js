
let explosive_num;
let left;
let right;
let min_num = document.querySelector("#min-num");
let max_num = document.querySelector("#max-num")
let start_but = document.querySelector("#start-but");
let guess_but = document.querySelector("#guess-but");
let message = document.querySelector("#message");
let guess_num = document.querySelector("#guess-num");
let guess_num_cur;



function start(){
    left = Number(min_num.value)
    right = Number(max_num.value)
    // console.log(left,right)
    if(isNaN(right) || isNaN(left)){
        message.innerHTML = "You didn't enter the real number in mum-num or max-num."
    }else if(right <= left){
        message.innerHTML = "Min-num bigger than max-num. Cannot start"
    }else{
        explosive_num = Number(left+1 + Math.floor(Math.random()*(right-left-1)));
        message.innerHTML = `Game Start !!! The explosive number is between: ${left} ~ ${right}`;
        // guess_but.removeAttribute("disabled");

        guess_but.disabled = false;
        start_but.disabled = true;

        guess_num.disabled = false
        min_num.disabled = true
        max_num.disabled = true
        
        // min_num.value = "";
        // max_num.value = "";
    }


    // start_but.style.display = "none"
    // start_but.setAttribute = ("disabled", true);
    // // guess_but.setAttribute = ("disabled", false);
    
}

function guess(){
    // console.log(left,right)
    // console.log(explosive_num)

    guess_num_cur = Number(guess_num.value);
    guess_num.value = "";
    if(isNaN(guess_num_cur)){
        message.innerHTML = `You didn't enter the real number in guess number. The explosive number is between: ${left} ~ ${right}.`
    }else if(guess_num_cur == explosive_num){
        message.innerHTML = `BOOM! You lose!`

        min_num.value = "";
        max_num.value = "";

        guess_but.disabled = true;
        start_but.disabled = false;

        min_num.disabled = false
        max_num.disabled = false
        guess_num.disabled = true
    }else if(guess_num_cur>= right || guess_num<= left){
        message.innerHTML = `Guess number is out of range.The explosive number is between: ${left} ~ ${right}.`
    }else if(guess_num_cur < explosive_num){
        left = guess_num_cur;
        message.innerHTML = `The explosive number is between: ${left} ~ ${right}.`;

    }else if(guess_num_cur > explosive_num){
        right = guess_num_cur;
        message.innerHTML = `The explosive number is between: ${left} ~ ${right}.`;
    }
    
}

function initial(){

    message.innerHTML = "Welcome again, game restart"
    min_num.value = "";
    max_num.value = "";
    guess_num.value = "";

    guess_but.disabled = true;
    start_but.disabled = false;

    min_num.disabled = false
    max_num.disabled = false
    guess_num.disabled = true
}





