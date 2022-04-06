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

let listSV = new ListSinhVien();

function resetErrorForm() {
  let errorInput = getDOMs(".error_input");
  errorInput.forEach((item) => {
    item.innerText = "";
  });
}

function checkValidation() {
  let validate = new Validation();
  //mảng các thuộc tính của đối tượng sinh viên từ ô input
  //   let arrProperties = Object.keys(objSV);
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

function resetInput() {
  myForm.reset();
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

function renderUI() {
  let htmlData = listSV.arrSV.map((sv, index) => {
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
            <button class="btn btn-info" data-toggle="modal" data-target="#modelAdd" onclick="renderSVUpdate('${
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
  console.log(sv);
  listSV.addSV(sv);
  renderUI();
}

btnAdd.addEventListener("click", (e) => {
  // e.preventDefault();

  //nếu checkValidate đúng mới cho phép thêm sinh viên
  if (checkValidation()) {
    handleAdd();
  }
});

//xóa sinh viên
function handleDel(maSVDel) {
  listSV.deleteSV(maSVDel);
  renderUI();
}

//hiển thị thông tin sinh viên cần cập nhật
function renderSVUpdate(maSVUpdate) {
  let sinhViens = listSV.arrSV;
  for (let i = 0; i < sinhViens.length; i++) {
    if (sinhViens[i].maSV == maSVUpdate) {
      domMaSV.disabled = true;
      domMaSV.classList.add('maSV_disabled');
      getDOM(".btnUpdate_modal").innerText = "Cập nhật";

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
function handleUpdate(maSVUpdate) {
  let arrProperties = Object.keys(objSV);
}
