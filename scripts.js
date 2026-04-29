// resgatando o valor do input amount
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");


// resgatando a lista de despesas
const expenseList = document.querySelector("ul");

// formatação do valor do input amount para aceitar apenas números
amount.oninput = () => {
  let value = amount.value.replace(/\D/g, ""); // Remove tudo o que não for dígito

  value = Number(value) / 100; // Converte para número e ajusta a posição decimal

  amount.value = formatCurrencyBRL(value);
};

// edita o valor do input amount para o formato de moeda brasileira
function formatCurrencyBRL(value) {
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });

  return value;
};

// captura um evento de submit
form.onsubmit = (event) => {
  event.preventDefault(); // não deixa a página recarregar


  // objeto com os dados do novo gasto
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date()
  };

  expenseAdd(newExpense);
};

function expenseAdd(newExpense) {
  try {
    
    //cria um elemento de li e sua classe
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    // cria o ícone da categoria
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", newExpense.category_name);

    // cria o container do nome da despesa
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    // cria o nome da despesa
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    // cria a categoria da despesa
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    // cria o valor da despesa
    const expenseAmount = document.createElement("span");
    expenseAmount.setAttribute("class", "expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount.toUpperCase().replace("R$", "")}`;


    // adiciona nome e categoria no container
    expenseInfo.append(expenseName, expenseCategory);

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount);

    // adiciona o item na lista
    expenseList.append(expenseItem);

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  };
};
