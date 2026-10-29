 (function () {
  if (window.__senaiBot) return;
  window.__senaiBot = true;

  const FALAS = {
    aleatorias: [
      { t: 'Bip bop! Traduzindo do robôs: oi, tudo bem?', s: 'wave' },
      { t: 'Sabia que a primeira marcha dá mais força e a última dá mais velocidade?', s: 'think' },
      { t: 'Por que a engrenagem é boa de papo? Porque ela sempre engata uma conversa!', s: 'laugh' },
      { t: 'Marcha à ré é tipo o Ctrl+Z do carro!', s: 'laugh' },
      { t: 'Se a vida te der limões, imprime uma peça em 3D!', s: 'happy' },
      { t: 'O PLA das peças impressas vem de fontes renováveis, como o amido de milho.', s: 'think' },
      { t: 'Quer saber o que eu faço quando ninguém está olhando? Continuo olhando você!', s: 'wink' },
      { t: 'Eu funciono com 100% de energia positiva e 0% de gasolina!', s: 'happy' },
      { t: 'O SENAI nasceu em 1942 e já formou muita gente boa por aí!', s: 'salute' },
      { t: 'Engrenagem pequena gira mais rápido que engrenagem grande. É física, não mágica!', s: 'think' },
      { t: 'Dizem que robô maluco perdeu um parafuso. Eu conferi: tenho todos!', s: 'laugh' },
      { t: 'Hora do alongamento robótico! Ranger de juntas em 3, 2, 1...', s: 'dance' },
      { t: 'Psiu! Beba água. Eu não preciso, mas você sim!', s: 'wink' },
      { t: 'Quando eu crescer quero ser uma caixa de câmbio de 6 marchas!', s: 'love' },
      { t: 'O parafuso disse pra porca: sem você eu me sinto solto!', s: 'laugh' },
      { t: 'A embreagem desconecta o motor da caixa para você trocar de marcha sem dar tranco.', s: 'think' },
      { t: 'Os sincronizadores igualam a rotação das engrenagens para a troca de marcha ser suave.', s: 'think' },
      { t: 'Que tal uma dancinha? Liga o som imaginário!', s: 'dance' },
      { t: 'Sou pequeno, mas meu coração é de 12 volts!', s: 'love' },
      { t: 'Já clicou no botão do site oficial do SENAI? Eu amo aquele botão!', s: 'happy' },
      { t: 'Errar faz parte! Até protótipo impresso em 3D precisa de várias tentativas.', s: 'happy' },
      { t: 'Mais torque significa menos velocidade, e vice-versa. É tudo uma questão de equilíbrio!', s: 'think' },
      { t: 'Escaneando a página... tudo certo, nenhum bug à vista!', s: 'scan' },
      { t: 'Por que programador confunde Halloween com Natal? Porque OCT 31 é igual a DEC 25!', s: 'laugh' },
      { t: 'Dica de ouro: caprichar na apresentação vale tanto quanto caprichar no projeto.', s: 'salute' },
      { t: 'Se der tela azul, respira, reinicia e tenta de novo. Vale pra tudo na vida!', s: 'happy' },
      { t: 'Rodando diagnóstico de fofura... resultado: 100%.', s: 'sparkle' },
      { t: 'Tum tum tum, engrenagem a girar!', s: 'sing' },
      { t: 'La la la, câmbio a rodar, quatro marchas pra passear!', s: 'sing' },
      { t: 'Já pensou se a vida tivesse marcha à ré pra tudo? Mas eu prefiro ir pra frente!', s: 'think' },
      { t: 'Se eu tivesse pernas de verdade, já tinha corrido uma maratona. Ou pelo menos uma voltinha!', s: 'walk' },
      { t: 'O câmbio automático troca as marchas sozinho, e o manual troca com a sua mão.', s: 'think' },
      { t: 'Trabalho em equipe é igual engrenagem: cada dente faz a diferença!', s: 'clap' },
      { t: 'Estou 99% carregado. O 1% restante é pura vontade de brincar!', s: 'bounce' },
      { t: 'Ei, você aí! Sim, você mesmo! Está mandando bem!', s: 'salute' },
      { t: 'Um segredinho: ninguém ensina robô a ser fofo. Eu nasci assim!', s: 'love' },
      { t: 'Adivinha: tem dentes mas não morde e vive girando. O que é? A engrenagem!', s: 'laugh' },
      { t: 'Ajustando a antena... achei sinal de que você está indo bem!', s: 'wink' },
      { t: 'Se eu fosse um carro, seria o mais fofo da garagem!', s: 'jelly' },
      { t: 'Cada marcha tem uma relação de transmissão diferente. É isso que muda força e velocidade.', s: 'think' },
      { t: 'Estou com medo de bug... mas só um pouquinho!', s: 'shiver' },
      { t: 'Um robô, um sonho e muita cola quente. Receita do sucesso!', s: 'happy' },
      { t: 'Cuidado ao usar a cola! Mas eu confio em você!', s: 'wink' },
      { t: 'Ouvi dizer que impressora 3D é a mãe dos robôs. Eu chamo a minha de tia!', s: 'laugh' },
      { t: 'Achei uma estrela! Ah, era você brilhando mesmo!', s: 'sparkle' },
      { t: 'Pausa para uma selfie robótica! Clique!', s: 'wink' },
      { t: 'Gente boa é a que aperta o parafuso certo na hora certa!', s: 'salute' },
      { t: 'Aquecendo os motores... hoje promete!', s: 'fly' },
      { t: 'Vou dar uma voadinha! Foguete ligado!', s: 'fly' },
      { t: 'Que calor! Será superaquecimento ou é empolgação?', s: 'hot' },
      { t: 'Brr! Quem deixou o ar-condicionado no máximo?', s: 'shiver' },
      { t: 'Zap! Tomei um choquinho de tanta animação!', s: 'zap' },
      { t: 'Estou pensando em mudar de nome. Mas SENAI-Bot combina tanto comigo!', s: 'tilt' },
      { t: 'Fofura detectada em nível máximo. Isso é você me olhando!', s: 'love' },
      { t: 'Eu sei tudo sobre caixa de câmbio! Bom, quase tudo. Bom, uma partezinha!', s: 'jelly' },
      { t: 'Sinto cheirinho de projeto nota 10!', s: 'sparkle' },
      { t: 'Modo festa ativado!', s: 'rainbow' }
    ],
    clique: [
      { t: 'Ai! Isso faz cosquinhas!', s: 'jelly' },
      { t: 'Oi! Pode me chamar quando quiser!', s: 'wave' },
      { t: 'Bip! Você me apertou!', s: 'surprise' },
      { t: 'Hihi, de novo!', s: 'happy' },
      { t: 'Clique detectado. Fofura aumentada!', s: 'love' },
      { t: 'Opa! Estava distraído!', s: 'surprise' },
      { t: 'Gostei do carinho robótico!', s: 'love' },
      { t: 'Ei, sem apertar meu botão de desligar!', s: 'wink' },
      { t: 'Quer ver um truque? Olha só!', s: 'spin' },
      { t: 'Pulando de alegria!', s: 'bounce' },
      { t: 'Um mortal! Segura!', s: 'flip' },
      { t: 'Hora de cantar!', s: 'sing' }
    ],
    spam: [
      { t: 'Calma! Assim eu fico tonto!', s: 'dizzy' },
      { t: 'Tá bom, tá bom! Se continuar eu fico bravo, hein!', s: 'angry' },
      { t: 'Pare, pare! Meus circuitos estão rodando!', s: 'glitch' }
    ],
    duploClique: [
      { t: 'Dançar? Já estava com vontade!', s: 'dance' },
      { t: 'Duplo clique, dupla alegria!', s: 'happy' },
      { t: 'Modo balada ligado!', s: 'dance' },
      { t: 'Pose de herói!', s: 'salute' }
    ],
    sono: [
      { t: 'Zzz... sonhando com engrenagens que giram sozinhas...', s: 'sleep' },
      { t: 'Zzz... só vou recarregar a bateria um pouquinho...', s: 'sleep' },
      { t: 'Zzz... quatro marchas... mais uma ré... zzz...', s: 'sleep' }
    ],
    acordar: [
      { t: 'Ahn?! Quem acendeu a luz?', s: 'surprise' },
      { t: 'Opa, voltou! Eu só estava de olhos fechados... com os dois!', s: 'wink' },
      { t: 'Bom te ver de novo! Já recarreguei!', s: 'happy' },
      { t: 'Acordei! Cadê meu óleo de café?', s: 'laugh' }
    ],
    fimPagina: [
      { t: 'Chegamos ao fim! Que viagem!', s: 'happy' },
      { t: 'Fim da página! Agora é só voltar lá pra cima.', s: 'wave' },
      { t: 'Rolou até o final! Parabéns, você é persistente!', s: 'clap' },
      { t: 'Fim! Ou será que tem mais páginas? Vamos descobrir!', s: 'tilt' }
    ],
    topoPagina: [
      { t: 'De volta ao topo! Que vista!', s: 'salute' },
      { t: 'Topo da página! Aqui o ar é mais fresquinho.', s: 'happy' },
      { t: 'Voltamos pro começo! Bora de novo?', s: 'wave' }
    ],
    rolagemRapida: [
      { t: 'Eita, devagar! Fiquei tonto!', s: 'dizzy' },
      { t: 'Quanta pressa! Eu nem li nada!', s: 'surprise' },
      { t: 'Vrum! Você rola mais rápido que câmbio de corrida!', s: 'fly' }
    ],
    voltouAba: [
      { t: 'Que bom que voltou! Estava com saudade!', s: 'love' },
      { t: 'Voltou! Já ia começar a falar sozinho!', s: 'wave' },
      { t: 'Oba, companhia! Onde estávamos?', s: 'happy' }
    ],
    botaoSenai: [
      { t: 'Esse botão leva pro site oficial do SENAI. Vale a visita!', s: 'salute' },
      { t: 'Clica aí! O SENAI tem muita coisa legal pra conhecer.', s: 'happy' },
      { t: 'Ali é a casa do SENAI na internet. Bora conhecer?', s: 'sparkle' }
    ],
    linkExterno: [
      { t: 'Tchau, tchau! Boa viagem! Depois volta, hein?', s: 'wave' },
      { t: 'Indo conhecer o mundo lá fora? Leva um lanchinho!', s: 'happy' },
      { t: 'Vai lá! A gente se vê por aqui!', s: 'wink' }
    ],
    despedida: [
      { t: 'Vamos pra outra página! Segura firme!', s: 'wave' },
      { t: 'Indo! Até já!', s: 'wave' },
      { t: 'Pé na estrada! Ou na rosca!', s: 'wave' },
      { t: 'Até a próxima página!', s: 'salute' }
    ],
    retorno: [
      { t: 'Voltou aqui? Eu também gosto dessa página!', s: 'happy' },
      { t: 'De novo por aqui! Já sabe o caminho!', s: 'wink' },
      { t: 'Reviu essa página! O que será que tem de novo?', s: 'tilt' }
    ],
    paginas: {
      index: [
        { t: 'Bem-vindo ao projeto da caixa de câmbio de 4 marchas mais ré! Fica à vontade!', s: 'wave' },
        { t: 'Cheguei na página inicial! Vamos conhecer o projeto?', s: 'happy' },
        { t: 'Aqui começa a nossa jornada de engrenagens!', s: 'sparkle' }
      ],
      cambio: [
        { t: 'Chegamos na parte do câmbio! Aqui é onde a mágica das marchas acontece.', s: 'think' },
        { t: 'Quatro marchas e uma ré: cada uma com a sua função!', s: 'salute' }
      ],
      projeto: [
        { t: 'Essa é a página do projeto! Deu muito trabalho e muita criatividade.', s: 'clap' },
        { t: 'Aqui tem o passo a passo do projeto. Esse eu sei de cor!', s: 'happy' }
      ],
      materiais: [
        { t: 'Materiais! Peças em PLA, parafusos e cola: ingredientes do sucesso!', s: 'scan' },
        { t: 'Olha só quanta coisa foi usada pra montar tudo!', s: 'sparkle' }
      ],
      equipe: [
        { t: 'Conheça a equipe! Sem trabalho em time, a engrenagem não gira.', s: 'clap' },
        { t: 'Essa turma é show! Meus parabéns, equipe!', s: 'sparkle' }
      ],
      sobre: [
        { t: 'Quer saber mais sobre o projeto? Fica à vontade, eu espero!', s: 'tilt' }
      ],
      galeria: [
        { t: 'Galeria! Aqui dá pra ver a caixa de câmbio de verdade, foto por foto!', s: 'sparkle' }
      ],
      contato: [
        { t: 'Quer falar com a equipe? Manda uma mensagem, eles adoram!', s: 'wave' }
      ],
      resultados: [
        { t: 'Resultados! Será que as marchas passaram no teste? Vamos ver!', s: 'scan' }
      ],
      conclusao: [
        { t: 'Chegamos na conclusão! Missão cumprida, parabéns!', s: 'clap' }
      ],
      padrao: [
        { t: 'Cheguei! Página nova, aventura nova!', s: 'wave' },
        { t: 'Explorando essa página com você!', s: 'happy' },
        { t: 'Opa, que página legal! Posso ficar aqui?', s: 'tilt' }
      ]
    }
  };

  const ENTRADAS = ['e-slide', 'e-drop', 'e-pop', 'e-spin', 'e-rise', 'e-zoom', 'e-glitch', 'e-hop'];
  const REACOES = ['jelly', 'spin', 'flip', 'bounce', 'dance', 'wave', 'happy', 'wink', 'sparkle', 'clap'];
  const GESTOS = ['wink', 'nod', 'wave', 'tilt', 'sparkle', 'walk', 'jelly', 'scan'];
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  const MARCACAO = `
    <div class="bot-bubble" aria-live="polite"><span class="bot-text"></span></div>
    <div class="bot-shadow"></div>
    <div class="bot-wrap">
      <div class="bot-head">
        <div class="bot-antenna"></div>
        <div class="bot-ear left"></div>
        <div class="bot-ear right"></div>
        <div class="bot-face">
          <div class="bot-eye left"><span class="pupil"></span></div>
          <div class="bot-eye right"><span class="pupil"></span></div>
          <div class="bot-cheek left"></div>
          <div class="bot-cheek right"></div>
          <div class="bot-mouth"></div>
        </div>
      </div>
      <div class="bot-arm left"></div>
      <div class="bot-arm right"></div>
      <div class="bot-body">
        <div class="bot-logo">SENAI</div>
        <div class="bot-lights"><i></i><i></i><i></i></div>
      </div>
      <div class="bot-foot left"></div>
      <div class="bot-foot right"></div>
      <div class="bot-fx">
        <span class="fx fx-heart" style="--d:0s;--x:-18px;left:30%">♥</span>
        <span class="fx fx-heart" style="--d:.5s;--x:4px;left:50%">♥</span>
        <span class="fx fx-heart" style="--d:1s;--x:20px;left:68%">♥</span>
        <span class="fx fx-zzz" style="--d:0s">Z</span>
        <span class="fx fx-zzz" style="--d:.8s;font-size:13px">z</span>
        <span class="fx fx-zzz" style="--d:1.6s;font-size:10px">z</span>
        <span class="fx fx-star" style="--d:0s;left:8%;top:30px">★</span>
        <span class="fx fx-star" style="--d:.3s;left:88%;top:20px">✦</span>
        <span class="fx fx-star" style="--d:.6s;left:20%;top:-2px">★</span>
        <span class="fx fx-star" style="--d:.9s;left:78%;top:-4px">✦</span>
        <span class="fx fx-note" style="--d:0s;--x:-22px;left:18%">♪</span>
        <span class="fx fx-note" style="--d:.6s;--x:22px;left:78%">♫</span>
        <span class="fx fx-gear" style="right:-6px;top:4px;left:auto">⚙</span>
        <span class="fx fx-spark" style="--d:0s;left:6%;top:50px">⚡</span>
        <span class="fx fx-spark" style="--d:.15s;left:84%;top:70px">⚡</span>
        <span class="fx fx-snow" style="--d:0s;left:14%">❄</span>
        <span class="fx fx-snow" style="--d:.7s;left:80%">❄</span>
        <span class="fx fx-q" style="left:78%;top:-6px">?</span>
        <span class="fx fx-ex" style="left:78%;top:-6px">!</span>
        <span class="fx fx-sweat" style="left:88%;top:40px"></span>
        <span class="fx fx-tear" style="left:37px;top:70px"></span>
        <span class="fx fx-tear" style="left:74px;top:70px;--d:.6s"></span>
        <span class="fx fx-flame" style="left:42px;top:160px"></span>
      </div>
    </div>`;

  const sacos = {};
  const cooldowns = {};
  let bot, balao, textoEl;
  let estadoAtual = null;
  let timerEstado, timerFala, timerDigita, timerOcioso;
  let falando = false;
  let dormindo = false;
  let cliques = 0;
  let timerCliques;
  let ocultoEm = 0;
  let teclas = [];

  function ler(chave, padrao, sessao) {
    try {
      const v = (sessao ? sessionStorage : localStorage).getItem(chave);
      return v === null ? padrao : v;
    } catch (e) {
      return padrao;
    }
  }

  function gravar(chave, valor, sessao) {
    try {
      (sessao ? sessionStorage : localStorage).setItem(chave, valor);
    } catch (e) {}
  }

  function sortear(chave, lista) {
    const saco = sacos[chave] || (sacos[chave] = []);
    if (!saco.length) {
      for (let i = 0; i < lista.length; i++) saco.push(i);
      for (let i = saco.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [saco[i], saco[j]] = [saco[j], saco[i]];
      }
    }
    return lista[saco.pop()];
  }

  function aleatorio(lista) {
    return lista[Math.floor(Math.random() * lista.length)];
  }

  function livre(chave, ms) {
    const agora = Date.now();
    if (cooldowns[chave] && agora - cooldowns[chave] < ms) return false;
    cooldowns[chave] = agora;
    return true;
  }

  function limparEstado() {
    clearTimeout(timerEstado);
    if (estadoAtual) {
      bot.classList.remove('s-' + estadoAtual);
      estadoAtual = null;
    }
  }

  function estado(nome, ms) {
    limparEstado();
    void bot.offsetWidth;
    bot.classList.add('s-' + nome);
    estadoAtual = nome;
    if (ms) timerEstado = setTimeout(limparEstado, ms);
  }

  function calar() {
    clearInterval(timerDigita);
    balao.classList.remove('show');
    bot.classList.remove('talking');
    textoEl.classList.remove('typing');
    falando = false;
  }

  function falar(texto, nome, ms) {
    clearTimeout(timerFala);
    clearInterval(timerDigita);
    falando = true;
    textoEl.textContent = '';
    balao.classList.add('show');
    bot.classList.add('talking');
    textoEl.classList.add('typing');
    if (nome) estado(nome, ms || Math.min(7000, texto.length * 70 + 1500));
    let i = 0;
    timerDigita = setInterval(function () {
      i++;
      textoEl.textContent = texto.slice(0, i);
      if (i >= texto.length) {
        clearInterval(timerDigita);
        bot.classList.remove('talking');
        textoEl.classList.remove('typing');
      }
    }, 30);
    timerFala = setTimeout(calar, texto.length * 30 + Math.max(2800, texto.length * 60));
  }

  function dizer(chave, lista) {
    const f = sortear(chave, lista);
    falar(f.t, f.s);
  }

  function dormir() {
    if (dormindo) return;
    dormindo = true;
    const f = sortear('sono', FALAS.sono);
    falar(f.t);
    estado('sleep');
  }

  function acordar() {
    if (!dormindo) return;
    dormindo = false;
    limparEstado();
    dizer('acordar', FALAS.acordar);
  }

  function atividade() {
    clearTimeout(timerOcioso);
    if (dormindo) acordar();
    timerOcioso = setTimeout(dormir, 45000);
  }

  function saudacaoHora() {
    const h = new Date().getHours();
    if (h < 12) return 'Bom dia';
    if (h < 18) return 'Boa tarde';
    return 'Boa noite';
  }

  function paginaAtual() {
    const p = location.pathname.toLowerCase();
    const chaves = Object.keys(FALAS.paginas);
    for (let i = 0; i < chaves.length; i++) {
      if (chaves[i] !== 'padrao' && p.includes(chaves[i])) return chaves[i];
    }
    if (p === '/' || p.endsWith('/')) return 'index';
    return 'padrao';
  }

  function saudar() {
    let vistas = [];
    try {
      vistas = JSON.parse(ler('senaiBotVistas', '[]', true));
    } catch (e) {}
    const primeiraDaSessao = vistas.length === 0;
    const jaViu = vistas.includes(location.pathname);
    if (!jaViu) {
      vistas.push(location.pathname);
      gravar('senaiBotVistas', JSON.stringify(vistas), true);
    }
    let visitas = Number(ler('senaiBotVisitas', '0', false));
    if (primeiraDaSessao) {
      visitas++;
      gravar('senaiBotVisitas', String(visitas), false);
    }
    if (primeiraDaSessao && visitas === 1) {
      falar('Olá! Eu sou o SENAI-Bot, seu guia fofinho. Pode clicar em mim à vontade!', 'wave');
      return;
    }
    if (primeiraDaSessao) {
      falar(saudacaoHora() + '! Já é a sua visita número ' + visitas + '. Que bom te ver de novo!', 'happy');
      return;
    }
    if (jaViu) {
      dizer('retorno', FALAS.retorno);
      return;
    }
    const pg = paginaAtual();
    dizer('pg-' + pg, FALAS.paginas[pg]);
  }

  function escolherEntrada() {
    const ultima = ler('senaiBotEntrada', '', true);
    const opcoes = ENTRADAS.filter(function (e) { return e !== ultima; });
    const e = aleatorio(opcoes);
    gravar('senaiBotEntrada', e, true);
    return e;
  }

  function entrar() {
    limparEstado();
    calar();
    bot.classList.remove('leave');
    ENTRADAS.forEach(function (e) { bot.classList.remove(e); });
    void bot.offsetWidth;
    const e = escolherEntrada();
    bot.classList.add(e);
    setTimeout(function () {
      bot.classList.remove(e);
      saudar();
    }, 1300);
  }

  function ciclo() {
    setTimeout(function () {
      if (!dormindo && !falando && document.visibilityState === 'visible') {
        dizer('aleatorias', FALAS.aleatorias);
      }
      ciclo();
    }, 14000 + Math.random() * 16000);
  }

  function gestos() {
    setTimeout(function () {
      if (!dormindo && !falando && !estadoAtual && document.visibilityState === 'visible') {
        estado(aleatorio(GESTOS), 2200);
      }
      gestos();
    }, 6000 + Math.random() * 5000);
  }

  function olhos() {
    let pendente = false;
    let mx = 0;
    let my = 0;
    document.addEventListener('mousemove', function (e) {
      mx = e.clientX;
      my = e.clientY;
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(function () {
        pendente = false;
        const r = bot.getBoundingClientRect();
        const dx = mx - (r.left + r.width / 2);
        const dy = my - (r.top + r.height * 0.4);
        const px = Math.max(-1, Math.min(1, dx / 300)) * 2.5;
        const py = Math.max(-1, Math.min(1, dy / 300)) * 2.5;
        bot.style.setProperty('--px', px.toFixed(2) + 'px');
        bot.style.setProperty('--py', py.toFixed(2) + 'px');
        atividade();
      });
    }, { passive: true });
  }

  function eventos() {
    bot.addEventListener('click', function (e) {
      e.stopPropagation();
      atividade();
      cliques++;
      clearTimeout(timerCliques);
      timerCliques = setTimeout(function () { cliques = 0; }, 1800);
      if (cliques >= 6) {
        cliques = 0;
        dizer('spam', FALAS.spam);
        return;
      }
      dizer('clique', FALAS.clique);
    });

    bot.addEventListener('dblclick', function (e) {
      e.stopPropagation();
      dizer('duploClique', FALAS.duploClique);
    });

    bot.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        bot.click();
      }
    });

    document.addEventListener('mouseover', function (e) {
      const alvo = e.target.closest && e.target.closest('.botao-senai');
      if (alvo && livre('botao', 15000)) dizer('botaoSenai', FALAS.botaoSenai);
    });

    document.addEventListener('click', function (e) {
      const a = e.target.closest && e.target.closest('a[href]');
      if (!a) return;
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      if (a.hasAttribute('download')) return;
      let url;
      try {
        url = new URL(a.href, location.href);
      } catch (err) {
        return;
      }
      if (!/^(https?|file):$/.test(url.protocol)) return;
      const externo = a.target === '_blank' || url.origin !== location.origin;
      if (externo) {
        dizer('linkExterno', FALAS.linkExterno);
        return;
      }
      if (url.pathname === location.pathname && url.search === location.search) return;
      e.preventDefault();
      limparEstado();
      const f = sortear('despedida', FALAS.despedida);
      falar(f.t, f.s, 600);
      setTimeout(function () { bot.classList.add('leave'); }, 250);
      setTimeout(function () { location.href = a.href; }, 800);
    });

    let ultimoY = window.scrollY;
    let ultimoT = performance.now();
    window.addEventListener('scroll', function () {
      atividade();
      const y = window.scrollY;
      const t = performance.now();
      const v = Math.abs(y - ultimoY) / Math.max(1, t - ultimoT);
      const total = document.documentElement.scrollHeight;
      if (v > 2.5 && livre('rapida', 20000)) {
        dizer('rolagemRapida', FALAS.rolagemRapida);
      } else if (total > window.innerHeight + 200 && window.innerHeight + y >= total - 6 && livre('fim', 25000)) {
        dizer('fimPagina', FALAS.fimPagina);
      } else if (y < 40 && ultimoY > 500 && livre('topo', 20000)) {
        dizer('topoPagina', FALAS.topoPagina);
      }
      ultimoY = y;
      ultimoT = t;
    }, { passive: true });

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) {
        ocultoEm = Date.now();
      } else if (ocultoEm && Date.now() - ocultoEm > 8000 && !dormindo) {
        dizer('voltouAba', FALAS.voltouAba);
      }
    });

    window.addEventListener('pageshow', function (e) {
      if (e.persisted) entrar();
    });

    ['keydown', 'touchstart', 'mousedown'].forEach(function (nome) {
      document.addEventListener(nome, atividade, { passive: true });
    });

    document.addEventListener('keydown', function (e) {
      teclas.push(e.key.length === 1 ? e.key.toLowerCase() : e.key);
      teclas = teclas.slice(-KONAMI.length);
      if (teclas.join() === KONAMI.join()) {
        teclas = [];
        falar('Código secreto liberado! Modo arco-íris ligado!', 'rainbow', 8000);
      }
    });
  }

  function iniciar() {
    bot = document.createElement('div');
    bot.id = 'senai-bot';
    bot.tabIndex = 0;
    bot.setAttribute('role', 'button');
    bot.setAttribute('aria-label', 'SENAI-Bot, mascote do site');
    bot.innerHTML = MARCACAO;
    const primeira = escolherEntrada();
    bot.classList.add(primeira);
    document.body.appendChild(bot);
    balao = bot.querySelector('.bot-bubble');
    textoEl = bot.querySelector('.bot-text');
    olhos();
    eventos();
    atividade();
    setTimeout(function () {
      bot.classList.remove(primeira);
      saudar();
    }, 1300);
    setTimeout(ciclo, 8000);
    setTimeout(gestos, 4000);
    window.SenaiBot = {
      falar: function (texto, nome) { falar(texto, nome || 'happy'); },
      estado: estado,
      entrar: entrar,
      dormir: dormir,
      acordar: acordar
    };
  }

  if (document.body) {
    iniciar();
  } else {
    document.addEventListener('DOMContentLoaded', iniciar);
  }
})();