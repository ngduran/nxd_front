import { Base_Field } from '../../base/Base_Field.js';

class Data_Nascimento_Field extends Base_Field {
  
    static i18n = {
        pt: {
            lbl_dt_nascimento    : "Data de Nasc", 
            ph_dt_nascimento     : "Digite sua data de Nascimento",
            tp_lbl_dt_nascimento : "Utilizado para calcular sua idade",
            erro_1               : "A data de nascimento é obrigatória",       
            erro_2               : "A data de nascimento não pode ser futura"       
        },

        es: {
            lbl_dt_nascimento    : "Fecha de nac", 
            ph_dt_nascimento     : "Introduzca su fecha de nacimiento.",
            tp_lbl_dt_nascimento : "Se utiliza para calcular tu edad.",
            erro_1               : "Se requiere fecha de nacimiento.",       
            erro_2               : "La fecha de nacimiento no puede ser futura."
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
                    <input type="date" id="${p.id}" name="${p.name}" class="field-input" data-translate ="${p.data_translate_ph}" placeholder="${p.placeholder}" 
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

customElements.define('data-nascimento-field', Data_Nascimento_Field);