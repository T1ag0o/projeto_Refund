// resgatando o valor do input amount
const form = document.querySelector("form");
const amount = document.getElementById("amount");
const expense = document.getElementById("expense");
const category = document.getElementById("category");


// resgatando a lista de despesas
const expenseList = document.querySelector("ul");
const expensesTotal = document.querySelector("aside header h2");

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


// função para adicionar um novo gasto na lista
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

    // cria o botão de excluir
    const deleteButton = document.createElement("img");
    deleteButton.setAttribute("src", "img/remove.svg");
    deleteButton.setAttribute("alt", "Excluir despesa");
    deleteButton.classList.add("remove-icon");


    // adiciona nome e categoria no container
    expenseInfo.append(expenseName, expenseCategory);

    // adiciona as informações no item
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, deleteButton);

    // adiciona o item na lista
    expenseList.append(expenseItem);


    // limpa o formulário com a função
    formClear();

    updateTotals();

  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  };
};

// Atualiza as quantidades totais
function updateTotals() {
  try {
    // recupera os (li) da (ul)
    const items = expenseList.children;

    // recupera o contador de despesas
    const expenseCount = document.getElementById("qtd-expenses");
    expenseCount.textContent = `${items.length} ${items.length > 1 ? 'despesas' : 'despesa'}`;

    // atualiza o valor de total despesas
    let total = 0;

    for(let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");

      // remove os caracteres não numericos
      let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", ".");

      value = parseFloat(value);

      // verifica se é um número válido
      if (isNaN(value)) {
        return alert("Não foi possível calcular o total");
      };

      // incremente o total
      total += Number(value);

    };
  
    // cria span para adicionar o 'R$'
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    // limpa o conteudo
    expensesTotal.innerHTML = "";

    // adiciona o simbolo da moeda e o valor formatado
    expensesTotal.append(symbolBRL, total);

  } catch (error) {
    console.log(error);
    alert("Não foi possível atualizar os totais");
  }
};

// evento que captura o clique nos itens da lista
expenseList.addEventListener("click", function (event) {
  // verifica se é o icone de excluir que é clicado
  if (event.target.classList.contains("remove-icon")) {
    // obtém a li pai do elemento clicado
    const item = event.target.closest(".expense");

    // remove item da lista
    if (item) {
      item.remove();

      updateTotals();
    };
  };

});

// limpa o formulário
function formClear() {
  expense.value = "";
  category.value = "";
  amount.value = "";

  expense.focus();
}