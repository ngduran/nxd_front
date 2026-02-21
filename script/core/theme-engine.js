window.addEventListener('load', () => {
    const CONFIG = {
        paletas: {
            professor: {
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
            professor: "Prof Time",
            pastoral: "Pastoral"
        }
    };

    const getContexto = () => {
        const path = window.location.pathname;
        const isIframe = window.self !== window.top;
        const referrerEfetivo = isIframe ? window.top.document.referrer : document.referrer;

        const isPastoralPath = path.includes('pastoral');
        const isPastoralReferrer = referrerEfetivo.includes('pastoral');

        return (isPastoralPath || isPastoralReferrer) ? 'pastoral' : 'professor';
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

    const gerenciarRedirecionamento = () => {
        const path = window.location.pathname;
        const isIframe = window.self !== window.top;
        const isHome = path.includes('home.html');

        if (!isIframe && !isHome) {
            window.location.href = "../page/home.html";
        }
    };

    // Execução da lógica organizada
    const contexto = getContexto();
    aplicarCores(contexto);
    aplicarIdentidadeVisual(contexto);
    gerenciarRedirecionamento();
});