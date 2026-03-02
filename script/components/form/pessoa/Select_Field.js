import { Base_Select } from "../../base/Base_Select.js";

class Select_Field extends Base_Select {

    // optionsList = [
    //     { id: 1, nome: 'Manhã' },
    //     { id: 2, nome: 'Tarde' },
    //     { id: 3, nome: 'Noite' },
    // ];

    async connectedCallback() {
        super.connectedCallback();
    }

 /** @override */
    validar() {
        const lang = sessionStorage.getItem('official_language') || 'pt';
        const tipo = this.getAttribute('validation_type'); 
        const valor = this.control.value.trim();
        const dic = Select_Field.i18n[lang][tipo];

        // Mapeia o tipo para o nome da função (Ex: 'nome' vira 'validarNome')
        const nomeFuncao = `validar${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;

        if (typeof this[nomeFuncao] === 'function') {
            return this[nomeFuncao](valor, dic);
        }

        return true;
    }

    async validarNome() {

        const official_language = sessionStorage.getItem('official_language') || 'pt';
        const tipo = this.getAttribute('validation_type'); // 'nome' ou 'cpf'
        
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

    static i18n = {
        pt: {
            estado_civil: {
                lbl_estado_civil    : "Estado Civil",           
                ph_estado_civil_op0 : "Estado Civil",
                tp_lbl_estado_civil : "Seu estado Civil",
                erro                : "Selecione um estado civil",
                optionsList : [
                    { id: 1, nome: 'Solteiro'   },
                    { id: 2, nome: 'Casado'     },
                    { id: 3, nome: 'Divorciado' },
                    { id: 4, nome: 'Viúvo'      }
                ]
            },

            escolaridade: {
                lbl_escolaridade    : "Escolaridade",           
                ph_escolaridade_op0 : "Escolaridade",
                tp_lbl_escolaridade : "Seu sua escolaridade",
                erro                : "Selecione uma escolaridade",
                optionsList : [
                    { id: 1,  nome: 'Analfabeto'                         },
                    { id: 2,  nome: 'Ensino Fundamental Incompleto'      },
                    { id: 3,  nome: 'Ensino Fundamental Completo'        },
                    { id: 4,  nome: 'Ensino Médio Incompleto'            },
                    { id: 5,  nome: 'Ensino Médio Completo'              },
                    { id: 6,  nome: 'Ensino Superior Incompleto'         },
                    { id: 7,  nome: 'Ensino Superior Completo'           },
                    { id: 8,  nome: 'Pós-graduação (Especialização/MBA)' },
                    { id: 9,  nome: 'Mestrado'                           },
                    { id: 10, nome: 'Doutorado'                          },
                    { id: 11, nome: 'Pós-doutorado'                      }
                ]
            },

            batizado: {
                lbl_batizado    : "Batizado",           
                ph_batizado_op0 : "Batizado",
                tp_lbl_batizado : "Selecione Sim/Não",
                erro            : "Selecione uma opção",
                optionsList : [
                    { id: 1,  nome: 'Sim'  },
                    { id: 2,  nome: 'Não'  }
                ]
            },

            crisma: {
                lbl_crisma    : "Crisma",           
                ph_crisma_op0 : "Crisma",
                tp_lbl_crisma : "Selecione Sim/Não",
                erro          : "Selecione uma opção",
                optionsList : [
                    { id: 1,  nome: 'Sim'  },
                    { id: 2,  nome: 'Não'  }
                ]
            },

            pri_comunhao: {
                lbl_pri_comunhao    : "1º Comunhão",           
                ph_pri_comunhao_op0 : "1º Comunhão",
                tp_lbl_pri_comunhao : "Selecione Sim/Não",
                erro                : "Selecione uma opção",
                optionsList : [
                    { id: 1,  nome: 'Sim'  },
                    { id: 2,  nome: 'Não'  }
                ]
            }                   

        },

        es: {
            estado_civil: {
                lbl_estado_civil    : "Estado Civil",           
                ph_estado_civil_op0 : "Estado Civil",
                tp_lbl_estado_civil : "Su estado civil",
                erro                : "Seleccione un estado civil.",
                optionsList : [
                    { id: 1, nome: 'Soltero'   },
                    { id: 2, nome: 'Casado'     },
                    { id: 3, nome: 'Divorciado' },
                    { id: 4, nome: 'Viudo'      }
                ]
            },

            escolaridade: {
                lbl_escolaridade    : "Educación",           
                ph_escolaridade_op0 : "Educación",
                tp_lbl_escolaridade : "Su educación",
                erro                : "Seleccione un nivel educativo.",
                optionsList : [
                    { id: 1,  nome: 'Analfabeto'                      },
                    { id: 2,  nome: 'Educación Primaria Incompleta'   },
                    { id: 3,  nome: 'Educación Primaria Completa'     },
                    { id: 4,  nome: 'Educación Secundaria Incompleta' },
                    { id: 5,  nome: 'Educación Secundaria Completa'   },
                    { id: 6,  nome: 'Educación Superior Incompleta'   },
                    { id: 7,  nome: 'Educación Superior Completa'     },
                    { id: 8,  nome: 'Posgrado (Especialización/MBA)'  },
                    { id: 9,  nome: 'Maestría'                        },
                    { id: 10, nome: 'Doctorado'                       },
                    { id: 11, nome: 'Posdoctorado'                    }
                ]
            },

            batizado: {
                lbl_batizado    : "Bautizado",           
                ph_batizado_op0 : "Bautizado",
                tp_lbl_batizado : "Seleccione Sí/No",
                erro            : "Seleccione una opción",
                optionsList : [
                    { id: 1,  nome: 'Sí'  },
                    { id: 2,  nome: 'No'  }
                ]
            },

            crisma: {
                lbl_crisma    : "Aceite",           
                ph_crisma_op0 : "Aceite",
                tp_lbl_crisma : "Seleccione Sí/No",
                erro          : "Seleccione una opción",
                optionsList : [
                    { id: 1,  nome: 'Sí'  },
                    { id: 2,  nome: 'No'  }
                ]
            },

            pri_comunhao: {
                lbl_pri_comunhao    : "Aceite",           
                ph_pri_comunhao_op0 : "Aceite",
                tp_lbl_pri_comunhao : "Seleccione Sí/No",
                erro                : "Seleccione una opción",
                optionsList : [
                    { id: 1,  nome: 'Sí'  },
                    { id: 2,  nome: 'No'  }
                ]
            }          
            
        }
    };

}

customElements.define('select-field', Select_Field);