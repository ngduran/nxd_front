import { Base_Field } from '../../base/Base_Field.js';

class Chave_Auct_Field extends Base_Field {
  
    static i18n = {
        pt: {
            lbl_chave_auct    : "Chave do Servidor de Segurança", 
            ph_chave_auct     : "Cole sua chave de teste aqui",
            tp_lbl_chave_auct : "Utilizado para acessar a aplicação em ambiente de testes",
           
            erro_1             : "A chave de teste é obrigatória",       
            erro_2             : "Formato da chave está inválida",       
            erro_3             : "Chave muito curta"
        },

        es: {
            lbl_chave_auct    : "Clave del servidor de seguridad", 
            ph_chave_auct     : "Pegue su clave de prueba aquí.",
            tp_lbl_chave_auct : "Se utiliza para acceder a la aplicación en un entorno de prueba.",
            erro_1            : "Se requiere la clave de prueba.",       
            erro_2            : "El formato de la clave no es válido.",    
            erro_2            : "Clave demasiado corta"    
        }
    };
  
    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();  
    }
   
    renderControl(p) {       
        return `<div class="campo">
                    <label class="field-label" for="${p.id}" data-translate ="${p.data_translate_label}">${p.label}</label>
                    <i class="${p.icon_question}" data-tooltip="${p.data_tooltip_balao}" data-translate ="${p.data_translate_tooltip}"></i>
                    <input type="text" id="${p.id}" name="${p.name}" class="field-input" data-translate ="${p.data_translate_ph}" placeholder="${p.placeholder}" 
                        autocomplete="off" ${p.is_required}>
                    </input>                    
                </div>
        `;        
    }

     /** @override */
    validar() {
        return this.validarChave(); 
    }

    async validarChave() {
        const official_language = sessionStorage.getItem('official_language') || 'pt';
        
        const input = this.control; // Usa o getter da Base_Field
        if (!input) return;

        // Remove espaços e garante que está em minúsculo (padrão de IDs do Ngrok)
        input.value = input.value.trim().toLowerCase();
        
        const valor = input.value;

        // Regex para validar o formato do ID (Ex: 51f0-2804-...-469c)
        // Aceita letras, números e hífens
        const regexIdNgrok = /^[a-z0-9-]+$/;

        // 1. Erro: Campo Vazio
        if (valor.length === 0) {
            const mensagem = this.constructor.i18n[official_language].erro_1;
            this.marcarErro(mensagem);
            return false;
        }

        // 2. Validação de formato básico
        if (!regexIdNgrok.test(valor)) {
            const mensagem = this.constructor.i18n[official_language].erro_2; // "Formato de chave inválido"
            this.marcarErro(mensagem);
            return false;
        }

        // 3. Validação de comprimento mínimo (evitar chaves incompletas)
        if (valor.length < 10) {
            const mensagem = this.constructor.i18n[official_language].erro_3; // "Chave muito curta"
            this.marcarErro(mensagem);
            return false;
        }
    }
}

customElements.define('chave-auct-field', Chave_Auct_Field);