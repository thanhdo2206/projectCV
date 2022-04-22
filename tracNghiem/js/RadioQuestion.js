class RadioQuestion extends Question {
  constructor(id, content, answers, type) {
    super(id, content, answers, type);
  }

  render(index) {

    let answersHTML  ="";
    for(let answer of this.answers) {
        answersHTML += `<input type="radio" class="answer_radio"  name="answer_${this.id}" value= "${answer.content}">
                        <label for="html">${answer.content}</label><br>`;
        
    }

    return ` 
    <div class="question_item">
        <p class="question_content">Câu ${+index +1}: ${this.content}</p>
        ${answersHTML}
    </div>`;
  }

  checkCorrectAnswer(answerUser) {
      let answerCorrect = this.answers.find(answer => answer.exact === true);
      if(answerCorrect.content == answerUser) return true;
      else return false;
  }
}



