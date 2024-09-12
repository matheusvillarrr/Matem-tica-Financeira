
let editingRow = null;


function updateSummary() {
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    let totalEntradas = 0;
    let totalSaidas = 0;

    rows.forEach(row => {
        const valorText = row.children[1].innerText.replace('R$ ', '').replace('-', '').replace(',', '.');
        const valor = parseFloat(valorText);
        if (!isNaN(valor)) {
            if (row.children[1].innerText.startsWith('-R$ ')) {
                totalSaidas += valor; 
            } else {
                totalEntradas += valor;
            }
        }
    });

    const totalGeral = totalEntradas - totalSaidas; 

    document.getElementById('totalEntradas').innerText = `R$ ${totalEntradas.toFixed(2).replace('.', ',')}`;
    document.getElementById('totalSaidas').innerText = `-R$ ${totalSaidas.toFixed(2).replace('.', ',')}`;
    document.getElementById('totalGeral').innerText = `R$ ${totalGeral.toFixed(2).replace('.', ',')}`;

    const cardTotal = document.querySelector('.finance-summary .card:nth-child(3)');
    if (totalGeral < 0) {
        cardTotal.classList.add('total-negative');
        cardTotal.classList.remove('total-positive');
    } else {
        cardTotal.classList.add('total-positive');
        cardTotal.classList.remove('total-negative');
    }
}

document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valorText = document.getElementById('valor').value;
    const valor = parseFloat(valorText.replace(',', '.'));
    const tipo = document.getElementById('tipo').value;
    const data = new Date().toLocaleDateString('pt-BR');

    if (!isNaN(valor) && valor !== null && valor !== '' && valor !== 0) {
        const row = editingRow || document.createElement('tr');
        row.innerHTML = `
            <td>${descricao}</td>
            <td>${tipo === 'entrada' ? 'R$ ' : '-R$ '}${Math.abs(valor).toFixed(2).replace('.', ',')}</td>
            <td>${data}</td>
            <td><button class="edit">Editar</button> <button class="delete">Excluir</button></td>
        `;

        if (!editingRow) {
            document.querySelector('#transactionsTable tbody').appendChild(row);
        }

       
        document.getElementById('transactionForm').reset();
        editingRow = null;

        updateSummary();
    } else {
        alert('Por favor, insira um valor válido.');
    }
});


document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const descricao = row.children[0].innerText;
        const valorText = row.children[1].innerText.replace('R$ ', '').replace('-', '').replace(',', '.');
        const valor = parseFloat(valorText);
        const tipo = row.children[1].innerText.startsWith('-R$ ') ? 'saida' : 'entrada';

     
        document.getElementById('descricao').value = descricao;
        document.getElementById('valor').value = valor.toFixed(2).replace('.', ',');
        document.getElementById('tipo').value = tipo;

      
        editingRow = row;
    } else if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
        updateSummary();
    }
});

updateSummary();

var modal = document.getElementById("transactionsModal");


var btn = document.getElementById("financeSummary");


var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    modal.style.display = "block";
}

span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}



var modal = document.getElementById("transactionsModal");
var btn = document.getElementById("financeSummary");
var span = document.getElementsByClassName("close")[0];
var statusMessage = document.getElementById("statusMessage");


function showStatus(messageType) {
    let message;
    let type;

    switch (messageType) {
        case 'transactionAdded':
            message = 'Transação feita com sucesso!';
            type = 'success';
            break;
        case 'transactionRemoved':
            message = 'Transação removida com sucesso!';
            type = 'success';
            break;
        default:
            message = 'Operação desconhecida.';
            type = 'error';
    }

    statusMessage.innerText = message;
    statusMessage.className = 'status-message ' + type; 
    statusMessage.style.display = 'block';
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 3000); 
}

btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var modal = document.getElementById("transactionsModal");
var btn = document.getElementById("financeSummary");
var span = document.getElementsByClassName("close")[0];
var statusMessage = document.getElementById("statusMessage");
var statusText = document.getElementById("statusText");


function showStatus(messageType) {
    let message;
    let type;

    switch (messageType) {
        case 'transactionAdded':
            message = 'Transação feita com sucesso!';
            type = 'success';
            break;
        case 'transactionRemoved':
            message = 'Transação removida com sucesso!';
            type = 'success';
            break;
        default:
            message = 'Operação desconhecida.';
            type = 'error';
    }

    statusText.innerText = message;
    statusMessage.className = 'status-message ' + type; 
    statusMessage.style.display = 'block';
    setTimeout(() => {
        statusMessage.style.display = 'none';
    }, 3000); 
}


btn.onclick = function() {
    modal.style.display = "block";
}


span.onclick = function() {
    modal.style.display = "none";
}


window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


var transactionForm = document.getElementById("transactionForm");

transactionForm.onsubmit = function(event) {

    event.preventDefault();

    var descricao = document.getElementById("descricao").value;
    var valor = document.getElementById("valor").value;
    var tipo = document.getElementById("tipo").value;

    var newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td>${descricao}</td>
        <td>${valor}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td><button class="deleteBtn">Remover</button></td>
    `
}
