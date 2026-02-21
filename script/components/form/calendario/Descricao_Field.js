import { Base_Field } from '../../base/Base_Field.js';

class Descricao_Field extends Base_Field {

    static i18n = {
        pt: {
            lbl_descricao    : "Descrição", 
            ph_descricao     : "Ex: Tiradentes ou Paixão",
            tp_lbl_descricao : "Data do Feriado ou evento",
            erro_1           : "Campo obrigatório.",       
            erro_2           : "O campo deve ser preenchido"       
        },

        es: {
            lbl_descricao    : "Descripción", 
            ph_descricao     : "Ej: Tiradentes o Pasión",
            tp_lbl_descricao : "Descripción de la festividad o evento",
            erro_1           : "Campo obligatorio.",       
            erro_2           : "El campo debe ser rellenado." 
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
                    <label class="field-label"  for="${p.id}" data-translate="${p.data_translate_label}">${p.label}</label>
                    <i class="${p.icon_question}" data-tooltip="${p.data_tooltip_balao}" data-translate="${p.data_translate_tooltip}"></i>
                    <input type="text" id="${p.id}" name="${p.name}" class="field-input" data-translate="${p.data_translate_ph}" placeholder="${p.placeholder}" autocomplete="off" ${p.is_required}>
                    </input>
                    ${p.icon_edicao ? `
                        <button type="button" class="edit-button">
                            <i class="${p.icon_edicao}"></i>
                        </button>
                        ` : ''}     
                </div>
        `;        
    }

    validar() {
        //return this.validarDiaSemana(); 
    }

}

customElements.define('descricao-field', Descricao_Field);