import { Base_Field } from '../../base/Base_Field.js';

class Data_Geral_Field extends Base_Field {

    static i18n = {
        pt: {
            lbl_data_geral    : "Data no Calendário", 
            ph_data_geral     : "Selecione a data",
            tp_lbl_data_geral : "Data do Feriado ou evento",
            erro_1            : "Campo obrigatório.",       
            erro_2            : "Data Inválida"       
        },

        es: {
            lbl_data_geral    : "Fecha en el calendario", 
            ph_data_geral     : "Seleccione la fecha",
            tp_lbl_data_geral : "Fecha de vacaciones o evento",
            erro_1            : "Campo obligatorio.",       
            erro_2            : "Fecha inválida" 
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
        //return this.validarNome(); 
    }




}

customElements.define('data-geral-field', Data_Geral_Field);
