export const getContexto = () => {
    const path = window.location.pathname;
    const isIframe = window.self !== window.top;
    const referrerEfetivo = isIframe ? window.top.document.referrer : document.referrer;

    const isPastoralPath = path.includes('pastoral');
    const isPastoralReferrer = referrerEfetivo.includes('pastoral');

    return (isPastoralPath || isPastoralReferrer) ? 'pastoral' : 'proftime';
};

/**
 * Captura o token de convite da URL, caso exista.
 * @returns {string|null} O token encontrado ou null.
 */
export const getToken = () => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token'); // Retorna o valor ou null automaticamente
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

        // 2. NOVA LOGA: FILTRO POR PERFIL (Baseado na Role do Backend)
        // Aqui listamos explicitamente quais itens EXTRAS cada perfil tem direito de ver.
        menuPorPerfil: {
            'ROLE_ADMIN': ["Convite", "Configurações Globais", "Chave Testes"], 
            'ROLE_MEMBRO': ["Meus Dados", "Minhas Atividades"],
            'ROLE_PROFESSOR': ["Minhas Turmas", "Diário de Classe"],
            'ROLE_USUARIO': [] // Perfil básico inicial, não ganha itens extras por padrão
        },

        assets: {
            proftime: {
                favicon: '../asset/icon/favicon_sem_fundo_2_proftime.ico',
                logo: '../asset/image/logo_sem_fundo_2_proftime.png'
            },
            pastoral: {
                favicon: '../asset/icon/pastoral-favicon.ico',
                // logo: '../asset/image/pastoral-logo.jpeg'
                logo: '../asset/image/pastoral-logo-transparente.png'
                // logo: '../asset/image/pastoral-logo-1-transparente.png'
            }
        }

    };

    const tratarMenuContexto = (contexto) => {        
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

    // NOVA FUNÇÃO: Remove itens restritos se o usuário não tiver o perfil correto
    const tratarMenuPorPerfil = () => {
        // Recupera o perfil salvo no localStorage após o login (Ex: 'ROLE_ADMIN')
        // Se não houver nada, tratamos como string vazia ou perfil básico 'ROLE_USUARIO'
        const perfilUsuario = localStorage.getItem('user_role') || 'ROLE_USUARIO';

        // Descobre quais itens são liberados especificamente para esse perfil
        const itensLiberadosPeloPerfil = CONFIG.menuPorPerfil[perfilUsuario] || [];

        // Mapeia TODOS os itens que exigem alguma permissão especial
        // (Basicamente junta todos os arrays de 'menuPorPerfil' para saber o que é protegido)
        const todosItensProtegidos = Object.values(CONFIG.menuPorPerfil).flat();

        const linksMenu = document.querySelectorAll('.nav-links a');

        linksMenu.forEach((link) => {
            const textoItem = link.innerText.trim();

            // Se o item do menu é um item protegido/restrito...
            if (todosItensProtegidos.includes(textoItem)) {
                // ...mas o perfil atual do usuário NÃO tem essa liberação, removemos o item.
                if (!itensLiberadosPeloPerfil.includes(textoItem)) {
                    const liContainer = link.closest('li');
                    if (liContainer) {
                        liContainer.remove();
                    }
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
    
    tratarMenuContexto(contexto); // 1º Aplica o filtro de escopo (Pastoral ou ProfTime)
    tratarMenuPorPerfil();        // 2º Aplica o filtro fino de permissões do usuário logado

    gerenciarRedirecionamento();
});