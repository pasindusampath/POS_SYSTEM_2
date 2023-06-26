import {getCustomerDB, getItemDB, searchCustomerById, searchItemByCode} from "../db/db.js";
import {CartTM} from "../tm/cartTM.js";




export  class PlaceOrderController {
    constructor() {
        $('#btnManageOrder').click(this.btnaction.bind(this));
        $('#btnAddToCart').click(this.addToCart.bind(this));

    }
    addToCart(){
        let av=-1;
        if(selectedItem===-1){
            alert("Select Item First");
            return;
        }
        let code = $('#btn-item-data').text();
        let itemName = $('#txtItemName1').val();
        let price = $('#txtItemPrice1').val();
        let avqty = $('#txtItemQty1').val();
        let qty = $('#txtQty').val();
        let total = price*qty;
        if(!qty || qty<=0){
            alert('qty cannot be empty or - values');
            return;
        }
        $.each(cart,function (i,e){
            console.log(e._itemCode);
            if(e._itemCode===code){
                av=1;
                let nqt = parseInt(e._qty)+parseInt(qty);
                if(nqt>avqty){
                    alert('Quantity Not Enough');
                    return;
                }
                e._qty= nqt;
                e.total=parseInt(e._price)*parseInt(e._qty);
                let data = $('#table tbody tr').eq(i+1);
                data.children('td').eq(4).text('Rs.'+e.total+'.00');
                data.children('td').eq(3).text(e._qty);
                return
            }
        })
        if(av===-1){
            if(qty>avqty){
                alert('QTY not enogh');
                return;
            }
            let cartTM = new CartTM(code,itemName,price,qty,total);
            cart.push(cartTM);
            let row = $(`<tr><td>${code}</td><td>${itemName}</td><td>Rs.${price}.00</td><td>${qty}</td><td>Rs.${total}.00</td></tr>`);
            row.click(function() {
                $(this).focus();
                console.log('focused');
                console.log("delete request for row num ");
            });
            row.on('keydown',function (ev){
                console.log('key down')
                if(ev.keyCode===46){

                }
            })
            $('#table tbody').append(row)
        }
        this.clearFields();
    }

    clearFields(){
        $('#btn-item-data').text('SELECT ITEM');
        $('#txtItemName1').val('');
        $('#txtItemPrice1').val('');
        $('#txtItemQty1').val('');
        $('#txtQty').val('');
        selectedItem=-1;
    }


    searchCustomer(id) {
        let customer = searchCustomerById(id);
        $('#txtCustomerId1').val(customer._customerId);
        $('#txtCustomerName1').val(customer._customerName);
        $('#txtCustomerAddress1').val(customer._customerAddress);
        $('#txtCustomerContact1').val(customer._customerContact);

    }

    searchItem(id) {
        let item = searchItemByCode(id);
        $('#txtItemName1').val(item._itemName)
        $('#txtItemPrice1').val(item._unitPrice)
        $('#txtItemQty1').val(item._qty)

    }

    btnaction() {
        $('#manage-items-section').css("display", "none");
        $('#manage-customers-section').css("display", "none");
        $('#place-order-section').css("display", "block");
        changeColor("#btnManageCustomer", "#797676");
        changeColor("#btnManageItems", "#797676");
        changeColor("#btnManageOrder", "#4e7cff");
        ob.loadAllData();
    }

    loadAllData() {
        let customers = getCustomerDB();
        let items = getItemDB();
        let customerList = $('#customer-data');
        let itemList = $('#item-data');
        customerList.empty();
        itemList.empty();
        $.each(items, function (i, e) {
            let it = $(`<li>${e._itemCode}</li>`);
            it.click(function () {
                selectedItem = i;
                ob.searchItem(e._itemCode);
                $('#btn-item-data').text(e._itemCode);
            })
            itemList.append(it);
        });
        $.each(customers, function (i, e) {
            let it = $(`<li>${e._customerId}</li>`);
            it.click(function () {
                selectedCustomer = i;
                ob.searchCustomer(e._customerId);
                $('#btn-customer-data').text(e._customerId);
            });
            customerList.append(it);
            console.log('appended')
        })
    }
}
let cart = [];
let selectedCustomer = -1;
let selectedItem = -1;
let ob = new PlaceOrderController();