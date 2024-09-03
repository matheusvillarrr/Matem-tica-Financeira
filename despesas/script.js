// Variable to keep track of the row being edited
let editingRow = null;

// Function to update the summary based on transactions
function updateSummary() {
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    let totalEntradas = 0;
    let totalSaidas = 0;

    rows.forEach(row => {
        const valorText = row.children[1].innerText.replace('R$ ', '').replace('-', '').replace(',', '.');
        const valor = parseFloat(valorText);
        if (!isNaN(valor)) {
            if (row.children[1].innerText.startsWith('-R$ ')) {
                totalSaidas += valor; // add negative values as positive to totalSaidas
            } else {
                totalEntradas += valor;
            }
        }
    });

    const totalGeral = totalEntradas - totalSaidas; // correct calculation for total geral

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

// Function to handle form submission
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

        // Reset form fields and editing state
        document.getElementById('transactionForm').reset();
        editingRow = null;

        updateSummary();
    } else {
        alert('Por favor, insira um valor válido.');
    }
});

// Handle click events for edit and delete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        const row = event.target.closest('tr');
        const descricao = row.children[0].innerText;
        const valorText = row.children[1].innerText.replace('R$ ', '').replace('-', '').replace(',', '.');
        const valor = parseFloat(valorText);
        const tipo = row.children[1].innerText.startsWith('-R$ ') ? 'saida' : 'entrada';

        // Fill form with row data
        document.getElementById('descricao').value = descricao;
        document.getElementById('valor').value = valor.toFixed(2).replace('.', ',');
        document.getElementById('tipo').value = tipo;

        // Set the row to be edited
        editingRow = row;
    } else if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
        updateSummary();
    }
});

// Initialize the summary
updateSummary();
