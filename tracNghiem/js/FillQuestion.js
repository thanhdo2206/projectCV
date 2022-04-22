class FillQuestion extends Question {
  constructor(id, content, answers, type) {
    super(id, content, answers, type);
  }

  render(index) {
    return ` 
    <div class="question_item">
        <p class="question_content">Câu ${+index +1}: ${this.content}</p>
        <input class="answer_fill" type="text" name="answer_${this.id}">
    </div>`;
  }

  checkCorrectAnswer(answerUser) {
    let answerCorrect = this.answers[0].content;
    if(answerCorrect.toLowerCase() == answerUser.toLowerCase()) return true;
    else return false;
}
}
