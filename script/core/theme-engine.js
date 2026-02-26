export const getContexto = () => {
    const path = window.location.pathname;
    const isIframe = window.self !== window.top;
    const referrerEfetivo = isIframe ? window.top.document.referrer : document.referrer;

    const isPastoralPath = path.includes('pastoral');
    const isPastoralReferrer = referrerEfetivo.includes('pastoral');

    return (isPastoralPath || isPastoralReferrer) ? 'pastoral' : 'proftime';
};

export const gerenciarRedirecionamento = () => {
    const path = window.location.pathname;
    const isIframe = window.self !== window.top;
    const isHome = path.includes('home.html');

    if (!isIframe && !isHome) {
        window.location.href = "../page/home.html";
    } 
};

window.addEventListener('load', () => {
    const CONFIG = {
        paletas: {
            proftime: {
                '--color-primary': '#1748AF',
                '--color-accent': '#ffc346',
                '--color-border': '#BCBDC1',
                '--color-background-soft': '#E0E4FD',
                '--color-text-dark': '#2E2F33',
                '--color-card-bg': '#FFFFFF',
                '--color-input-bg': '#FFFFFF',
                '--color-cell-key': '#8ec1f3'
            },
            pastoral: {
                '--color-primary': '#6D2E46',
                '--color-accent': '#A3B18A',
                '--color-border': '#D8CFC4',
                '--color-background-soft': '#F5EFE6',
                '--color-text-dark': '#2B2B2B',
                '--color-card-bg': '#FFFFFF',
                '--color-input-bg': '#FFFFFF',
                '--color-cell-key': '#C9ADA7'
            }
        },
        labels: {
            proftime: "ProfTime",
            pastoral: "Pastoral"
        },

        // Mapeamento de itens para REMOVER do menu em cada contexto
        // O texto deve ser idêntico ao que está no HTML (case-sensitive)
        menuPermitido: {
            proftime : ["Login", "Minha Conta", "Instituição", "Horário", "Evento", "Calendário", "Planejamento", "Chave Testes"], // Itens que a Pastoral NÃO vê
            pastoral: ["Login", "Minha Conta", "Cúria", "Paróquia", "Voluntário", "Chave Testes"] // Itens que o Professor NÃO vê
        }
    };

    const tratarMenu = (contexto) => {
        const itensPermitidos = CONFIG.menuPermitido[contexto];  

        if (!itensPermitidos) {           
            return;
        }

        // Seleciona os links usando o seletor corrigido para o seu HTML
        const linksMenu = document.querySelectorAll('.nav-links a');
       
        linksMenu.forEach((link) => {
            const textoItem = link.innerText.trim();
            
            // Verifica se o texto do item NÃO está na lista de permitidos
            const deveRemover = !itensPermitidos.includes(textoItem);

            if (deveRemover) {
                const liContainer = link.closest('li');
                if (liContainer) {
                    liContainer.remove();                   
                }
            } 
        });
       
    };


    const aplicarCores = (contexto) => {
        const cores = CONFIG.paletas[contexto];
        let estiloDinamico = ":root {";
        for (const [variavel, valor] of Object.entries(cores)) {
            estiloDinamico += `${variavel}: ${valor} !important; `;
        }
        estiloDinamico += "}";

        const styleTag = document.createElement('style');
        styleTag.innerHTML = estiloDinamico;
        document.head.appendChild(styleTag);
    };

    const aplicarIdentidadeVisual = (contexto) => {
        const tituloDinamico = CONFIG.labels[contexto];
        document.title = `${tituloDinamico} - Sistema`;

        const spanLogo = document.querySelector('.logo-text');
        if (spanLogo) {
            spanLogo.textContent = tituloDinamico;
        }

        const h2Logo = document.querySelector('.sidebar-header h2');
        if (h2Logo) {
            h2Logo.textContent = tituloDinamico;
        }
    };

    // const gerenciarRedirecionamento = () => {
    //     const path = window.location.pathname;
    //     const isIframe = window.self !== window.top;
    //     const isHome = path.includes('home.html');

    //     if (!isIframe && !isHome) {
    //         window.location.href = "../page/home.html";
    //     }
    // };

    // Execução da lógica organizada
    const contexto = getContexto();
    aplicarCores(contexto);
    aplicarIdentidadeVisual(contexto);
    tratarMenu(contexto); // Nova função para tratar os itens
    gerenciarRedirecionamento();
});