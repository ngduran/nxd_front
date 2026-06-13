



// 1. DICIONÁRIO DE INTERFACE ESTÁTICA (Textos que não são Web Components)
const dicionarioCargo = {

    pt: {
        lbl_titulo              : "Painel de Cargos",        
        lbl_voltarBtn           : "Voltar",
        lbl_cadastrarBtn        : "Salvar"        
    },
    
    es: {
        lbl_titulo              : "Job Panel",       
        lbl_voltarBtn           : "Para volver atrás",
        lbl_cadastrarBtn        : "Ahorrar"
    }
};


// =========================================================================
// 3. FUNÇÕES AUXILIARES (FORA DO DOMCONTENTLOADED)
// =========================================================================
function traduzirInterfaceEstatica(lang) {
    const elementos = document.querySelectorAll('[data-translate]');
    elementos.forEach(el => {
        const chave = el.getAttribute('data-translate');
        // Verifica se a chave existe no dicionário para não apagar o texto por erro
        if (dicionarioCargo[lang] && dicionarioCargo[lang][chave]) {
            el.innerText = dicionarioCargo[lang][chave];
        }
    });
}

// ======================================================================================
// 4. EVENTOS GLOBAIS - ESCUTA O EVENTO GLOBAL PARA TRADUZIR O QUE FOR ESTÁTICO NA PÁGINA
// ======================================================================================
window.addEventListener('languageChanged', (e) => {
    const lang = e.detail?.Language || e.detail?.language || e.detail;
    traduzirInterfaceEstatica(lang);
});

// ======================================================================================
// 5. INICIALIZAÇÃO E CONTROLE DE UI
// ======================================================================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. GARANTIR IDIOMA PADRÃO NO STORAGE    
    if (!sessionStorage.getItem('official_language')) {
        sessionStorage.setItem('official_language', 'pt');      
    }
    
    // 4.3 FUNÇÃO DE TROCA DE IDIOMA DO SISTEMA
    const trocarIdiomaSistema = (lang) => {
        // 1. Salva para persistência (O Base_Field lê daqui no translate)
        sessionStorage.setItem('official_language', lang);       

        // 2. Dispara o evento para os Web Components reagirem
        window.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { language: lang }
        }));       
    };

    // 4.4 OUVINTES DOS BOTÕES DE BANDEIRA
    document.getElementById('btn-pt')?.addEventListener('click', () => trocarIdiomaSistema('pt'));
    document.getElementById('btn-es')?.addEventListener('click', () => trocarIdiomaSistema('es'));

});