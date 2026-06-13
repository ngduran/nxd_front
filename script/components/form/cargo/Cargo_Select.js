import { executarOperacao } from '../../../core/api-engine.js';
import { listarEstados } from '../../../services/api_service.js';
import { Base_Select } from '../../base/Base_Select.js';

class Cargo_Select extends Base_Select {
    
    static i18n = {
        pt: {
            lbl_cargo    : "Cargo",           
            ph_cargo_op0 : "Selecione um cargo",
            tp_lbl_cargo : "Informe o cargo",
            erro         : "Campo Obrigatório"       
        },

        es: {
            lbl_cargo    : "posición",           
            ph_cargo_op0 : "Seleccione una posición",
            tp_lbl_cargo : "Por favor, indique el puesto.",
            erro         : "Campo obligatorio"       
        }
    };

    optionsList = [
        { id: 1, nome: 'Coordenador'},
        { id: 2, nome: 'Tesoureiro'},
        { id: 3, nome: 'Secretário'},
        { id: 4, nome: 'Menbro'},
    ];

    async connectedCallback() {    
        super.connectedCallback();        
        await this.readCargos();
    }
    
    async readCargos() {
        await executarOperacao({
            idBotao: 'cadastrarBtn',
            keyTextoAguarde: 'Consultando...',
            //apiCall: listarCargos,
            onSuccess: async (resultado) => { 
                
                this.optionsList = (resultado.data || []).map(item => ({
                    id: item.uuid, 
                    nome: item.nome
                }));
                
                this.render();                
            }     
        });
    }

}

customElements.define('cargo-select', Cargo_Select);