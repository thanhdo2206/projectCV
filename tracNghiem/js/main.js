const getDOM = function (selector) {
  return document.querySelector(selector);
};

const getDOMs = function (selector) {
  return document.querySelectorAll(selector);
};


//mảng chứa các đối tượng câu hỏi
let questionList = [];

//lấy dữ liệu từ file json
fetch("../data/tracNghiem.json")
.then(response => {
   return response.json();
})
.then(data => {
    // console.log(data);
    mapData(data);
    renderQuestion();
    
});



const mapData = (data)=>{
    questionList = data.map((question,index)=>{
        let {id,content,answers,type} = question;

        if(question.questionType == 1){
            return new RadioQuestion(id,content,answers,type);
        }else return new FillQuestion(id,content,answers,type);
    })

    // console.log(questionList);
}

const renderQuestion = ()=>{
    let html= "";
    let containerQues = getDOM(".container_question");
    for (let index in questionList){
         html += questionList[index].render(index);
    }

    containerQues.innerHTML = html;

}




const getRadioInput = ()=>{
    let inputs = getDOMs(".answer_radio");
    let radioTrues = [];
    inputs.forEach((input, index)=>{
        if(input.checked == true) {
            let objRadioTrue ={
                id : input.name.split("_").pop(),
                content : input.value,
            }
        radioTrues.push(objRadioTrue);
        }
    })
    // console.log(radioTrues);
    return radioTrues;
}

const checkRadio = ()=>{
    let arrCheck = [];
    let radioTrues = getRadioInput();
    radioTrues.forEach((radioTrue,index)=>{
        questionList.forEach(question=>{
            if(radioTrue.id == question.id){
                let check = question.checkCorrectAnswer(radioTrue.content);
                arrCheck.push(check);
            }
        })
    })

    // console.log(arrCheck);
    return arrCheck;

}

const getFillInput = ()=>{
    let inputs = getDOMs(".answer_fill");
    let fillInputs = [];
    inputs.forEach((input)=>{
      
            let objFill ={
                id : input.name.split("_").pop(),
                content : input.value,
            }
        fillInputs.push(objFill);
        
    })
    // console.log(fillInputs);
    return fillInputs;
}


const checkFill = ()=>{
    let arrCheck = [];
    let fillInputs = getFillInput();
    fillInputs.forEach((fillInput)=>{
        questionList.forEach(question=>{
            if(fillInput.id == question.id){
                let check = question.checkCorrectAnswer(fillInput.content);
                arrCheck.push(check);
            }
        })
    })

    // console.log(arrCheck);
    return arrCheck;

}

const calculatePoint = ()=>{
    total = 0;
    checkRadio().forEach(check=>{
        if(check) total++;
    })

    checkFill().forEach(check=>{
        if(check) total++;
    })

    console.log(total);
}

const handleSubmit = ()=>{
    // console.log(1);
    calculatePoint();
}

let btnSubmit = getDOM(".btn_submit");
btnSubmit.onclick = handleSubmit;
