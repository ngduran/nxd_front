import { executarOperacao } from "../../../core/api-engine.js";
import { listarInstituicoes } from "../../../services/api_service.js";
import { Base_Select } from "../../base/Base_Select.js";

export class Cargo_Select extends Base_Select {

    // 1. Atributos Estáticos
    static i18n = {
        pt: {
            lbl_cargo    : "Cargo",           
            ph_cargo_op0 : "Selecione um cargo",
            tp_lbl_cargo : "Utilizado para registrar o cargo",
            erro         : "Por favor, selecione um cargo"       
        },

        es: {
            lbl_cargo    : "Posición",           
            ph_cargo_op0 : "Seleccione una posición",
            tp_lbl_cargo : "Se utiliza para registrar la posición.",
            erro         : "Por favor, seleccione un puesto.",
        }
    };

    optionsList = [];


    async connectedCallback() {
        super.connectedCallback(); // Renderiza o esqueleto e o placeholder
        await this.readInstituicoes(); // Busca os dados da API
    }
  
    async readInstituicoes() {
        await executarOperacao({
            idBotao: 'cadastrarBtn',
            keyTextoAguarde: 'Consultando...',
            apiCall: listarInstituicoes,
            onSuccess: async (resultado) => { 
                // 1. Alimenta a lista do combobox pessoa
                this.optionsList = (resultado.data || []).map(item => ({
                    id: item.uuid, 
                    nome: item.nome
                }));

                // 2. Renderiza o conteúdo
                this.render(); 

            }     
        });
    }

}

customElements.define('cargo-select', Cargo_Select);