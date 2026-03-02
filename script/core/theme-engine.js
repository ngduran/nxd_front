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
            pastoral: ["Login", "Pessoa", "Cúria", "Paróquia", "Voluntário", "Chave Testes"] // Itens que o Professor NÃO vê
        },

        assets: {
            proftime: {
                favicon: '../assets/img/proftime-favicon.ico',
                logo: '../assets/img/proftime-logo.png'
            },
            pastoral: {
                favicon: '../asset/icon/pastoral-favicon.ico',
                // logo: '../asset/image/pastoral-logo.jpeg'
                logo: '../asset/image/pastoral-logo-transparente.png'
                // logo: '../asset/image/pastoral-logo-1-transparente.png'
            }
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

    const aplicarAssets = (contexto) => {
        const assets = CONFIG.assets[contexto];

        // --- 1. Gerenciar Favicon (Documento Atual e Topo) ---
        const atualizarFavicon = (doc) => {
            let link = doc.querySelector("link[rel*='icon']");
            if (!link) {
                link = doc.createElement('link');
                link.rel = 'shortcut icon';
                doc.head.appendChild(link);
            }
            link.href = assets.favicon;
        };

        atualizarFavicon(document);
        if (window.self !== window.top) {
            try { atualizarFavicon(window.top.document); } catch (e) { /* Cross-origin security */ }
        }

        // --- 2. Gerenciar Logo no Sidebar (Sempre no Topo) ---
        // Tentamos buscar a logo no documento principal (onde está o sidebar)
        const docPrincipal = (window.self !== window.top) ? window.top.document : document;
        
        // Seletores comuns para sidebars (ajuste conforme seu HTML real)
        const imgLogo = docPrincipal.querySelector('.sidebar-header img') || 
                    docPrincipal.querySelector('.logo-img') || 
                    docPrincipal.querySelector('#logo-sidebar');

        console.log(`Contexto: ${contexto} | Buscando logo em:`, docPrincipal.location.pathname);
        
        if (imgLogo) {
            imgLogo.src = assets.logo;
            imgLogo.alt = `Logo ${CONFIG.labels[contexto]}`;
            console.log("✅ Logo atualizada com sucesso!");
        } else {
            console.error("❌ Elemento de logo não encontrado. Verifique se a tag <img> possui a classe 'logo-img' ou está dentro de 'sidebar-header'.");
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
    aplicarAssets(contexto); // <--- Adicione esta linha
    tratarMenu(contexto); // Nova função para tratar os itens
    gerenciarRedirecionamento();
});