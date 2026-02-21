import { Base_Field } from "../../base/Base_Field.js";

class Cor_Descricao_Field extends Base_Field {

      static i18n = {
        pt: {
            lbl_cor_de_identificacao    : "Cor de Identificação",             
            tp_lbl_cor_de_identificacao : "Escolha uma cor para este evento",
            erro_1                      : "Campo obrigatório.",       
            erro_2                      : "O campo deve ser preenchido"       
        },

        es: {
            lbl_cor_de_identificacao    : "Color de identificación",            
            tp_lbl_cor_de_identificacao : "Elige un color para este evento.",
            erro_1                      : "Campo obligatorio.",       
            erro_2                      : "El campo debe ser rellenado." 
        }
    };
  
    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();  
    }

    renderControl(p) {
        
        // Busca o valor da variável CSS no estilo computado do documento
        const corPadrao = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim() || '#1748AF';

        return `<div class="campo">
                    <label class="field-label"  for="${p.id}" data-translate="${p.data_translate_label}">${p.label}</label>
                    <i class="${p.icon_question}" data-tooltip="${p.data_tooltip_balao}" data-translate="${p.data_translate_tooltip}"></i>
                    <input type="color" id="${p.id}" name="${p.name}" value="${corPadrao}" class="field-input color-picker-input" data-translate="${p.data_translate_ph}" placeholder="${p.placeholder}" autocomplete="off" ${p.is_required}>
                    </input>
                    ${p.icon_edicao ? `
                        <button type="button" class="edit-button">
                            <i class="${p.icon_edicao}"></i>
                        </button>
                        ` : ''}     
                </div>
        `;        
    }
}

customElements.define('cor-descricao-field', Cor_Descricao_Field);