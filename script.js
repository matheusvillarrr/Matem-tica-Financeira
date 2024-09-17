document.addEventListener('DOMContentLoaded', () => {
    let editingRow = null;
    let rowToDelete = null;

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
            } else {
                editingRow.replaceWith(row);
            }

            document.getElementById('transactionForm').reset();
            editingRow = null;

            Swal.fire({
                title: 'Aprovado!',
                text: 'Transação feita com sucesso!',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            document.getElementById('transactionsModal').style.display = 'none'; // Close the modal after submission
            updateSummary();
        } else {
            Swal.fire({
                title: 'Erro!',
                text: 'Por favor, insira um valor válido.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
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

            // Open modal for editing
            document.getElementById('transactionsModal').style.display = 'block';
        } else if (event.target.classList.contains('delete')) {
            rowToDelete = event.target.closest('tr');

            Swal.fire({
                title: 'Confirmação',
                text: 'Quer remover essa transação?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Sim',
                cancelButtonText: 'Não'
            }).then((result) => {
                if (result.isConfirmed) {
                    if (rowToDelete) {
                        rowToDelete.remove();
                        updateSummary();
                        Swal.fire({
                            title: 'Removido!',
                            text: 'Transação removida com sucesso!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });
                        rowToDelete = null;
                    }
                }
            });
        }
    });

    const modal = document.getElementById("transactionsModal");
    const btn = document.getElementById("financeSummary");
    const span = document.getElementsByClassName("close")[0];

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

    updateSummary();
});
