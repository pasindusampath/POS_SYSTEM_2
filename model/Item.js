export default class Item {

    constructor(itemCode,itemName,unitPrice,qty) {
        this._itemCode = itemCode;
        this._itemName = itemName;
        this._unitPrice = unitPrice;
        this._qty = qty;
    }


    get itemCode() {
        return this._itemCode;
    }

    set itemCode(value) {
        this._itemCode = value;
    }

    get itemName() {
        return this._itemName;
    }

    set itemName(value) {
        this._itemName = value;
    }

    get unitPrice() {
        return this._unitPrice;
    }

    set unitPrice(value) {
        this._unitPrice = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }
}

