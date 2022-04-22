class User {
  constructor(nameUser) {
    this.numberMessReceive = 0;
    this.nameUser = nameUser;
    this.messSend = "";
    this.messReceive = "";
    this.messWriting = "";
  }

  writeMess(mes) {
    this.messWriting = mes;
  }

  sendMess(objDifferent) {
      this.messSend = this.messWriting;

      //gọi phương thức nhận tin nhắn của đối tượng muốn gửi
      //với tham số là tin nhắn mình muốn gửi
      objDifferent.receiveMess(this.messSend);
      
  }

  receiveMess(messReceive) {   
      this.messReceive = messReceive;
      this.numberMessReceive++;
  }

  
}

