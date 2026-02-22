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

            // Adicionamos a data completa em um atributo data-date para facilitar a leitura depois
            const dataFormatada = `${2026}-${String(mes + 1).padStart(2, '0')}-${String(data.getDate()).padStart(2, '0')}`;
            html += `<td class="day" data-full-date="${dataFormatada}">${data.getDate()}</td>`;
            
            // html += `<td class="day">${data.getDate()}</td>`;
            
            if (data.getDay() === 6) {
                html += '</tr>';
            }
            data.setDate(data.getDate() + 1);
        }

        html += '</tbody></table></div>';
        container.innerHTML += html;
    }

    // Após gerar o HTML, adicionamos os eventos de clique
    adicionarEventosClique();
}

gerarCalendario();


function adicionarEventosClique() {
    const dias = document.querySelectorAll('.day');
    dias.forEach(dia => {
        dia.addEventListener('click', (e) => {
            const dataSelecionada = e.target.getAttribute('data-full-date');
            abrirFormularioGeral(dataSelecionada);
        });
    });
}

function abrirFormularioGeral(data) {
    Swal.fire({
        // Removemos o spinner manual para evitar que a tela fique branca se o JS travar
        html: `
            <iframe src="calendario_geral.html?data=${data}&modal=true" 
                    id="iframe-modal"
                    style="width:100%; height:580px; border:none; background: #ffffff;" 
                    scrolling="no">
            </iframe>`,
        showConfirmButton: false,
        width: '400px',
        padding: '0',
        background: '#ffffff', 
        //borderRadius: '15px',
        showCloseButton: true,
        didOpen: () => {
            // O SweetAlert já abre um fundo branco sólido. 
            // O iframe carregará por cima. Como o CSS do 'calendario_geral.css' 
            // já força background: white, você não verá mais o degradê.
            
            const iframe = document.getElementById('iframe-modal');
            
            // Caso queira uma transição mínima apenas quando estiver pronto:
            iframe.style.opacity = '0';
            iframe.onload = () => {
                iframe.style.transition = 'opacity 0.3s ease';
                iframe.style.opacity = '1';
            };
        }
    });
}