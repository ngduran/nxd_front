import { executarOperacao } from "../../../core/api-engine.js";
import { listarInstituicoes } from "../../../services/api_service.js";
import { Base_Select } from "../../base/Base_Select.js";

export class Pessoa_Select extends Base_Select {

    // 1. Atributos Estáticos
    static i18n = {
        pt: {
            lbl_pessoa    : "Pessoa",           
            ph_pessoa_op0 : "Selecione uma pessoa",
            tp_lbl_pessoa : "Utilizado para enviar o convite",
            erro          : "Por favor, selecione uma pessoa"       
        },

        es: {
            lbl_pessoa    : "Persona",           
            ph_pessoa_op0 : "Seleccione una persona",
            tp_lbl_pessoa : "Se utiliza para enviar la invitación",
            erro          : "Por favor, seleccione una persona",
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

customElements.define('pessoa-select', Pessoa_Select);