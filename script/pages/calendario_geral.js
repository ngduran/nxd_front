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
});
