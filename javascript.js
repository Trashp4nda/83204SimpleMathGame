var playing = false;
var score;
var timeRemaining;
var correctAnswer;
//if we click start/reset
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload(); //reload page
     //if we are not playing 
    } else {
        //change mode to playing
        playing = true;
        //set score to zero
        score = 0;
        document.getElementById("scorevalue").innerHTML = score;
        //show countdown 
        show("timeremaining");
        timeRemaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

        //hide gameover box
        hide("gameover");
        //reduce time by 1s in loops
            //check if there is time left?
                //yes > cont 
                startCountdown();
                //no > gameover
        //button to reset
        document.getElementById("startreset").innerHTML = "Reset Game";

        //generate new question w/ answers 
        generateQA();


    }
}
 
for(i = 1; i < 5; i++){
document.getElementById("box" + i).onclick = function(){
        //if we click on an answer
    //are we playing
    if(playing == true){
        //if the answer is correct?
            //yes 
            if(this.innerHTML == correctAnswer){
                //increase score by 1
                score++;
                document.getElementById("scorevalue").innerHTML = score;
                //show correct box for 1 sec
                show("correct"); 
                hide("wrong");
                setTimeout(function(){
                    hide("correct");
                }, 1000);
                //generate new q&a
                generateQA();
            //no  
            } else {
                 //show try again box for 1 sec 
                hide("correct");
                show("wrong");
                setTimeout(function(){
                    hide("wrong");
                }, 1000);
            }
    }
}
}


//functions
function startCountdown(){
    action = setInterval(function(){
        timeRemaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeRemaining;

        if(timeRemaining == 0){
            stopCountdown();
            show("gameover");
            document.getElementById("gameover").innerHTML = "<p>Game Over!</p><p>Your Score is " + score + "</p>"
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing=false;
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown(){
    clearInterval(action);
}

function hide(id) {
    document.getElementById(id).style.display = "none";
}

function show(id){
    document.getElementById(id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(9*Math.random());
    var y = 1 + Math.round(9*Math.random());
    correctAnswer = x * y;

    document.getElementById("question").innerHTML = x + "x" + y;

    var correctPosition = 1 + Math.round(3*Math.random()); //select random box (1-4) to put correct answer in
    document.getElementById("box" + correctPosition).innerHTML = correctAnswer; //place the correct answer in the box
    //fill otehr boxes with wrong answers
    var answers = [correctAnswer];
    for(i = 1; i < 5; i++){
        if(i !== correctPosition){
            var wrongAnswer;
            do{ 
                wrongAnswer= (1 + Math.round(9*Math.random())) * (1 + Math.round(9*Math.random()));
            }while(answers.indexOf(wrongAnswer) > -1)
               
            
            document.getElementById("box" + i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}