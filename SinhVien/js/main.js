const getDOM = (selector) => {
  return document.querySelector(selector);
};

const getDOMs = function (selector) {
  return document.querySelectorAll(selector);
};

let myForm = getDOM(".form_student");
let domMaSV = getDOM("#maSV");
let domNameSV = getDOM("#nameSV");
let domEmail = getDOM("#email");
let domPhoneNumber = getDOM("#phoneNumber");
let domMathPoint = getDOM("#mathPoint");
let domPhyPoint = getDOM("#phyPoint");
let domChemPoint = getDOM("#chemPoint");
let dataTable = getDOM(".data_table");

let btnAdd = getDOM(".btnAdd_modal");
let btnUpdate = getDOM(".btnUpdate_modal");
let btnCloseModal = getDOM(".btnClose_modal");
let btnShow = getDOM(".btnShow");

let listSV = new ListSinhVien();

function resetInput() {
  myForm.reset();
}

function resetForm() {
  let errorInput = getDOMs(".error_input");
  errorInput.forEach((item) => {
    item.innerText = "";
  });

  resetInput();
  domMaSV.disabled = false;
  domMaSV.classList.remove("maSV_disabled");

  //ẩn nút update và hiện nút add
  btnUpdate.style.display = "none";
  btnAdd.style.display = "block";
}

function checkValidation() {
  let validate = new Validation();
  //mảng các thuộc tính của đối tượng sinh viên từ ô input

  let countError = 0;

  if (!checkMSSV(validate)) countError++;
  if (!checkFullName(validate)) countError++;
  if (!checkEmail(validate)) countError++;
  if (!checkPhone(validate)) countError++;
  if (!checkPoint(domMathPoint, validate)) countError++;
  if (!checkPoint(domPhyPoint, validate)) countError++;
  if (!checkPoint(domChemPoint, validate)) countError++;

  if (countError != 0) return false;
  else return true;
}

function checkInputEmpty(domInput, validate) {
  //nếu rỗng trả về false, ngược lại trả về true

  //dom phần tử kế tiếp phần tử hiện tại
  //trường hợp hiện tại là thẻ input và muốn DOM đến thẻ kế tiếp là thẻ span
  let errorEmpty = domInput.nextElementSibling;

  let checkEmpty = validate.validateEmpty(domInput.value);

  if (!checkEmpty) {
    errorEmpty.innerText = domInput.placeholder + " không được để trống";
  } else {
    errorEmpty.innerText = "";
  }

  return checkEmpty;
}

function checkMSSV(validate) {
  if (checkInputEmpty(domMaSV, validate)) {
    let checkRegex = validate.validateMSSV(domMaSV.value);
    let error = domMaSV.nextElementSibling;

    if (checkRegex) {
      error.innerText = "";
    } else {
      error.innerText = domMaSV.placeholder + " chỉ chứa số";
    }

    return checkRegex;
  }

  return false;
}

function checkFullName(validate) {
  if (checkInputEmpty(domNameSV, validate)) {
    let checkRegex = validate.validateFullName(domNameSV.value);
    let error = domNameSV.nextElementSibling;

    if (checkRegex) {
      error.innerText = "";
    } else {
      error.innerText = domNameSV.placeholder + " chỉ chứa chữ và không dấu";
    }

    return checkRegex;
  }

  return false;
}

function checkEmail(validate) {
  if (checkInputEmpty(domEmail, validate)) {
    let checkRegex = validate.validateEmail(domEmail.value);
    let error = domEmail.nextElementSibling;

    if (checkRegex) {
      error.innerText = "";
    } else {
      error.innerText = domEmail.placeholder + " không hợp lệ";
    }

    return checkRegex;
  }

  return false;
}

function checkPhone(validate) {
  if (checkInputEmpty(domPhoneNumber, validate)) {
    let checkRegex = validate.validatePhone(domPhoneNumber.value);
    let error = domPhoneNumber.nextElementSibling;

    if (checkRegex) {
      error.innerText = "";
    } else {
      error.innerText =
        domPhoneNumber.placeholder +
        " chỉ chứa số, bắt đầu bằng số 0 và 10 số trở lên";
    }

    return checkRegex;
  }

  return false;
}

function checkPoint(domPoint, validate) {
  if (checkInputEmpty(domPoint, validate)) {
    let checkRegex = validate.validatePoint(domPoint.value);
    let error = domPoint.nextElementSibling;

    if (checkRegex) {
      error.innerText = "";
    } else {
      error.innerText =
        domPoint.placeholder +
        " chỉ chứa số và số thập phân ở dạng dấu chấm (9.5)";
    }
    return checkRegex;
  }

  return false;
}

function createSinhVien() {
  let sv = new SinhVien(
    domMaSV.value,
    domNameSV.value,
    domEmail.value,
    domPhoneNumber.value,
    domMathPoint.value,
    domPhyPoint.value,
    domChemPoint.value
  );

  return sv;
}

function renderUI(arrSV) {
  console.log(arrSV);
  let htmlData = arrSV.map((sv, index) => {
    return `
    <tr>
        <td>${sv.maSV}</td>
        <td style="text-transform:capitalize;width: 20%;">${sv.nameSV}</td>
        <td>${sv.email}</td>
        <td>${sv.phoneNumber}</td>
        <td>${sv.calculateAvg()}</td>
        <td>${sv.sortType()}</td>
        <td style="width: 18%;">
            <button class="btn btn-danger" onclick="handleDel('${
              sv.maSV
            }')">Xóa</button>
            <button class="btn btn-info" data-toggle="modal" data-target="#modelAdd" onclick="renderFormUpdate('${
              sv.maSV
            }')">Cập nhật</button>
        </td>
    </tr>`;
  });

  dataTable.innerHTML = htmlData.join("");
}

function handleAdd() {
  let sv = createSinhVien();
  resetInput();
  
  listSV.addSV(sv);
  renderUI(listSV.arrSV);

  //đóng form
  btnCloseModal.click();
}

btnAdd.addEventListener("click", (e) => {
 

  //nếu checkValidate đúng mới cho phép thêm sinh viên
  if (checkValidation()) {
    handleAdd();
  }
});

//hiển thị sinh viên
btnShow.addEventListener("click", () => {
  renderUI(listSV.arrSV);
});

//xóa sinh viên
function handleDel(maSVDel) {
  listSV.deleteSV(maSVDel);
  renderUI(listSV.arrSV);
}

//hiển thị thông tin sinh viên cần cập nhật lên form
function renderFormUpdate(maSVUpdate) {
  let sinhViens = listSV.arrSV;
  for (let i = 0; i < sinhViens.length; i++) {
    if (sinhViens[i].maSV == maSVUpdate) {
      //css input id, ko đc thay đổi
      domMaSV.disabled = true;
      domMaSV.classList.add("maSV_disabled");

      //ẩn add và hiện nút update
      btnAdd.style.display = "none";
      btnUpdate.style.display = "block";

      domMaSV.value = sinhViens[i].maSV;
      domNameSV.value = sinhViens[i].nameSV;
      domEmail.value = sinhViens[i].email;
      domPhoneNumber.value = sinhViens[i].phoneNumber;
      domMathPoint.value = sinhViens[i].mathPoint;
      domPhyPoint.value = sinhViens[i].phyPoint;
      domChemPoint.value = sinhViens[i].chemPoint;

      break;
    }
  }
}

//cập nhật sinh viên
function handleUpdate() {
  if (checkValidation()) {
    let svUpdate = createSinhVien();
    listSV.updateSV(svUpdate);
    renderUI(listSV.arrSV);

    //đóng form
    btnCloseModal.click();
  }
}

btnUpdate.addEventListener("click", () => {
  handleUpdate();
});


//tìm kiếm sinh viên
let inputSearch = getDOM("#search_name");
let btnSearch = getDOM(".btn_search");

function handleSearch() {
  let keyWord = inputSearch.value.toLowerCase();
  if (keyWord != "") {
    let arrSearch = listSV.searchSV(keyWord);
    renderUI(arrSearch);
    inputSearch.value = "";
  }
}

btnSearch.onclick = handleSearch;


//lưu vào storage
let btnAddStorage = getDOM(".btnAddStorage");
function saveStorage() {
  let jsonListSV = JSON.stringify(listSV.arrSV);
  localStorage.setItem("danhSachSinhVien", jsonListSV);
}

btnAddStorage.onclick = saveStorage;


//lấy storage
let btnGetStorage = getDOM(".btnGetStorage");
function getStorage() {
  let jsonListSV = localStorage.getItem("danhSachSinhVien");
  let arrObj = JSON.parse(jsonListSV);

  arrObj.forEach((item) => {
    let length = listSV.arrSV.length;
    console.log(length);
    let checkExist = false;

    //trường hợp đã có sinh viên được thêm 
    //và ta muốn get dữ liệu từ stroge ra
    //ta phải kiểm tra sinh viên đó tồn tại chưa thông qua mã sinh viên
    for (let i = 0; i < length; i++) {
      if (item.maSV == listSV.arrSV[i].maSV) {
        checkExist = true;
      }
    }


    //trường hợp ban đầu chưa thêm sinh viên nào cả
    //hoặc sinh viện trên bảng hiện tại chưa tồn tại
    if (!checkExist || listSV.arrSV.length == 0) {
      let sv = new SinhVien(
        item.maSV,
        item.nameSV,
        item.email,
        item.phoneNumber,
        item.mathPoint,
        item.phyPoint,
        item.chemPoint
      );

      listSV.addSV(sv);
    }
  });

  renderUI(listSV.arrSV);

 
}

btnGetStorage.onclick = getStorage;