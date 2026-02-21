window.addEventListener('load', () => {
    const path = window.location.pathname;
    const root = document.documentElement;

    // Definição das paletas em objetos JS (Fácil de manter)
    const paletas = {
        professor: {
            '--color-primary'        : '#1748AF',
            '--color-accent'         : '#ffc346',
            '--color-border'         : '#BCBDC1',
            '--color-background-soft': '#E0E4FD',
            '--color-text-dark'      : '#2E2F33',
            '--color-card-bg'        : '#FFFFFF',
            '--color-input-bg'       : '#FFFFFF',
            '--color-cell-key'       : '#8ec1f3'
        },
        pastoral: {
            '--color-primary'        : '#6D2E46',
            '--color-accent'         : '#A3B18A',
            '--color-border'         : '#D8CFC4',
            '--color-background-soft': '#F5EFE6',
            '--color-text-dark'      : '#2B2B2B',
            '--color-card-bg'        : '#FFFFFF',
            '--color-input-bg'       : '#FFFFFF',
            '--color-cell-key'       : '#C9ADA7'
        }
    };

    // Verifica se a URL atual OU a página anterior (referrer) contém 'pastoral'
    let contexto = (path.includes('pastoral') || document.referrer.includes('pastoral')) ? 'pastoral' : 'professor';
    const cores = paletas[contexto];

    let estiloDinamico = ":root {";

        for (const [variavel, valor] of Object.entries(cores)) {
            estiloDinamico += `${variavel}: ${valor} !important; `;
        }

    estiloDinamico += "}";

    // Cria uma tag <style> e coloca no head do documento
    const styleTag = document.createElement('style');
    styleTag.innerHTML = estiloDinamico;
    document.head.appendChild(styleTag);

    console.log(`Paleta aplicada: ${contexto}`);

    console.log(`Configuração salva para: ${contexto}. Redirecionando...`);

    
    // 3. A TRAVA: Só redireciona se o arquivo NÃO for 'home.html'
    // Se a URL contiver 'home.html', o script para aqui e apenas mantém as cores.
    // if (!path.includes('home.html')) {
    //     console.log("Redirecionando para a home...");
    //     window.location.href = "../page/home.html";
    // } else {
    //     console.log("Permanecendo na home com a paleta aplicada.");
    // }


    // --- LÓGICA DE REDIRECIONAMENTO COM NOVOS IDENTIFICADORES ---
    
    // Verifica se o script está rodando dentro de um iframe
    const isIframe = window.self !== window.top;
    
    // Verifica se a página atual é a home.html
    const isHome = path.includes('home.html');

    // Só redireciona se NÃO estiver em um iframe E NÃO estiver na home
    if (!isIframe && !isHome) {
        console.log(`Página de entrada [${contexto}] detectada. Redirecionando para Home...`);
        window.location.href = "../page/home.html";
    } else {
        console.log(`Contexto [${contexto}] aplicado. Sem redirecionamento (isIframe: ${isIframe}, isHome: ${isHome})`);
    }


    // 1. Dicionário de Textos
    const labels = {
        professor: "Prof Time",
        pastoral: "Pastoral"
    };

    const tituloDinamico = labels[contexto];

    // 2. Atualiza o <title> (Aba do navegador)
    document.title = `${tituloDinamico} - Sistema`;

    // 3. Atualiza o <span class="logo-text"> (Header Mobile)
    const spanLogo = document.querySelector('.logo-text');
    if (spanLogo) {
        spanLogo.textContent = tituloDinamico;
    }

    // 4. Atualiza o <h2> (Sidebar Desktop)
    const h2Logo = document.querySelector('.sidebar-header h2');
    if (h2Logo) {
        h2Logo.textContent = tituloDinamico;
    }
    
});