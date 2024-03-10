const add = document.getElementById('Transcation-form')

add.addEventListener('submit', addTransaction);

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];


function addTransaction(e){
    e.preventDefault();

  let type = document.getElementById('type').value;
  let name = document.getElementById('name').value;
  let amount = document.getElementById('amount').value;

  if ( name.length > 0 && amount > 0) {
    const transaction = {
      type,
      name,
      amount,
      id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
    }
    transactions.push(transaction);
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    
  }
  showTransactions();
  updateBalance()
  add.reset();

}
const showTransactions = () => {
  const transactionTable = document.getElementById('transactionTable');
  transactionTable.innerHTML = '';
  for (let i = 0; i < transactions.length; i++) {
    transactionTable.innerHTML += `
          <tr>
              <td>${transactions[i].type}</td>
              <td>${transactions[i].name}</td>
              <td>${transactions[i].amount}</td>
              <td><a class="deleteButton" onclick="deleteTransaction(${transactions[i].id})">
                  Delete</td>
          </tr>
      `;
  }
}
const deleteTransaction = (id) => {
    for (let i = 0; i < transactions.length; i++) {
      if (transactions[i].id == id) {
        transactions.splice(i, 1);
      }
    }
  
    
    localStorage.setItem('transactions', JSON.stringify(transactions));
    showTransactions();
    updateBalance();
  }



const updateBalance = () => {
    let balance = 0;
    let total_incomes=0;
    let total_expenses=0;
       
    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        balance += Number(transaction.amount);
        total_incomes+=Number(transaction.amount)
       
      } else if (transaction.type === "expense") {
        balance -= Number(transaction.amount);
        total_expenses+=Number(transaction.amount)

        ;
      }
    });
    document.getElementById('incomes').innerText=total_incomes
    document.getElementById('expenses').innerText=total_expenses


    console.log(balance)
    document.getElementById('balance').innerText = balance;
  }


  const addCurrency = async ()=> {
    
    const { data } = await axios.get("https://rich-erin-angler-hem.cyclic.app/students/available ");
    console.log(data);
    const key= "code"
     const values=[]
     data.forEach(obj => {
        values.push(obj[key]);
      });
      
    const currency=document.getElementById('user-currency')
    values.forEach(function(value){
      let option= document.createElement('option')
      option.value=value
      option.text=value
      currency.appendChild(option)
    


    })}
addCurrency()


const body = {
  from: ["AED","EURO", "LBP"],
  to: "USD",
  amount: balance
};

axios.post('https://rich-erin-angler-hem.cyclic.app/students/convert', body)
  .then(response => {
    console.log('Converted amount:', response.body.convertedAmount);
  })
  .catch(error => {
    console.error('Error converting currency:', error);
  });






