const btnSubmit=document.querySelector('#submitBtn');
const myForm=document.querySelector('#myForm');
const amount=document.querySelector('#expenseAmount');
const description=document.querySelector('#desc');
const category=document.querySelector('#selectCategory');

//ul 
const userList=document.querySelector('#expenseList');

document.addEventListener('DOMContentLoaded',showUser);
function showUser(){
    Object.keys(localStorage).forEach(( expense)=>{
        const expenseDetails=JSON.parse(localStorage.getItem(expense));
        toCreateListItem(expenseDetails);

    });
}

myForm.addEventListener('submit',print);
function print(e){
    e.preventDefault();
    const expenseDetails ={
        amount:amount.value,
        description:description.value,
        category:category.value
    }
    console.log(expenseDetails);
    localStorage.setItem(description.value,JSON.stringify(expenseDetails));
    toCreateListItem(expenseDetails);
    amount.value="";
    description.value="";
    category.value="";

}

function toCreateListItem(expenseDetails){
    const li=document.createElement("li");
    li.className="list-group-item  ms-5";
    li.style.listStyleType="square";
    li.appendChild(document.createTextNode(`${expenseDetails.amount} - ${expenseDetails.description} - ${expenseDetails.category}`));

    //edit button
    var editBtn=document.createElement("button");
    editBtn.className="btn btn-outline-dark  ms-2";
    editBtn.id="editExpense";
    editBtn.textContent="Edit";
    editBtn.addEventListener('click',function(){
        localStorage.removeItem(expenseDetails.description);
        amount.value=expenseDetails.amount;
        description.value=expenseDetails.description;
        category.value=expenseDetails.category;
        li.remove();
    });
    li.appendChild(editBtn);

    //delete button
    var deleteBtn=document.createElement("button");
    deleteBtn.className="btn btn-outline-dark  ms-2";
    deleteBtn.id="deleteExpense";
    deleteBtn.textContent="Delete";
    deleteBtn.addEventListener('click',function(){
        localStorage.removeItem(expenseDetails.description);
        li.remove();
        });
    li.appendChild(deleteBtn);
    userList.appendChild(li);



}