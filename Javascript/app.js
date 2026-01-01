let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// Update category dropdown based on type selection
function updateCategory() {
  const type = document.getElementById("type").value;
  const category = document.getElementById("category");

  category.innerHTML = "<option value=''>Select Category</option>";

  if (type === "Expense") {
    const expenseCategories = [
      "Food",
      "Travel",
      "Rent",
      "Shopping",
      "Electricity",
      "Internet",
      "Medical",
      "Education",
      "Entertainment",
      "Other"
    ];

    expenseCategories.forEach(cat => {
      category.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
  }

  if (type === "Income") {
    const incomeSources = [
      "Salary",
      "Freelance",
      "Business",
      "Investment",
      "Bonus",
      "Rental Income",
      "Other"
    ];

    incomeSources.forEach(src => {
      category.innerHTML += `<option value="${src}">${src}</option>`;
    });
  }
}

// Add new expense/income
function addExpense() {
  const title = document.getElementById("title").value.trim();
  const amount = Number(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  const category = document.getElementById("category").value;

  if (!title || !amount || !type || !category) {
    alert("Please fill all fields");
    return;
  }

  if (amount <= 0) {
    alert("Amount must be greater than 0");
    return;
  }

  expenses.push({ 
    id: Date.now(),
    title, 
    amount, 
    type, 
    category,
    date: new Date().toLocaleDateString()
  });
  
  localStorage.setItem("expenses", JSON.stringify(expenses));

  // Clear form
  document.getElementById("title").value = "";
  document.getElementById("amount").value = "";
  document.getElementById("type").value = "";
  document.getElementById("category").innerHTML = "<option value=''>Select Category</option>";

  renderExpenses();
}

// Delete expense
function deleteExpense(id) {
  if (confirm("Are you sure you want to delete this transaction?")) {
    expenses = expenses.filter(e => e.id !== id);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    renderExpenses();
  }
}

// Render expenses and update summary
function renderExpenses() {
  const list = document.getElementById("expenseList");
  list.innerHTML = "";

  let totalIncome = 0;
  let totalExpense = 0;

  if (expenses.length === 0) {
    list.innerHTML = `
      <tr>
        <td colspan="5" class="empty-state">No transactions yet. Add your first transaction above!</td>
      </tr>
    `;
  } else {
    expenses.forEach(e => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${e.title}</td>
        <td><strong>₹${e.amount.toFixed(2)}</strong></td>
        <td><span class="badge badge-${e.type.toLowerCase()}">${e.type}</span></td>
        <td>${e.category}</td>
        <td>
          <button onclick="deleteExpense(${e.id})" class="btn-delete">Delete</button>
        </td>
      `;
      list.appendChild(row);

      if (e.type === "Income") {
        totalIncome += e.amount;
      } else {
        totalExpense += e.amount;
      }
    });
  }

  const balance = totalIncome - totalExpense;

  // Update summary cards
  document.getElementById("totalIncome").innerText = `₹${totalIncome.toFixed(2)}`;
  document.getElementById("totalExpense").innerText = `₹${totalExpense.toFixed(2)}`;
  document.getElementById("balance").innerText = `₹${balance.toFixed(2)}`;
}

// Initialize on page load
renderExpenses();