//ENCONTRAR O BOTÃO ADICIONAR E GUARDAR NUMA VARIÁVEL, CRIA A FUNÇÃO QUE ALTERNA DO FORMULÁRIO ESCONDIDO PARA ATIVO.

const btnAdicionarTarefa = document.querySelector('.app__button--add-task');
const formAdicionarTarefa = document.querySelector('.app__form-add-task');
const textarea = document.querySelector('.app__form-textarea');
// const tarefas = [];
const tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];
const ulTarefas = document.querySelector('.app__section-task-list');

function atualizarTarefas () {
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}

function criarElementoTarefa(tarefa) {
    //criar o elemento html lista
    const li = document.createElement('li')
    //criar a classe desse elemento
    li.classList.add('app__section-task-list-item')

    //agora faz a mesma coisa com um elemento svg
    const svg = document.createElement('svg')
    svg.innerHTML = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="12" cy="12" r="12" fill="#FFF"></circle>
            <path d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z" fill="#01080E"></path>
    </svg>
    `

    //agora cria-se o paragrafo, passando o texto descrição da tarefa
    const paragrafo = document.createElement('p')
    paragrafo.textContent = tarefa.descricao;
    paragrafo.classList.add('app__section-task-list-item-description');

    

    //agora cria-se o botao e a imagem do botao
    const botao = document.createElement('button');
    botao.classList.add('app_button-edit');
    const imgBotao = document.createElement('img');

    imgBotao.setAttribute('src', '/imagens/edit.png');

    //feature de editr tarefa

    botao.onclick = () => {
        const novaDescricao = prompt("Qual o novo nome da tarefa?")
        paragrafo.textContent = novaDescricao;
        tarefa.descricao = novaDescricao;
        atualizarTarefas();
    }
   
    // agora com todos os elementos criados, precisamos encaixar uns nos outros
    botao.append(imgBotao) //coloca a imagem do botao dentro do botao

    // agora coloca tudo dentro do li

    li.append(svg);
    li.append(paragrafo);
    li.append(botao);

    return li;
}

btnAdicionarTarefa.addEventListener('click', () => {
    formAdicionarTarefa.classList.toggle('hidden');
})

formAdicionarTarefa.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const tarefa = {
        descricao: textarea.value
    }

    tarefas.push(tarefa);
    //vamos colocar a tarefa natela.
    //precisammos fazer a referencia para o li
    const elementoTarefa = criarElementoTarefa(tarefa)
    //agora se faz o append na lista
    ulTarefas.append(elementoTarefa);
    atualizarTarefas();
    textarea.value = '';

    formAdicionarTarefa.classList.add('hidden');
    
})

//quando a app carregar precisamos percorrer aquele array de tarefas, depois renderiza-lo na tela.

tarefas.forEach (tarefa => {
    const elementoTarefa = criarElementoTarefa(tarefa)
    ulTarefas.append(elementoTarefa);
})