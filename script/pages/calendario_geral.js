// 0. BLOQUEIO VISUAL IMEDIATO: Impede o degradê de aparecer antes do CSS carregar
if (new URLSearchParams(window.location.search).get('modal') === 'true') {
    document.documentElement.style.background = 'white';
    document.body.style.background = 'white';
    document.body.classList.add('modo-modal');
}


import { inicializarI18n } from "../components/utils/i18n/i18n-helper.js";

// 1. DICIONÁRIO DE INTERFACE ESTÁTICA (Textos que não são Web Components)
const dicionarioConta = {

    pt: {
        lbl_titulo              : "Calendário Geral",
        
        lbl_voltarBtn           : "Voltar",
        lbl_cadastrarBtn        : "Salvar"        
    },
    
    es: {
        lbl_titulo              : "Calendario general",
        
        lbl_voltarBtn           : "Para volver atrás",
        lbl_cadastrarBtn        : "Ahorrar"
    }
};

const seletoresConta = [
    'data-geral-field'
       
];

document.addEventListener('DOMContentLoaded', () => {   
    inicializarI18n(dicionarioConta);

    const params = new URLSearchParams(window.location.search);
    
    // Captura a data e preenche o campo
    const dataClicada = params.get('data');
    if (dataClicada) {
        // Aguarda um milisegundo para garantir que o Web Component foi renderizado
        setTimeout(() => {
            const campoData = document.getElementById('data_geral');
            
            //if (campoData) campoData.value = dataClicada;

            // Em vez de: campoData.value = dataClicada;
            // Tente acessar o input interno (exemplo):
            const inputInterno = campoData.shadowRoot ? campoData.shadowRoot.querySelector('input') : campoData.querySelector('input');
            if (inputInterno) inputInterno.value = dataClicada;


        }, 50);
    }

    // Lógica do botão Voltar
    const btnVoltar = document.getElementById('voltarBtn');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            if (window.parent && window.parent.Swal) {
                window.parent.Swal.close();
            }
        });
    }

});

// Detecta e aplica o modo modal IMEDIATAMENTE (antes do DOMContentLoaded se possível)
if (new URLSearchParams(window.location.search).get('modal') === 'true') {
    document.body.classList.add('modo-modal');
}

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    
    // Captura a data e preenche o campo
    const dataClicada = params.get('data');
    if (dataClicada) {
        const campoData = document.getElementById('data_geral');
        
        //if (campoData) campoData.value = dataClicada;

        // Em vez de: campoData.value = dataClicada;
        // Tente acessar o input interno (exemplo):
        const inputInterno = campoData.shadowRoot ? campoData.shadowRoot.querySelector('input') : campoData.querySelector('input');
        if (inputInterno) inputInterno.value = dataClicada;

    }

    // Lógica do botão Voltar
    const btnVoltar = document.getElementById('voltarBtn');
    if (btnVoltar) {
        btnVoltar.addEventListener('click', () => {
            if (window.parent && window.parent.Swal) {
                window.parent.Swal.close();
            }
        });
    }
});