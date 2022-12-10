const btnSubmit=document.querySelector('#submitBtn');
const myForm=document.querySelector('#myForm');
const amount=document.querySelector('#expenseAmount');
const description=document.querySelector('#desc');
const category=document.querySelector('#selectCategory');


let editExpenseId=null;
//to display message
const msg=document.querySelector('#msg');

//ul 
const expenseList=document.querySelector('#expenseList');

//onDomContentLoaded
document.addEventListener('DOMContentLoaded',showExpenseList);
function showExpenseList(){
    axios.get('https://crudcrud.com/api/d532637c370e4815a68d720d385651d9/expenseTracker')
    .then((res)=>{

        Object.keys(res.data).forEach((key)=>{
            const expenseData=res.data[key];
            toCreateListItem(expenseData);
        })
    })
}


myForm.addEventListener('submit',onSubmit);




function onSubmit(e){
    e.preventDefault();
    const expenseDetails={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    console.log(expenseDetails);
    
    if(editExpenseId!=null){

        axios.put(`https://crudcrud.com/api/d532637c370e4815a68d720d385651d9/expenseTracker/${editExpenseId}`,expenseDetails)
            .then((res)=>{console.log(res)
                toCreateListItem(expenseDetails)})
            .catch((err)=>{console.lof(err)});

    }
    else{
        axios.post("https://crudcrud.com/api/d532637c370e4815a68d720d385651d9/expenseTracker",expenseDetails)
            .then((res)=>{
                console.log(res.data);
                toCreateListItem(res.data)
            })
            .catch((err)=>{
                console.log(err);
            })
    }


}

function toCreateListItem(expenseData){

    const li=document.createElement("li");
    li.appendChild(document.createTextNode(`${expenseData.amount} : ${expenseData.description} : ${expenseData.category}`));


    //delete Button
    var deleteButton =document.createElement("input");
    deleteButton.type="button";
    deleteButton.value="Delete";
    deleteButton.id="deleteExpense";
    deleteButton.class="btn btn-warning";
    deleteButton.addEventListener('click',function(){

        axios.delete(`https://crudcrud.com/api/d532637c370e4815a68d720d385651d9/expenseTracker/${expenseData._id}`)
            .then((res)=>{
                console.log(res.data);
            })
            .catch((err)=>{console.log(err)});
        li.remove();
    });
    li.appendChild(deleteButton);



    //edit button
    var editButton = document.createElement("input");
    editButton.type="button";
    editButton.id="editExpense0";
    editButton.value="Edit";
    editButton.class="btn btn-secondary";
    editButton.addEventListener('click',function(){
        document.getElementById('expenseAmount').value=expenseData.amount;
        document.getElementById('desc').value=expenseData.description;
        document.getElementById('selectCategory').value=expenseData.category;
        editExpenseId=expenseData._id;
        li.remove();

    })
    li.appendChild(editButton);
    expenseList.appendChild(li);
    

}