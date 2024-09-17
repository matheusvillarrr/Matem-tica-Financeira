// Função para atualizar o valor do prazo
function atualizarPrazo(valor) {
    document.getElementById('prazo-meses').textContent = valor + ' meses';
}

// Função para calcular o financiamento
function calcular() {
    // Captura os valores dos campos
    const valor = parseFloat(document.getElementById('valor').value);
    const prazo = parseInt(document.getElementById('prazo').value);
    const taxaAnual = parseFloat(document.getElementById('taxa').value) / 100;
    
    if (isNaN(valor) || isNaN(prazo) || isNaN(taxaAnual)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Convertendo taxa anual para mensal
    const taxaMensal = Math.pow(1 + taxaAnual, 1 / 12) - 1;
    
    // Cálculo do valor da parcela usando a fórmula de financiamento
    const valorParcela = (valor * taxaMensal) / (1 - Math.pow(1 + taxaMensal, -prazo));

    // Custo total do crédito
    const custoTotal = valorParcela * prazo;
    const totalJuros = custoTotal - valor;

    // Exibir resultados
    document.getElementById('valorParcela').textContent = `Valor da Parcela: R$ ${valorParcela.toFixed(2)}`;
    document.getElementById('custoCredito').textContent = `Custo Total do Crédito: R$ ${custoTotal.toFixed(2)}`;
    document.getElementById('jurosPagos').textContent = `Total de Juros Pagos: R$ ${totalJuros.toFixed(2)}`;

    // Mostrar a seção de resultados
    document.getElementById('resultados').classList.remove('hidden');

    // Gerar gráfico de saldo devedor
    gerarGrafico(valor, prazo, valorParcela, taxaMensal);
}

// Função para gerar o gráfico de amortização
function gerarGrafico(valorInicial, prazo, valorParcela, taxaMensal) {
    const ctx = document.getElementById('grafico').getContext('2d');
    let saldoDevedor = valorInicial;
    const dadosSaldo = [];

    for (let i = 0; i < prazo; i++) {
        saldoDevedor = saldoDevedor * (1 + taxaMensal) - valorParcela;
        dadosSaldo.push(saldoDevedor > 0 ? saldoDevedor : 0);
    }

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array.from({ length: prazo }, (_, i) => `Mês ${i + 1}`),
            datasets: [{
                label: 'Saldo Devedor',
                data: dadosSaldo,
                borderColor: '#36a2eb',
                fill: false,
                tension: 0.1
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
