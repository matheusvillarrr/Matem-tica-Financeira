document.getElementById('simuladorForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const valorInicial = parseFloat(document.getElementById('valorInicial').value);
    const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;
    const dataInicio = new Date(document.getElementById('dataInicio').value);
    const anos = parseInt(document.getElementById('anos').value);

    const valores = [];
    const labels = [];

    for (let i = 1; i <= anos; i++) {
        const valorFinal = valorInicial * Math.pow(1 + taxaJuros, i);
        valores.push(valorFinal.toFixed(2));
        const anoAtual = dataInicio.getFullYear() + i;
        labels.push(anoAtual);
    }

    const ctx = document.getElementById('grafico').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Evolução do Valor (R$)',
                data: valores,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: false
                }
            }
        }
    });
});