import { Base_Field } from '../../base/Base_Field.js';

class CPF_Pessoa_Field extends Base_Field {
  
    static i18n = {
        pt: {
            lbl_cpf    : "CPF", 
            ph_cpf     : "Digite seu cpf",
            tp_lbl_cpf : "Utilizado para sua identificação no sistema",
            erro_1     : "O cpf é inválido"   
              
        },

        es: {
            lbl_cpf    : "CPf", 
            ph_cpf     : "Ingrese su CPF",
            tp_lbl_cpf : "Utilizado para sua identificação no sistema",
            erro_1     : "O cpf no es válido."
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
        return this.validarNome(); 
    }

    async validarNome() {

        const official_language = sessionStorage.getItem('official_language') || 'pt';
        
        const input = this.control; // Usa o getter da Base_Field
        if (!input) return;

        // Formatação: Primeira letra de cada palavra em maiúscula
        input.value = input.value.toLowerCase().replace(/(?:^|\s)\S/g, a => a.toUpperCase());
        
        const valor = input.value.trim();
        const regexNome = /^[A-Za-zÀ-ÿ\s]+$/;

        if (!regexNome.test(valor)) {
            const mensagem = Nome_Field.i18n[official_language].erro_1;
            this.marcarErro( mensagem );
            return false;
        }

        if (valor.length < 3) {
            const mensagem = Nome_Field.i18n[official_language].erro_2;
            this.marcarErro( mensagem );
            return false;
        }

        this.marcarSucesso();
        return true;
    }

}

customElements.define('cpf-pessoa-field', CPF_Pessoa_Field);