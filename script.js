let start_btn    = document.querySelector(".start_btn button"),
    test_box     = document.querySelector(".test_box"),
    finish_test  = document.querySelector(".quit"),
    result_box   = document.querySelector(".result_box"),
    option_list  = document.querySelector(".option_list"),
    time_line    = document.querySelector("header .time_line"),
    timeText     = document.querySelector(".timer .time_left_txt"),
    timeCount    = document.querySelector(".timer .timer_sec"),
    start_select = document.querySelector(".start_select"),
    res_span     = document.querySelector(".score_text");

start_select.onchange = (e)=>{
    window.localStorage.setItem("val",e.target.value);
}

start_btn.onclick = ()=>{
    test_box.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(1);
    startTimer(120); 
    startTimerLine(0);
}

let que_count = 0,
    que_numb = 1,
    userScore = 0,
    counter,
    counterLine,
    widthValue = 0;

let restart_test = result_box.querySelector(".buttons .restart"),
    quit_test    = result_box.querySelector(".buttons .quit");

restart_test.onclick = ()=>{
    test_box.classList.add("activeQuiz"); 
    result_box.classList.remove("activeResult"); 

    que_count  = 0;
    que_numb   = 1;
    userScore  = 0;
    widthValue = 0;
    
    showQuetions(que_count); 
    queCounter(que_numb); 
    clearInterval(counter);
    clearInterval(counterLine); 
    startTimer(120);
    startTimerLine(widthValue);
    timeText.textContent = "Time Left";
    next_btn.classList.remove("show");
}

quit_test.onclick = ()=>{
    window.location.reload();
}

let next_btn            = document.querySelector("footer .next_btn"),
    bottom_ques_counter = document.querySelector("footer .total_que");

next_btn.onclick = ()=>{
    if(que_count < questions.length - 1){
        que_count++; 
        que_numb++;
        showQuetions(que_count); 
        queCounter(que_numb); 
        
        timeText.textContent = "Time Left"; 
        next_btn.classList.remove("show"); 
    }else{
        clearInterval(counterLine); 
        showResult(); 
    }
}

finish_test.onclick = ()=>{
    showResult()
}

function showQuetions(index){
    const que_text = document.querySelector(".que_text");

    let que_tag    = '<span>'+ questions[index].numb + ". " +  questions[index].question +'</span>',
        option_tag = `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>
    <div class="option"><span>${questions[index].options[3]}</span></div>`;
    que_text.innerHTML = que_tag; 
    option_list.innerHTML = option_tag; 
    
    let option = option_list.querySelectorAll(".option");

    for(i=0; i < option.length; i++){
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
    finish_test.classList.add("show"); 
}
let tickIconTag  = '<div class="icon tick"><i class="fas fa-check"></i></div>',
    crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer){
    let userAns    = answer.textContent,
        correcAns  = questions[que_count].answer,
        allOptions = option_list.children.length; 
    
    if(userAns == correcAns){ 
        userScore += 1;
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", tickIconTag); 
    }else{
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", crossIconTag);

        for(i=0; i < allOptions; i++){
            if(option_list.children[i].textContent == correcAns){
                option_list.children[i].setAttribute("class", "option correct"); 
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); 
            }
        }
    }
    for(i=0; i < allOptions; i++){
        option_list.children[i].classList.add("disabled"); 
    }
    next_btn.classList.add("show");
}

function showResult(){
    test_box.classList.remove("activeQuiz"); 
    result_box.classList.add("activeResult"); 
    let scoreText = result_box.querySelector(".score_text");
    if (userScore >= 3){
        let scoreTag = `<span>Congrats ${window.localStorage.getItem("val")} ! You got ${userScore} out of ${questions.length} </span>`;
        scoreText.innerHTML = scoreTag;  
        res_span.style.color = "green";
    }else{ 
        let scoreTag = `<span>Sorry ${window.localStorage.getItem("val")}! You got only ${userScore} out of ${questions.length}</span>`;
        scoreText.innerHTML = scoreTag;
        res_span.style.color = "red";

    }
}

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time; 
        time--;
        if(time < 9){ 
            let addZero = timeCount.textContent; 
            timeCount.textContent = "0" + addZero; 
        }
        if(time < 0){ 
            clearInterval(counter); 
            showResult();
        }
    }
}

function startTimerLine(time){
    counterLine = setInterval(timer, 189);
    function timer(){
        time += 1;
        time_line.style.width = time + "px"; 
        if(time > 649){ 
            clearInterval(counterLine); 
        }
    }
}

function queCounter(index){
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag; 
}