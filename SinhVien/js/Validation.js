class Validation {
  //sai trả về false
  //đúng trả về true

  validateEmpty(value) {
    if (value.trim() === "") return false;

    return true;
  }

  validateMSSV(mssv) {
    const re = /^\d+$/;
    return re.test(mssv);
  }

  validateFullName(name) {
    //kiêm tra tất cả là chữ
    const re = /^[A-Za-z ]+$/;
    return re.test(name);
  }

  validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
  }

  validatePhone(phone) {
    //Tất cả đều là số và bắt đầu bằng số 0
    const re = /^0[0-9]+$/;
    return re.test(phone) && phone.length >=10;
  }

  validatePoint(point) {
    //số thập phân
    const re = /^\d*\.?\d*$/;
    return re.test(point)  ;
  }
}
