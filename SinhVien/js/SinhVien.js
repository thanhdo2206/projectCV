class SinhVien {
    constructor(
        mssv,
        nameSV,
        email,
        phoneNumber,
        mathPoint,
        phyPoint,
        chemPoint
    ) {
        this.maSV = mssv;
        this.nameSV = nameSV;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.mathPoint = Number.parseFloat(mathPoint);
        this.phyPoint = Number.parseFloat(phyPoint);
        this.chemPoint = Number.parseFloat(chemPoint);
    }

    calculateAvg() {
        let avg = (this.phyPoint + this.chemPoint + this.mathPoint) / 3;
        return avg;
    }

    sortType(){
        let avg = this.calculateAvg();

        if(avg > 8.5) return "Giỏi";
        else if(avg > 6) return "Khá";
        else return "Trung Bình";
    }
}
