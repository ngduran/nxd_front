import { executarOperacao } from "../core/api-engine.js";
import { Mensagem } from "../utils/mensageiro.js";
import { cadastrarUsuario } from "../services/api_service.js";
import { capturarDadosFormulario, navegarPara, simplificarDados, validarFormulario } from "../utils/form-helper.js";
import { inicializarI18n } from "../components/utils/i18n/i18n-helper.js";
import { getContexto } from "../core/theme-engine.js";
import { SessionManager } from "../utils/session-manager.js";
import { LocalManager } from "../utils/local-manager.js";

// 1. DICIONÁRIO DE INTERFACE ESTÁTICA (Textos que não são Web Components)
const dicionarioConta = {

    pt: {
        lbl_titulo              : "Autenticador de Testes",  
        lbl_cadastrarBtn        : "Salvar"        
    },
    
    es: {
        lbl_titulo              : "Autenticador de pruebas",       
        lbl_cadastrarBtn        : "Ahorrar"
    }
};

const seletorsChave = [
    'chave-ngrok-field',
    'chave-auct-field'
];

document.addEventListener('DOMContentLoaded', () => {
    // Uma única linha inicializa tudo!
    inicializarI18n(dicionarioConta);
});


// ======================================================================================
// 8. BOTÃO ADICIONAR (EVENTO)
// ======================================================================================
document.getElementById('cadastrarBtn').addEventListener('click', executarTarefasSalvar );

// ======================================================================================
// 9. ORQUESTRADOR DAS TAREFAS DO BOTÃO ADICIONAR
// ======================================================================================
async function executarTarefasSalvar() {

    // Passo 1: Validar os Web Components
    if (!validarFormulario(seletorsChave)) {
        await Mensagem.erro("Existem campos inválidos no formulário");
        return; // Para aqui se houver erro
    }

    // Passo 3: Capturar os dados (Passo isolado para o log que você pediu)
    const dadosChave = capturarDadosFormulario(seletorsChave);

    // 2. Transforma em um DTO simples que o Spring entende
    const dadosParaStorage = simplificarDados(dadosChave);

    try {
        // 1. Tenta salvar no LocalStorage
        LocalManager.salvar(LOCAL_KEY_NGROK, dadosParaStorage.chave_ngrok);
        LocalManager.salvar(LOCAL_KEY_AUCT,  dadosParaStorage.chave_auct);

        // 2. Se chegou aqui, deu certo (usando o padrão do seu sistema)
        await Mensagem.sucesso("Configurações salvas!", "As chaves foram atualizadas corretamente.");

    } catch (erro) {
        // 3. Caso ocorra qualquer erro (ex: storage cheio ou falha no LocalManager)
        console.error("Falha ao salvar chaves:", erro);
        await Mensagem.erro("Erro ao salvar", "Não foi possível gravar as chaves.");
    }
    
}