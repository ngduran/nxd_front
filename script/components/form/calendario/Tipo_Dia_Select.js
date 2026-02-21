import { Base_Select } from "../../base/Base_Select.js";

class Tipo_Dia_Select extends Base_Select {

       static i18n = {
        pt: {
            lbl_dia_tipo    : "Tipo do Dia",           
            ph_dia_tipo_op0 : "Tipo do Dia",
            tp_lbl_dia_tipo : "Dia Letivo, Feriado, Recesso etc.",
            erro_1          : "Campo obrigatório",      
            erro_2          : "Selecione o tipo do dia"
        },

        es: {
            lbl_dia_tipo    : "Tipo de día",           
            ph_dia_tipo_op0 : "Tipo de día",
            tp_lbl_dia_tipo : "Día escolar, vacaciones, recreo, etc.",
            erro_1          : "Campo obligatorio",      
            erro_2          : "Seleccione el tipo de día"
        }
    };

    optionsList = [
        { id: 1, nome: 'Dia Letivo'            },
        { id: 2, nome: 'Feriado'               },
        { id: 3, nome: 'Recesso Escolar'       },
        { id: 4, nome: 'Estudo e Planejamento' },
        { id: 5, nome: 'Luto'                  }
       
    ];

    async connectedCallback() {
        super.connectedCallback();
    }

     validar() {
        //return this.validarDiaSemana(); 
    }
}

customElements.define('tipo-dia-select', Tipo_Dia_Select);
