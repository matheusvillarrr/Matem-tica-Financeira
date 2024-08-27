function calcular() {
    const valorTotal = parseFloat(document.getElementById('valorTotal').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaJurosAnual = parseFloat(document.getElementById('taxaJuros').value);
    const taxaJurosMensal = (Math.pow(1 + (taxaJurosAnual / 100), 1 / 12) - 1);

    const valorParcela = (valorTotal * taxaJurosMensal) / (1 - Math.pow(1 + taxaJurosMensal, -prazo));
    const custoTotalCredito = valorParcela * prazo;
    const totalJurosPagos = custoTotalCredito - valorTotal;

    document.getElementById('valorParcela').innerText = `Valor da Parcela: R$ ${valorParcela.toFixed(2)}`;
    document.getElementById('custoTotalCredito').innerText = `Custo Total do Crédito: R$ ${custoTotalCredito.toFixed(2)}`;
    document.getElementById('totalJurosPagos').innerText = `Total de Juros Pagos: R$ ${totalJurosPagos.toFixed(2)}`;

    desenharGrafico(valorTotal, custoTotalCredito, prazo);
}

function desenharGrafico(valorTotal, custoTotalCredito, prazo) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const saldoDevedor = [];
    let saldoAtual = custoTotalCredito;
    for (let i = 0; i <= prazo; i++) {
        saldoDevedor.push(saldoAtual);
        saldoAtual -= custoTotalCredito / prazo;
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: prazo + 1 }, (_, i) => `Mês ${i}`),
            datasets: [{
                label: 'Saldo Devedor',
                data: saldoDevedor,
                borderColor: 'rgba(0, 99, 132, 1)',
                fill: false
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}
