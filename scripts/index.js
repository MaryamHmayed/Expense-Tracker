document.getElementById('add').addEventListener('submit', addTransaction);

const transactions = JSON.parse(localStorage.getItem('transactions')) || [];