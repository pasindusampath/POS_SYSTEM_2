import {deleteCustomerDB, getCustomerDB, saveCustomerDB, updateCustomerDB} from "../db/db.js";
import Customer from "../model/Customer.js";


export class CustomerController{
    constructor() {
        $("#btnSaveCustomer").click(this.handelerSaveCustomer.bind(this));
        $("#btnSearchCustomer").click(this.handelerSearchCustomer.bind(this));
        $("#btnUpdateCustomer").click(this.handelerUpdateCustomer.bind(this));
        $("#btnDeleteCustomer").click(this.handelerDeleteCustomer.bind(this));
        this.handelerLoadCustomer()
    }

    handelerLoadCustomer(){
        // let pre_data = localStorage.getItem(data);
        // let customer_data_arr = JSON.parse(pre_data);
        let customer_data_arr = getCustomerDB();

        $('#tblCustomerData').empty();

        customer_data_arr.map((result, index) => {
            var row = "<tr class='row-data'>" +
                "<td>" + result._customerId + "</td>" +
                "<td>" + result._customerName + "</td>" +
                "<td>" + result._customerAddress+ "</td>" +
                "<td>" + result._customerContact + "</td>" +
                "</tr>";
            $('#tblCustomerData').append(row);
        })
    }

    handelerSaveCustomer(){
        console.log("Save Called in Customer Controller");
        const reg = /^\d+$/;
        /*let flag = !reg.test($("#txtCustomerId").val()) ? alert("invalid id") : !$("#txtCustomerName").val() ? alert("Invalid Name") :
            !reg.test($("#txtCustomerAddress").val()) ? alert("Invalid price") : !reg.test($("#txtCustomerContact").val()) ?
                alert("Invalid qty") :true;*/

        if(this.isIdAlreadyAdded()){
            alert("Duplicate Id detected Customer Not Added");
            return;
        }

        var customer_id = $('#txtCustomerId').val();
        var customer_name = $('#txtCustomerName').val();
        var customer_address = $('#txtCustomerAddress').val();
        var customer_contact = $('#txtCustomerContact').val();

        let customer = new Customer(customer_id,customer_name,customer_address,customer_contact);
        saveCustomerDB(customer);

        this.handelerLoadCustomer();
    }

    isIdAlreadyAdded(){
        let customer_array = getCustomerDB();
        let find = customer_array.find((customer)=> customer._customerId === $("#txtCustomerId").val());
        if(find){
            return true;
        }
        return false;
    }

    handelerDeleteCustomer(){
        var customer_id = $('#txtCustomerId').val();
        var customer_name = $('#txtCustomerName').val();
        var customer_address = $('#txtCustomerAddress').val();
        var customer_contact = $('#txtCustomerContact').val();

        let customer = new Customer(customer_id,customer_name,customer_address,customer_contact);
        deleteCustomerDB(customer);
        this.handelerLoadCustomer();

    }

    handelerUpdateCustomer(){
        var customer_id = $('#txtCustomerId').val();
        var customer_name = $('#txtCustomerName').val();
        var customer_address = $('#txtCustomerAddress').val();
        var customer_contact = $('#txtCustomerContact').val();

        let customer = new Customer(customer_id,customer_name,customer_address,customer_contact);
        updateCustomerDB(customer);
        this.handelerLoadCustomer();
    }

    handelerSearchCustomer(){
        var customer_id = $("#txtCustomerId").val();
        let customer_data_array = getCustomerDB();

        const foundCustomer = customer_data_array.find((customer) => customer._customerId === customer_id);
        $("#txtCustomerName").val(foundCustomer._customerName);
        $("#txtCustomerAddress").val(foundCustomer._customerAddress);
        $("#txtCustomerContact").val(foundCustomer._customerContact);


        /* let index = customer_data_array.findIndex((customer) => customer._customerId === customer_id);
         customer_data_array[index]._customerName = $("#txtCustomerName");
         customer_data_array[index]._customerAddress = $("#txtCustomerAddress");
         customer_data_array[index]._customerContact = $("#txtCustomerContact");*/

    }


}
new CustomerController();