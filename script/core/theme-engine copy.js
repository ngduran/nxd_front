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

    // Identifica o contexto pela URL
    let contexto = path.includes('pastoral') ? 'pastoral' : 'professor';

    // Aplica as cores da paleta escolhida no :root
    const cores = paletas[contexto];
    for (const [variavel, valor] of Object.entries(cores)) {
        //root.style.setProperty(variavel, valor);
        document.documentElement.style.setProperty(variavel, valor, 'important');
    }

    console.log(`Paleta aplicada: ${contexto}`);

    console.log(`Configuração salva para: ${contexto}. Redirecionando...`);

    //window.location.href = "../page/home.html";

    // 3. REDIRECIONA: Ajuste o caminho conforme sua pasta
    // Se a home.html estiver em /nxd_front/page/home.html:
    // setTimeout(() => {
    //     window.location.href = "../page/home.html";
    // }, 500); // Pequeno delay para garantir que o log seja visto no teste
   

    // Redirecionamento condicional simples:
    // Se a URL termina com a pasta (entrada), vai para a home.
    // Se já estiver na home.html ou qualquer outra página, não faz nada.
    // 3. A TRAVA: Só redireciona se o arquivo NÃO for 'home.html'
    // Se a URL contiver 'home.html', o script para aqui e apenas mantém as cores.
    if (!path.includes('home.html')) {
        console.log("Redirecionando para a home...");
        window.location.href = "../page/home.html";
    } else {
        console.log("Permanecendo na home com a paleta aplicada.");
    }
    
});