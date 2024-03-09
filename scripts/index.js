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
    showTransactions();
    console.log(transactions)
  }
  document.getElementById('add').reset();
 
  /*updateBalance();*/
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