 const html = document.querySelector('html');
 const focoBt = document.querySelector('.app__card-button--foco');
 const curtoBt = document.querySelector('.app__card-button--curto');
 const longobt = document.querySelector('.app__card-button--longo');
 const banner = document.querySelector('.app__image');
 const titulo = document.querySelector('.app__title');
 const botoes = document.querySelectorAll('.app__card-button');
 const startPauseBt = document.querySelector('#start-pause'); 
 const musicaPlay = new Audio ('./sons/play.wav');
 const musicaPause = new Audio ('./sons/pause.mp3');
 const musicaFim = new Audio ('./sons/beep.mp3');
 const iniciarOuPausarBt = document.querySelector('#start-pause span');
 const imgPlay = document.querySelector('.app__card-primary-butto-icon');
 const imgPause = document.querySelector('.app__card-primary-butto-icon');
 const tempoNaTela = document.querySelector('#timer');

let tempoDecorridoEmSegundos = 1500;
let intervaloID = null;

 const musicaFocoInput = document.querySelector('#alternar-musica');
 const musica = new Audio ('./sons/luna-rise-part-one.mp3');
 musica.loop = true; 

 musicaFocoInput.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
 })


 focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    focoBt.classList.add('active');
    // html.setAttribute('data-contexto', 'foco')
    // banner.setAttribute('src', './imagens/foco.png')
 });

 curtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    curtoBt.classList.add('active');
    // html.setAttribute('data-contexto', 'descanso-curto')
    // banner.setAttribute('src', './imagens/descanso-curto.png')
 });

 longobt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    longobt.classList.add('active');
    // html.setAttribute('data-contexto', 'descanso-longo')
    // banner.setAttribute('src', './imagens/descanso-longo.png')
 });

 // refatorando o código

 function alterarContexto (contexto) {
    mostrarTempo();
    botoes.forEach(function(contexto) {
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto)
    banner.setAttribute('src', `./imagens/${contexto}.png`)
    switch (contexto) {
        case "foco": 
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            
            break;
        
        case "descanso-curto": 
            titulo.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta! </strong>`

            break;

        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície. <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        
        default:
            break;
    }
 }


 const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        musicaFim.play();
        alert ('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') == 'foco'
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado')
            document.dispatchEvent(evento)
        }
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
 }

 startPauseBt.addEventListener('click', iniciarOuPausar);


 function iniciarOuPausar () {
    if (intervaloID) { //independentemente do valor que tenha
        musicaPause.play();
        zerar();
        return;
    }
    iniciarOuPausarBt.textContent = "Pausar";
    alterarIconePause();
    musicaPlay.play()
    intervaloID = setInterval(contagemRegressiva, 1000); //automatizou
 }

    function alterarIconePlay () {
        imgPlay.setAttribute('src', './imagens/play_arrow.png');
    }

    function alterarIconePause () {
        imgPause.setAttribute('src', './imagens/pause.png');
    }


 function zerar () {
    iniciarOuPausarBt.textContent = "Começar";
    alterarIconePlay();
    clearInterval(intervaloID)
    intervaloID = null;
 }

 function mostrarTempo () {
    const tempo = new Date (tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString ('pt-Br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`;
 }

 mostrarTempo();