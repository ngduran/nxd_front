/**
 * Gerenciador dinâmico de persistência em sessão.
 * Centraliza todas as operações de leitura e escrita no navegador.
 */
export const LocalManager = {
   
    salvar(chave, valor) {
        if (!valor) {
            console.warn(`[Session] Tentativa de salvar valor vazio para a chave: ${chave}`);
            return;
        }
        localStorage.setItem(chave, valor);
        console.log(`[Session] Salvo/Alterado: ${chave} = ${valor}`);
    },

    consultar(chave) {
        const valor = locaStorage.getItem(chave);
        if (!valor) {
            console.info(`[Session] Nenhuma informação encontrada para a chave: ${chave}`);
        }
        return valor;
    },
    
    excluir(chave) {
        if (localStorage.getItem(chave)) {
            localStorage.removeItem(chave);
            console.log(`[Session] Item removido: ${chave}`);
        }
    },
   
    excluirTodos() {
        localStorage.clear();
        console.warn("[Session] Toda a sessão foi limpa (Logout/Reset).");
    }
};