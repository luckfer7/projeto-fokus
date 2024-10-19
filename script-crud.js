//ENCONTRAR O BOTÃO ADICIONAR E GUARDAR NUMA VARIÁVEL, CRIA A FUNÇÃO QUE ALTERNA DO FORMULÁRIO ESCONDIDO PARA ATIVO.

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

