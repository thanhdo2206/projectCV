class ListSinhVien {
  constructor() {
    this.arrSV = [];
  }

  addSV(sv) {
    this.arrSV.push(sv);
  }

  deleteSV(maSVDel) {
    for (let i = 0; i < this.arrSV.length; i++) {
      if (this.arrSV[i].maSV == maSVDel) {
        this.arrSV.splice(i, 1);
        break;
      }
    }
  }

  updateSV(svUpdate) {
    for (let i = 0; i < this.arrSV.length; i++) {
      let sv = this.arrSV[i];
      if (sv.maSV == svUpdate.maSV) {
        sv.nameSV = svUpdate.nameSV;
        sv.email = svUpdate.email;
        sv.phoneNumber = svUpdate.phoneNumber;
        sv.mathPoint = svUpdate.mathPoint;
        sv.phyPoint = svUpdate.phyPoint;
        sv.chemPoint = svUpdate.chemPoint;
        break;
      }
    }
  }
}
