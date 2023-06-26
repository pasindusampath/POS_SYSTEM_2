import Item from "../model/Item.js";
import {deleteItemDB, getCustomerDB, getItemDB, saveItemDB, updateItemDB} from "../db/db.js";

export class ItemController{
    constructor() {
        $("#btnSaveItem").click(this.handelerSaveItem.bind(this));
        $("#btnUpdateItem").click(this.handelerUpdateItem.bind(this));
        $("#btnDeleteItem").click(this.handelerDeleteItem.bind(this));
        $("#btnSearchItem").click(this.handelerSearchItem.bind(this));
        this.handelerLoadItem();
    }

    handelerSaveItem(){
        console.log("Save Called in Item Controller");
        const reg = /^\d+$/;
        if(this.isIdAlreadyAdded()){
            alert("Duplicate Id detected Item Not Added");
            return;
        }
        /*let flag = !reg.test($("#txtItemId").val()) ? alert("invalid id") : !$("#txtItemName").val() ? alert("Invalid Name") :
            !reg.test($("#txtItemPrice").val()) ? alert("Invalid price") : !reg.test($("#txtItemQty").val()) ?
                alert("Invalid qty") :true;

        if(flag==null)return;*/

        var item_id = $('#txtItemId').val();
        var item_name = $('#txtItemName').val();
        var item_price = $('#txtItemPrice').val();
        var item_qty = $('#txtItemQty').val();

        let item = new Item(item_id,item_name,item_price,item_qty);
        saveItemDB(item);

        this.handelerLoadItem();
    }

    handelerLoadItem(){
        // let pre_data = localStorage.getItem(data);
        // let customer_data_arr = JSON.parse(pre_data);
        let item_data_arr = getItemDB();

        $('#tblItemData').empty();

        item_data_arr.map((result, index) => {
            var row = "<tr class='row-data'>" +
                "<td>" + result._itemCode + "</td>" +
                "<td>" + result._itemName + "</td>" +
                "<td>" + result._unitPrice + "</td>" +
                "<td>" + result._qty + "</td>" +
                "</tr>";
            $('#tblItemData').append(row);
        })
    }

    handelerUpdateItem(){
        var item_id = $('#txtItemId').val();
        var item_name = $('#txtItemName').val();
        var item_price = $('#txtItemPrice').val();
        var item_qty = $('#txtItemQty').val();

        let item = new Item(item_id,item_name,item_price,item_qty);
        updateItemDB(item);

        this.handelerLoadItem();
    }

    handelerDeleteItem(){
        var item_id = $('#txtItemId').val();
        var item_name = $('#txtItemName').val();
        var item_price = $('#txtItemPrice').val();
        var item_qty = $('#txtItemQty').val();

        let item = new Item(item_id,item_name,item_price,item_qty);
        deleteItemDB(item);

        this.handelerLoadItem();
    }

    handelerSearchItem() {
        var item_id = $("#txtItemId").val();
        let item_data_arr = getItemDB();

        const foundItem = item_data_arr.find((item) => item._itemCode === item_id);
        $("#txtItemName").val(foundItem._itemName);
        $("#txtItemPrice").val(foundItem._unitPrice);
        $("#txtItemQty").val(foundItem._qty);
    }

    isIdAlreadyAdded(){
        let item_array = getItemDB();
        let find = item_array.find((item)=> item._itemCode === $("#txtItemId").val());
        if(find){
            return true;
        }
        return false;
    }

}
new ItemController();