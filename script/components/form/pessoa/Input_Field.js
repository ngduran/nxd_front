import { Base_Field } from '../../base/Base_Field.js';

class Input_Field extends Base_Field {
  
    
  
    constructor() {
        super();
    }
    
    connectedCallback() {
        super.connectedCallback();  
    }
   
    renderControl(p) {

        const lang = sessionStorage.getItem('official_language') || 'pt';
        const tipo = this.getAttribute('validation_type'); // "nome"
    
        // A INJEÇÃO MANUAL (Caso a Base_Field não encontre sozinha)
        //const textoLabel = Input_Field.i18n[lang][tipo].lbl_nome;

        return `<div class="campo">
                    <label class="field-label" for="${p.id}" data-translate ="${p.data_translate_label}">${p.label}</label>
                    <i class="${p.icon_question}" data-tooltip="${p.data_tooltip_balao}" data-translate ="${p.data_translate_tooltip}"></i>
                    <input type="${p.field_type}" id="${p.id}" name="${p.name}" class="field-input" data-translate ="${p.data_translate_ph}" placeholder="${p.placeholder}" 
                        autocomplete="off" ${p.is_required}>
                    </input>
                </div>
        `;        
    }

     /** @override */
    validar() {
        const lang = sessionStorage.getItem('official_language') || 'pt';
        const tipo = this.getAttribute('validation_type'); 
        const valor = this.control.value.trim();
        const dic = Input_Field.i18n[lang][tipo];

        // Mapeia o tipo para o nome da função (Ex: 'nome' vira 'validarNome')
        const nomeFuncao = `validar${tipo.charAt(0).toUpperCase() + tipo.slice(1)}`;

        if (typeof this[nomeFuncao] === 'function') {
            return this[nomeFuncao](valor, dic);
        }

        return true;
    }

    async validarNome() {

        const official_language = sessionStorage.getItem('official_language') || 'pt';
        const tipo = this.getAttribute('validation-type'); // 'nome' ou 'cpf'
        
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

    async validarCPF(valor, dic) {
        // Exemplo simples de validação
        if (valor.length !== 11) {
            this.marcarErro(dic.erro_1);
            return false;
        }
        this.marcarSucesso();
        return true;
    }


    // Agrupamos por tipo de campo (nome, cpf, etc.)
    static i18n = {
        pt: {
            nome: {
                lbl_nome    : "Nome",
                ph_nome     : "Digite seu nome completo",
                tp_lbl_nome : "Utilizado para sua identificação no sistema",
                erro_1      : "O nome deve conter apenas letras.",
                erro_2      : "O nome deve ter pelo menos 3 letras."
            },

            dt_nascimento: {
                lbl_dt_nascimento    : "Data de Nasc", 
                ph_dt_nascimento     : "Digite sua data de Nascimento",
                tp_lbl_dt_nascimento : "Utilizado para calcular sua idade",
                erro_1               : "A data de nascimento é obrigatória",       
                erro_2               : "A data de nascimento não pode ser futura" 
            },

            cpf: {
                lbl_cpf    : "CPF",
                ph_cpf     : "Digite seu CPF",
                tp_lbl_cpf : "Utilizado para sua identificação no sistema",
                erro_1     : "O CPF é inválido"
            },

            rg: {
                lbl_rg    : "RG",
                ph_rg     : "Digite seu RG",
                tp_lbl_rg : "Utilizado para sua identificação no sistema",
                erro_1    : "O RG é obrigatório"
            },

            telefone: {
                lbl_telefone    : "Telefone",
                ph_telefone     : "Digite seu telefone",
                tp_lbl_telefone : "Utilizado para contato se for seu desejo",
                erro_1          : "O telefone não é valido"
            },

            email: {
                lbl_email    : "Email",
                ph_email     : "Digite seu email",
                tp_lbl_email : "Utilizado para contato se for seu desejo",
                erro_1       : "O email não é valido"
            },

            profissao: {
                lbl_profissao    : "Profissão",
                ph_profissao     : "Digite sua profissão",
                tp_lbl_profissao : "Utilizamos sua profissão para oferecer conteúdos, serviços ou benefícios mais adequados ao seu perfil profissional.",
                erro_1           : "O campo não é obrigatório"
            },

            endereco: {
                lbl_endereco    : "Endereço",
                ph_endereco     : "Digite seu endereço",
                tp_lbl_endereco : "O endereço permite o agendamento de visitas missionárias e o seu acolhimento na comunidade mais próxima.",
                erro_1          : "O campo não é obrigatório"
            },

            dt_batismo: {
                lbl_dt_batismo    : "Data Batismo", 
                ph_dt_batismo     : "Digite a data do Batismo",
                tp_lbl_dt_batismo : "Utilizado para os sacramentos",
                erro_1            : "A data de nascimento é opcional",       
                erro_2            : "A data de batismo não pode ser futura" 
            },

            local_batismo: {
                lbl_local_batismo    : "Local do Batismo", 
                ph_local_batismo     : "Digite o local do seu Batismo",
                tp_lbl_local_batismo : "Utilizado para os sacramentos",
                erro_1               : "O local do batismo é opcional" 
            },

            dt_crisma: {
                lbl_dt_crisma    : "Data Crisma", 
                ph_dt_crisma     : "Digite a data da Crisma",
                tp_lbl_dt_crisma : "Utilizado para os sacramentos",
                erro_1           : "A data da crisma é opcional",       
                erro_2           : "A data da crisma não pode ser futura" 
            },

            local_crisma: {
                lbl_local_crisma    : "Local da Crisma", 
                ph_local_crisma     : "Digite o local da sua Crisma",
                tp_lbl_local_crisma : "Utilizado para os sacramentos",
                erro_1              : "O local da crisma é opcional" 
            },

            dt_pri_comunhao: {
                lbl_dt_pri_comunhao    : "Dt 1º Comunhão", 
                ph_dt_pri_comunhao     : "Digite a data da 1º Comunhão",
                tp_lbl_dt_pri_comunhao : "Utilizado para os sacramentos",
                erro_1                 : "A data da 1º comunhão é opcional",       
                erro_2                 : "A data da 1º comunhão não pode ser futura" 
            },

            local_pri_comunhao: {
                lbl_local_pri_comunhao    : "Local da 1º Comunhão", 
                ph_local_pri_comunhao     : "Digite o local da sua 1º Comunhão",
                tp_lbl_local_pri_comunhao : "Utilizado para os sacramentos",
                erro_1                    : "O local da 1º comunhão é opcional" 
            }

        },

        es: {
            nome: {
                lbl_nome    : "Nombre",
                ph_nome     : "Introduzca su nombre completo.",
                tp_lbl_nome : "Se utiliza para su identificación en el sistema.",
                erro_1      : "El nombre debe contener sólo letras.",
                erro_2      : "El nombre debe tener al menos 3 letras."
            },

            dt_nascimento: {
                lbl_dt_nascimento    : "Fecha de nac", 
                ph_dt_nascimento     : "Introduzca su fecha de nacimiento.",
                tp_lbl_dt_nascimento : "Se utiliza para calcular tu edad.",
                erro_1               : "Se requiere fecha de nacimiento.",       
                erro_2               : "La fecha de nacimiento no puede ser futura."
            },

            cpf: {
                lbl_cpf    : "CPF",
                ph_cpf     : "Ingrese su RG",
                tp_lbl_cpf : "Se utiliza para su identificación en el sistema.",
                erro_1     : "O CPF no es válido."
            },

            rg: {
                lbl_rg    : "RG",
                ph_rg     : "Digite seu RG",
                tp_lbl_rg : "Se utiliza para su identificación en el sistema.",
                erro_1    : "Se requiere un documento de identidad."
            },

            telefone: {
                lbl_telefone    : "Teléfono",
                ph_telefone     : "Introduzca su número de teléfono.",
                tp_lbl_telefone : "UtiSe utiliza para ponerse en contacto si lo desea.",
                erro_1          : "El número de teléfono no es válido."
            },

            email: {
                lbl_email    : "Correo electrónico",
                ph_email     : "Introduce tu correo electrónico",
                tp_lbl_email : "Se utiliza para ponerse en contacto si lo desea.",
                erro_1       : "La dirección de correo electrónico no es válida."
            },

            profissao: {
                lbl_profissao    : "Profesión",
                ph_profissao     : "Introduce tu profesión.",
                tp_lbl_profissao : "Aprovechamos tu profesión para ofrecerte contenidos, servicios o beneficios más adecuados a tu perfil profesional.",
                erro_1           : "Este campo no es obligatorio."
            },

            endereco: {
                lbl_endereco    : "Dirección",
                ph_endereco     : "Introduzca su dirección.",
                tp_lbl_endereco : "La dirección permite programar visitas misioneras y su recepción en la comunidad más cercana.",
                erro_1          : "Este campo no es opcional."
            },

            dt_batismo: {
                lbl_dt_batismo    : "Fecha bautismo", 
                ph_dt_batismo     : "Ingrese su fecha de bautismo.",
                tp_lbl_dt_batismo : "Utilizado para los sacramentos",
                erro_1            : "La fecha de nacimiento es opcional.",       
                erro_2            : "La fecha del bautismo no puede ser futura." 
            },

            local_batismo: {
                lbl_local_batismo    : "Lugar del bautismo", 
                ph_local_batismo     : "Ingrese el lugar de su Bautismo.",
                tp_lbl_local_batismo : "Utilizado para los sacramentos",
                erro_1               : "El lugar del bautismo es opcional." 
            },

            dt_crisma: {
                lbl_dt_crisma    : "Fecha confi.t", 
                ph_dt_crisma     : "Introduzca la fecha de confirmación.",
                tp_lbl_dt_crisma : "Utilizado para los sacramentos",
                erro_1           : "La fecha de confirmación es opcional.",       
                erro_2           : "La fecha de la confirmación no puede ser futura." 
            },

            local_crisma: {
                lbl_local_crisma    : "Lugar de la Confirmación", 
                ph_local_crisma     : "Ingrese la ubicación de su ceremonia de Confirmación.",
                tp_lbl_local_crisma : "Utilizado para los sacramentos",
                erro_1              : "El lugar de la ceremonia de confirmación es opcional." 
            },

            dt_pri_comunhao: {
                lbl_dt_pri_comunhao    : "Fecha Comunión", 
                ph_dt_pri_comunhao     : "Introduce la fecha de tu Primera Comunión.",
                tp_lbl_dt_pri_comunhao : "Utilizado para los sacramentos",
                erro_1                 : "Introduce la fecha de tu Primera Comunión.",       
                erro_2                 : "La fecha de la Primera Comunión no puede ser futura." 
            },

            local_pri_comunhao: {
                lbl_local_pri_comunhao    : "Lugar de Primera Comunión", 
                ph_local_pri_comunhao     : "Ingresa la ubicación de tu Primera Comunión.",
                tp_lbl_local_pri_comunhao : "Utilizado para los sacramentos",
                erro_1                    : "El lugar para la Primera Comunión es opcional.",
                erro_2                    : "La fecha de la Primera Comunión no puede ser futura."  
            }


        }
    };


}




customElements.define('input-field', Input_Field);