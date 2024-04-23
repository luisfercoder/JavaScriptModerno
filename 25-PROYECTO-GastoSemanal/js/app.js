//Variables y selectores
const form = document.querySelector('#agregar-gasto');
const ExpensesList = document.querySelector('#gastos ul')



//Eventos
 evenListeners();

function evenListeners(){
  document.addEventListener('DOMContentLoaded',askBudget);

  form.addEventListener('submit', addExpense);
}



//Clases
class Budget {
  constructor(budget){
    this.budget = Number(budget);
    this.remaining = Number(budget);
    this.expenses = [];
  }
  newExpense(expense){
    this.expenses = [...this.expenses,expense];
    this.calculateRemain();
  }
  calculateRemain(){
    const spendMoney = this.expenses.reduce((total,expense)=> total + expense.quantity, 0);
    this.remaining = this.budget - spendMoney;
  }
  eraseExpense(id){
    this.expenses = this.expenses.filter(expense => expense.id !==id);
    this.calculateRemain();
  }

}
class UI{
  insertBudget(quantity){
    //Extraer los valores
     const {budget, remaining } = quantity;
    //Agregar al HTML
    document.querySelector('#total').textContent = budget;
    document.querySelector('#restante').textContent = remaining;
  }
  //crear alerta
   printAlert (message,type) {
    //crear el div
    const divMessage = document.createElement('DIV');
    divMessage.classList.add('text-center', 'alert');

    if(type ==='error'){
      divMessage.classList.add('alert-danger');
    }else{
      divMessage.classList.add('alert-success');
    }

    //Mensaje de error
    divMessage.textContent = message;
     //Insertar en el HTML
     document.querySelector('.primario').insertBefore(divMessage,form)
     //quitar del HTML
     setTimeout(()=>{
      divMessage.remove();
     },2000)
  }
  addExpenseList(expenses){

    this.cleanHTML();

    //Iterar sobre lso gastos
    expenses.forEach(expense=>{
      const{quantity,name,id} = expense;

      //crear un LI
      const newExpense = document.createElement('li');
      newExpense.className = 'list-group-item d-flex justify-content-between align-items-center';
      // newExpense.setAttribute('data-id', id); ----Esta es la version vieja
      newExpense.dataset.id = id;

      //Agregar el HTML del gasto
      newExpense.innerHTML=` ${name}<span class="badge badge-prymary badge-pill">$ ${quantity} </span>`;

      //Boton para borrar el gasto
      const btnErase = document.createElement('button');
      btnErase.classList.add('btn','btn-danger','borrar-gasto');
      btnErase.innerHTML = 'Borrar &times;'
      btnErase.onclick = ()=>{
        eraseExpense(id);
      }
      newExpense.appendChild(btnErase);


      //Agregar en el HTML
      ExpensesList.appendChild(newExpense);
    })
  }
  cleanHTML(){
    while (ExpensesList.firstChild) {
      ExpensesList.removeChild(ExpensesList.firstChild);
  }
  }

  actualizeRemaining(remaining){
    document.querySelector('#restante').textContent = remaining;
  }

  checkBudget(budgetObj){
    const {budget, remaining} = budgetObj;
    const restantDiv = document.querySelector('.restante')
    //Comprobar 25%
    if((budget / 4)> remaining){
      restantDiv.classList.remove('alert-success','alert-warning');
      restantDiv.classList.add('alert-danger');
    }else if((budget/2)>remaining){
      restantDiv.classList.remove('alert-success');
      restantDiv.classList.add('alert-warning')
    }else{
      restantDiv.classList.remove('alert-danger','alert-warning');
      restantDiv.classList.add('alert-success');
    }
   //Si el total es 0 o menor
   if(remaining <= 0){
    ui.printAlert('El presupuesto se ha agotado','error');
    form.querySelector('button[type="submit"]').disabled = true;
   }
  }


}
//Instanciar
const ui = new UI();
let budget;

//Funciones

function askBudget(){
  const budgetToUser = prompt('¿Cual es tu presupueso?');
  // console.log(budgetToUser)
  if(budgetToUser === ''|| budgetToUser === null||isNaN(budgetToUser)||budgetToUser<=0){
    window.location.reload();
  }
  //presupuesto valido 
   budget = new Budget(budgetToUser);
   console.log(budget);

   ui.insertBudget(budget);

}
//Añade gastos
function addExpense(e){
  e.preventDefault();
  const name = document.querySelector('#gasto').value
  const quantity= Number(document.querySelector('#cantidad').value)

  //validar
  if(name === ''||quantity ===''){
    ui.printAlert('Ambos campos son obligatorios','error');
    return;
  }else if(quantity<=0 ||isNaN(quantity)){
    ui.printAlert('Cantidad no valida','error');
    return;
  }
  //Crear un objeto con el  gasto
  const expense ={name, quantity,id:Date.now()} //Object Literal Hanhansmen

  //añade un nuevo gasto
  budget.newExpense(expense);
  //Mensaje de todo bien
  ui.printAlert('Gasto agregado correctamente');
  //imprimir los gastos
  const {expenses,remaining } = budget;
  ui.addExpenseList(expenses);
  ui.actualizeRemaining(remaining);
  ui.checkBudget(budget);
  //reinicia el formulario
  form.reset();
}
function eraseExpense(id){
  //Elimina del objeto
  budget.eraseExpense(id);
  //Elimina los gastos del HTML
  const {expenses,remaining}= budget;
  ui.addExpenseList(expenses);
  ui.actualizeRemaining(remaining);
  ui.checkBudget(budget);
}