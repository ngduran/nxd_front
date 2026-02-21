const meses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function gerarCalendario() {
    const container = document.getElementById('calendarContainer');
    
    for (let mes = 0; mes < 12; mes++) {
        const data = new Date(2026, mes, 1);
        let html = `
            <div class="month-card">
                <div class="month-name">${meses[mes]}</div>
                <table>
                    <thead>
                        <tr>${diasSemana.map(d => `<th>${d}</th>`).join('')}</tr>
                    </thead>
                    <tbody>
        `;

        // Espaços vazios até o primeiro dia da semana
        let diaSemanaInicial = data.getDay();
        html += '<tr>';
        for (let i = 0; i < diaSemanaInicial; i++) {
            html += '<td class="empty"></td>';
        }

        // Dias do mês
        while (data.getMonth() === mes) {
            if (data.getDay() === 0 && data.getDate() !== 1) {
                html += '<tr>';
            }
            
            html += `<td class="day">${data.getDate()}</td>`;
            
            if (data.getDay() === 6) {
                html += '</tr>';
            }
            data.setDate(data.getDate() + 1);
        }

        html += '</tbody></table></div>';
        container.innerHTML += html;
    }
}

gerarCalendario();