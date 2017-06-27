let answer = document.getElementById('answer');
let attempt = document.getElementById('attempt');

function guess() {
    let input = document.getElementById('user-guess');
    //add functionality to guess function here
    if(answer.value == "") {
        setHiddenFields(); 
    }

    if(!validateInput(input.value)) {
        return false; 
    }

    attempt.value = attempt.value * 1.0 + 1; 
    if(getResults(input.value)) {
        setMessage("You Win! :)"); 
        showAnswer(true); 
        showReplay(); 
    }
    else if(attempt.value >= 10) {
        setMessage("You Lose! :("); 
        showAnswer(false); 
        showReplay(); 
    }
    else {
        setMessage("Incorrect, try again."); 
    }
}

function showAnswer(success) {
    var element = document.getElementById('code'); 
    element.innerHTML = answer.value; 
    element.className = success && " success" || " failure"; 
}

function showReplay() {
    document.getElementById('guessing-div').style.display = 'none'; 
    document.getElementById('replay-div').style.display = 'block'; 
}

//implement new functions here
function setHiddenFields() {
    var value = Math.floor(Math.random() * 9999);
    var digits = Math.log(value) / Math.log(10); 
    var text = "0".repeat(4 - digits) + (value.toString()); 
    answer.value = text; 
    attempt.value = 0;
}

function setMessage(msg) {
    document.getElementById('message').innerHTML = msg; 
}

function validateInput(input) {
    return input.length == 4 ||
        (setMessage("Guesses must be exactly 4 characters long.") || false); 
}


function getResults(input) {
    var resultsPrefix = '<div class="row"><span class="col-md-6">' + input + '</span><div class="col-md-6">'; 
    var resultsSuffix ="</div></div>"
    var types = {
        correct: '<span class="glyphicon glyphicon-ok"></span>', 
        diffPos: '<span class="glyphicon glyphicon-transfer"></span>', 
        wrong: '<span class="glyphicon glyphicon-remove"></span>'
    }
    var count = 0; 
    var content = ''; 
    for(var i in input) {
        var text = (answer.value[i] == input[i] && types.correct)
            || ((answer.value.indexOf(input[i]) !== -1) && types.diffPos)
            || types.wrong; 
        count += answer.value[i] == input[i] && 1 || 0; 
        content += text; 
    }
    document.getElementById('results').innerHTML = resultsPrefix + content + resultsSuffix; 
    return answer.value.length == count; 
}
