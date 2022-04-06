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
    let index = this.arrSV.findIndex(sv => sv.maSV == svUpdate.maSV);
    this.arrSV.splice(index, 1 , svUpdate);
  }

  searchSV(keyWord) {

    let listSearch = new ListSinhVien();
    this.arrSV.forEach((sv) => {
      let name = sv.nameSV.toLowerCase();
      
      if (name.search(keyWord) != -1) {
        listSearch.addSV(sv);
      }
    });

    return listSearch.arrSV;
  }
}
