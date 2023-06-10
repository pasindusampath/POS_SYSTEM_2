const itemdata = "ITEMDATA"; // local storage saved key
const customerdata = "CUSTOMERDATA"; // local storage saved key

export function saveCustomerDB(new_customer) {
    let pre_data = localStorage.getItem(customerdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    data_arr.push(new_customer);
    localStorage.setItem(customerdata, JSON.stringify(data_arr));
}

export function updateCustomerDB(new_customer) {
    let pre_data = localStorage.getItem(customerdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    //data_arr.push(new_customer);

    let index = data_arr.findIndex((customer, index)=> customer._customerId === new_customer._customerId);
    data_arr[index]._customerName = new_customer._customerName;
    data_arr[index]._customerAddress = new_customer._customerAddress;
    data_arr[index]._customerContact = new_customer._customerContact;
    localStorage.setItem(customerdata, JSON.stringify(data_arr));
}

export function deleteCustomerDB(new_customer) {
    let pre_data = localStorage.getItem(customerdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    //data_arr.push(new_customer);

    let index = data_arr.findIndex((customer, index)=> customer._customerId === new_customer._customerId);
    data_arr.splice(index,1);
    localStorage.setItem(customerdata, JSON.stringify(data_arr));
}

export function getCustomerDB() {
    let pre_data = localStorage.getItem(customerdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    return data_arr;
}

export function saveItemDB(new_item) {
    let pre_data = localStorage.getItem(itemdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    data_arr.push(new_item);
    localStorage.setItem(itemdata, JSON.stringify(data_arr));
}
export function updateItemDB(new_item) {
    let pre_data = localStorage.getItem(itemdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    //data_arr.push(new_customer);

    let index = data_arr.findIndex((item, index)=> item._itemCode === new_item._itemCode);
    data_arr[index]._itemName = new_item._itemName;
    data_arr[index]._unitPrice = new_item._unitPrice;
    data_arr[index]._qty = new_item._qty;

    localStorage.setItem(itemdata, JSON.stringify(data_arr));
}

 export function deleteItemDB(new_item) {
    let pre_data = localStorage.getItem(itemdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    //data_arr.push(new_customer);

    let index = data_arr.findIndex((item, index)=> item._itemCode === new_item._itemCode);
    data_arr.splice(index,1);
    localStorage.setItem(itemdata, JSON.stringify(data_arr));
}
export function getItemDB() {
    let pre_data = localStorage.getItem(itemdata);
    let data_arr = [];
    // undefine/ null/ "" / false
    if (pre_data) {
        data_arr = JSON.parse(pre_data);
    }
    return data_arr;
}