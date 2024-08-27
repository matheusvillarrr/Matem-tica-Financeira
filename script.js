// script.js

// Function to update the summary based on transactions
function updateSummary() {
    const rows = document.querySelectorAll('#transactionsTable tbody tr');
    let totalEntradas = 0;
    let totalSaidas = 0;

    rows.forEach(row => {
        const valor = parseFloat(row.children[1].innerText.replace('R$ ', '').replace(',', '.'));
        if (valor >= 0) {
            totalEntradas += valor;
        } else {
            totalSaidas += valor;
        }
    });

    document.getElementById('totalEntradas').innerText = `R$ ${totalEntradas.toFixed(2).replace('.', ',')}`;
    document.getElementById('totalSaidas').innerText = `-R$ ${Math.abs(totalSaidas).toFixed(2).replace('.', ',')}`;
    document.getElementById('totalGeral').innerText = `R$ ${(totalEntradas + totalSaidas).toFixed(2).replace('.', ',')}`;
}

// Add a new transaction
document.getElementById('transactionForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const tipo = document.getElementById('tipo').value;
    const data = new Date().toLocaleDateString('pt-BR');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${descricao}</td>
        <td>${tipo === 'entrada' ? 'R$ ' : '-R$ '}${Math.abs(valor).toFixed(2).replace('.', ',')}</td>
        <td>${data}</td>
        <td><button class="edit">Editar</button> <button class="delete">Excluir</button></td>
    `;
    document.querySelector('#transactionsTable tbody').appendChild(row);

    // Reset form fields
    document.getElementById('transactionForm').reset();

    updateSummary();
});

// Handle edit and delete actions
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('edit')) {
        alert('Editar funcionalidade não implementada');
    } else if (event.target.classList.contains('delete')) {
        const row = event.target.closest('tr');
        row.remove();
        updateSummary();
    }
});

// Initialize the summary
updateSummary();

