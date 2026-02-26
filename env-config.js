

// Busca a chave salva pelo testador. Se não existir, usa o ID padrão.
const ID_NXD  = localStorage.getItem('NGROK_ID_NXD');
const ID_AUCT = localStorage.getItem('NGROK_ID_AUCT');

// --- 2. CHAVE DE CONTROLE ---
// Alterne para 'false' para voltar ao localhost
const USE_NGROK = true; 

// --- 3. CONSTRUÇÃO DAS URLs ---
const NGROK_URL = (id) => `https://${id}.ngrok-free.app`;

export const ENV = {
    NXD_API: USE_NGROK ? NGROK_URL(ID_NXD) : "http://127.0.0.1:8080",
    AUCTORITAS_API: USE_NGROK ? NGROK_URL(ID_AUCT) : "http://127.0.0.1:8085",
};