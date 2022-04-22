let userA = new User("A");
let userB = new User("B");

const getDOM = function (selector) {
  return document.querySelector(selector);
};

const getDOMs = function (selector) {
  return document.querySelectorAll(selector);
};

let btnA = getDOM(".btn_sendA");
let btnB = getDOM(".btn_sendB");
let inputA = getDOM(".text_messA");
let inputB = getDOM(".text_messB");
let contentMessA = getDOM(".content_messA");
let contentMessB = getDOM(".content_messB");
let btnBoldA = getDOM(".boldA");
let btnItalicA = getDOM(".italicizedA");
let btnBoldB = getDOM(".boldB");
let btnItalicB = getDOM(".italicizedB");
let btnResetA = getDOM(".btn_resetA");
let btnResetB = getDOM(".btn_resetB");


//in đậm

function boldText(btnBold,domTextMess) {

  btnBold.classList.toggle("active");
  if (btnBold.classList.contains("active"))  {
    domTextMess.style.fontWeight = "bold"; 
  }  
  else{
    domTextMess.style.fontWeight = "unset";
  } 
}

btnBoldA.addEventListener("click", (e) => {
  boldText(e.target,inputA);
});

btnBoldB.addEventListener("click", (e) => {
  boldText(e.target,inputB);
});

//in nghiêng

function italicText(btnItalic,domTextMess) {

  btnItalic.classList.toggle("active");
  if (btnItalic.classList.contains("active"))  {
    domTextMess.style.fontStyle = "italic"; 
  }  
  else{
    domTextMess.style.fontStyle = "unset";
  } 
}

btnItalicA.addEventListener("click", (e) => {
  console.log(e.target);
  italicText(e.target,inputA);
});

btnItalicB.addEventListener("click", (e) => {
  italicText(e.target,inputB);
});

//reset 
const resetText = function (domInput) {
  domInput.value = '';
}

btnResetA.addEventListener("click", ()=>{ 
  resetText(inputA);
})

btnResetB.addEventListener("click", ()=>{ 
  resetText(inputB);
})

//hiển thị tin nhắn nhận
//domContentMess : là chỗ hiển thị tin nhắn
// domInput: là thẻ input của người gửi
const renderMessReceive = function (userReceive, domContentMess,domInput) {
 
  let messReceiveTagSpan = document.createElement("span");
  let messReceiveTagP = document.createElement("p");

  messReceiveTagSpan.innerText = userReceive.messReceive;

  //gán css style chữ của input cho tin nhắn hiển thị
  messReceiveTagSpan.style.cssText = domInput.style.cssText;
  messReceiveTagSpan.classList.add("mess_receive");

  messReceiveTagP.appendChild(messReceiveTagSpan);
  domContentMess.appendChild(messReceiveTagP);
};

//hiển thị tin nhắn gửi
const renderMessSend = function (userSend, domContentMess,domInput) {
  let messSendTagSpan = document.createElement("span");
  let messSendTagP = document.createElement("p");

  messSendTagP.classList.add("mess_send-container");

  messSendTagSpan.innerText = userSend.messSend;
  messSendTagSpan.style.cssText = domInput.style.cssText;
  messSendTagSpan.classList.add("mess_send");

  messSendTagP.appendChild(messSendTagSpan);
  domContentMess.appendChild(messSendTagP);
};

//hàm gửi chứa ba tham số
// người gửi, người nhận, nội dung tin nhắn muốn gửi
const send = function (userSend, userReceive, messContent) {
  userSend.writeMess(messContent);
  userSend.sendMess(userReceive);
};


const sendA = function () {
  send(userA, userB, inputA.value);
  renderMessReceive(userB, contentMessB,inputA);
  renderMessSend(userA, contentMessA,inputA);
  inputA.value = "";
};

btnA.onclick = sendA;

const sendB = function () {
  send(userB, userA, inputB.value);
  renderMessReceive(userA, contentMessA,inputB);
  renderMessSend(userB, contentMessB,inputB);
  inputB.value = "";
};

btnB.onclick = sendB;


