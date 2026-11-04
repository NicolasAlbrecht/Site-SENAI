(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const sorteia = (l) => l[Math.floor(Math.random() * l.length)];
  const ler = (k, d) => {
    try {
      const v = localStorage.getItem(k);
      return v ? JSON.parse(v) : d;
    } catch (e) {
      return d;
    }
  };
  const gravar = (k, v) => {
    try {
      localStorage.setItem(k, JSON.stringify(v));
    } catch (e) {}
  };
  const robo = (t, e) => {
    if (window.SenaiBot) window.SenaiBot.falar(t, e);
  };
  const gesto = (e, ms) => {
    if (window.SenaiBot) window.SenaiBot.estado(e, ms);
  };
  const falarPergunta = (t) => {
    const s = String(t || "").split("\n")[0].replace(/\s+/g, " ").trim();
    if (!s || !window.SenaiBot) return;
    window.SenaiBot.falar(
      s.length > 120 ? s.slice(0, 118).replace(/[,.;:]\s?\S*$/, "") + "…" : s,
      "scan",
    );
  };
  const el = (tag, cls, txt) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (txt) n.textContent = txt;
    return n;
  };

  const menuBtn = $(".menu-btn");
  const menu = $("#menu");
  function fecharMenu() {
    menu.classList.remove("aberto");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Abrir menu");
  }
  menuBtn.addEventListener("click", () => {
    const aberto = menu.classList.toggle("aberto");
    menuBtn.setAttribute("aria-expanded", String(aberto));
    menuBtn.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });
  $$("a", menu).forEach((a) => a.addEventListener("click", fecharMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") fecharMenu();
  });

  const logo = $(".logotipo");
  function logoFalhou() {
    const s = el("span", "logo-texto", "SENAI");
    logo.replaceWith(s);
  }
  if (logo) {
    if (logo.complete && !logo.naturalWidth) logoFalhou();
    else logo.addEventListener("error", logoFalhou, { once: true });
  }

  const COMP = [
    [
      "Módulo sensor de gás MQ-2",
      "Mede o ar ao redor: a resistência elétrica da sua superfície sensível muda conforme a quantidade de gás presente.",
      "É o sentido do Sentinela. O MQ-2 é sensível a gases inflamáveis e à fumaça, como GLP, propano, butano, metano, hidrogênio e álcool.",
      '<rect x="8" y="14" width="32" height="22" rx="4"/><circle cx="24" cy="25" r="7"/><path d="M14 14V8M34 14V8"/>',
      true,
    ],
    [
      "Placa Arduino",
      "Lê os valores enviados pelo sensor, compara com o limite definido no programa e liga as saídas de alerta.",
      "É o cérebro do conjunto: o código foi simulado no Tinkercad e gravado na placa pela Arduino IDE.",
      '<rect x="14" y="14" width="20" height="20" rx="2"/><path d="M20 14V6M28 14V6M20 42v-8M28 42v-8M14 20H6M14 28H6M42 20h-8M42 28h-8"/>',
      true,
    ],
    [
      "Buzzer",
      "Componente que converte o sinal elétrico do alerta em som: o apito.",
      "Está ligado a uma saída digital do Arduino e é o aviso que chama a atenção de quem está por perto.",
      '<circle cx="22" cy="24" r="13"/><circle cx="22" cy="24" r="4"/><path d="M38 16a12 12 0 0 1 0 16"/>',
      true,
    ],
    [
      "Motor de vibração",
      "Componente que treme quando recebe corrente, produzindo um aviso sentido pela pele.",
      "Está na outra saída digital e dispara junto com o buzzer: como a braçadeira fica no braço, o usuário sente o alerta mesmo no ruído.",
      '<circle cx="24" cy="24" r="10"/><path d="M8 16l-4 8 4 8M40 16l4 8-4 8"/>',
      true,
    ],
    [
      "Quatro pilhas AAA em série",
      "Fornecem a energia do circuito inteiro, longe da tomada.",
      "Ligadas em série elas entregam aproximadamente 6 volts. A autonomia medida pela equipe não foi informada.",
      '<rect x="6" y="16" width="28" height="16" rx="3"/><path d="M38 21v6M12 24h8m-4-4v8"/>',
      true,
    ],
    [
      "Placa de ilhais",
      "Base furada onde os componentes são apoiados e soldados, furo por furo, ligando tudo ponto a ponto.",
      "É a estrutura elétrica da montagem: os fios, os pinos e o módulo todos chegam até ela.",
      '<rect x="6" y="10" width="36" height="28" rx="3"/><path d="M14 18h.01M22 18h.01M30 18h.01M14 26h.01M22 26h.01M30 26h.01M18 33h.01M26 33h.01"/>',
      true,
    ],
    [
      "Resistores e componentes de apoio",
      "Ajustam corrente e nível de tensão entre o sensor, a placa e os sinalizadores.",
      "Protegem o buzzer e o motor de corrente demais e seguram os níveis corretos do sinal.",
      '<path d="M4 24h8l4-10 4 20 4-16 4 12 4-6h8"/>',
      true,
    ],
    [
      "Suporte da braçadeira",
      "Mantém o sensor, a placa e os avisos presos no braço, com a cápsula do MQ-2 exposta ao ar.",
      "A equipe confirma que o projeto tem suporte para o braço: é ele que transforma o circuito em um dispositivo vestível e transmite o tremor até a pele. O material e o tipo de fecho não foram informados.",
      '<path d="M10 12h28v24H10z"/><path d="M6 18h4M6 30h4M38 18h4M38 30h4"/>',
      true,
    ],
  ];
  const listaComp = $("#lista-comp");
  COMP.forEach((c) => {
    const card = el("article", "card");
    card.innerHTML =
      '<svg class="icone" viewBox="0 0 48 48" aria-hidden="true">' +
      c[3] +
      '</svg><h3></h3><p></p><p></p><p class="nota">Ilustração esquemática. A peça pode variar conforme o projeto real.</p>';
    $("h3", card).textContent = c[0];
    const ps = $$("p", card);
    ps[0].textContent = "Função: " + c[1];
    ps[1].textContent = "Como participa: " + c[2];
    const st = el("p", "no-modelo " + (c[4] ? "tem" : "nao-tem"));
    st.textContent = c[4]
      ? "Já está na nossa montagem"
      : "Ainda não está na nossa montagem";
    card.append(st);
    listaComp.append(card);
  });

  const COLS = ["Material", "Aplicação", "Etapa de fabricação", "Observações"];
  const corpoMat = $("#corpo-mat");

  const galeria = $("#galeria-lista");
  const lb = $("#lightbox");
  const lbImg = $("#lb-img");
  const lbLeg = $("#lb-leg");
  const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  const T_ENTRA = 400;
  const T_SAI = 260;
  let miniatura = null;
  let voo = null;

  function caixa(n) {
    const r = n.getBoundingClientRect();
    return { w: r.width, h: r.height, cx: r.left + r.width / 2, cy: r.top + r.height / 2 };
  }

  function fotoVisivel(img) {
    const moldura = img.closest(".foto-btn");
    const r = caixa(moldura || img);
    if (!img.naturalWidth || !img.naturalHeight || !r.w || !r.h) return r;
    const prop = img.naturalWidth / img.naturalHeight;
    const w = prop > r.w / r.h ? r.w : r.h * prop;
    return { w: w, h: w / prop, cx: r.cx, cy: r.cy };
  }

  function pose() {
    if (!miniatura || semMovimento.matches || typeof lbImg.animate !== "function")
      return null;
    const de = fotoVisivel(miniatura);
    const ate = caixa(lbImg);
    if (!de.w || !ate.w || !ate.h) return null;
    const escala = de.w / ate.w;
    if (!isFinite(escala) || escala <= 0.02 || escala >= 0.99) return null;
    return { escala: escala, x: de.cx - ate.cx, y: de.cy - ate.cy };
  }

  function transforme(p) {
    if (!p) return "none";
    return (
      "translate(" +
      p.x.toFixed(2) +
      "px, " +
      p.y.toFixed(2) +
      "px) scale(" +
      p.escala.toFixed(4) +
      ")"
    );
  }

  function esperarFoto() {
    if (lbImg.complete && lbImg.naturalWidth) return Promise.resolve();
    if (typeof lbImg.decode === "function") {
      return lbImg.decode().catch(() => {});
    }
    return new Promise((fim) => {
      lbImg.addEventListener("load", fim, { once: true });
      lbImg.addEventListener("error", fim, { once: true });
    });
  }

  function limparVoo() {
    if (voo) {
      voo.cancel();
      voo = null;
    }
    lbImg.style.transform = "";
    lb.style.visibility = "";
  }

  function voar(de, ate, duracao, eixo, aoTerminar) {
    voo = lbImg.animate([de, ate], { duration: duracao, easing: eixo });
    voo.onfinish = aoTerminar;
    voo.oncancel = () => {
      voo = null;
    };
  }

  async function ampliar(botao) {
    const img = $("img", botao);
    if (!img) return;
    const fig = $("figcaption", botao.closest("figure"));
    limparVoo();
    miniatura = img;
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbLeg.textContent = fig ? fig.textContent.trim() : "";
    lb.classList.remove("lb-saindo");
    lb.style.visibility = "hidden";
    lb.showModal();
    await esperarFoto();
    if (!lb.open) return;
    const p = pose();
    lbImg.style.transform = transforme(p);
    lb.style.visibility = "";
    lb.classList.add("lb-entrando");
    if (!p) return;
    voar(
      { transform: transforme(p) },
      { transform: "none" },
      T_ENTRA,
      "cubic-bezier(0.22, 1, 0.36, 1)",
      () => {
        voo = null;
        lbImg.style.transform = "";
      }
    );
  }

  function reduzir() {
    if (!lb.open) return;
    if (voo) {
      voo.cancel();
      voo = null;
    }
    const atual = getComputedStyle(lbImg).transform;
    lb.classList.remove("lb-entrando");
    lbImg.style.transform = "";
    const p = pose();
    if (!p) {
      lb.close();
      return;
    }
    lb.classList.add("lb-saindo");
    voar(
      { transform: atual },
      { transform: transforme(p) },
      T_SAI,
      "cubic-bezier(0.4, 0, 0.9, 0.5)",
      () => {
        voo = null;
        lb.close();
      }
    );
  }

  $$(".foto-btn", galeria).forEach((b) => {
    b.addEventListener("click", () => ampliar(b));
  });
  $("#lb-fechar").addEventListener("click", reduzir);
  lb.addEventListener("click", (e) => {
    if (e.target === lb) reduzir();
  });
  lb.addEventListener("cancel", (e) => {
    e.preventDefault();
    reduzir();
  });
  lb.addEventListener("close", () => {
    limparVoo();
    lb.classList.remove("lb-entrando", "lb-saindo");
    miniatura = null;
  });

  const LIMITE = 40;
  const AVISO = 24;
  const ESCALA = 420;
  const svg = $("#demo-svg");
  const barra = $("#d-barra");
  const nuvem = $("#d-nuvem");
  const gasIn = $("#gas-in");
  const gasValor = $("#gas-valor");
  const cenas = $$(".btn-cena");
  let nivel = 0;
  let ultimoEstado = "";
  let somLigado = false;
  let tremorLigado = true;
  let audio = null;
  let bipeiro = null;
  let tremeu = null;

  const ESTADOS = {
    seguro: {
      r: "Seguro: abaixo do limite",
      t: "O Arduino só mede",
      d: "A leitura do MQ-2 está abaixo da faixa de aviso. O Arduino continua lendo o sensor o tempo todo, mas nenhuma das duas saídas digitais do alerta está ligada: um alarme que dispara à toa faz o usuário ignorar o aviso de verdade.",
      e: "Nesta faixa o LED fica apagado, o buzzer não apita e o motor de vibração não treme.",
      f: [
        "Ar limpo aqui. A braçadeira fica quieta, mas o Arduino continua medindo.",
        "Nada de gás no ar: é assim que o Sentinela tem que ficar.",
      ],
    },
    atencao: {
      r: "Atenção: perto do limite",
      t: "Está chegando perto",
      d: "A leitura subiu e entrou na faixa de aviso, mas ainda não passou do limite programado no Arduino. É a hora de ventilar o ambiente e procurar a fonte antes que o alarme toque.",
      e: "Ainda sem apito e sem vibração: nesta faixa só a barra e a cor do alerta mudam.",
      f: [
        "O nível subiu. Antes de disparar, já dá para abrir a janela.",
        "Atenção: o MQ-2 está vendo gás, mas ainda não passou do limite.",
      ],
    },
    alarme: {
      r: "Alarme disparado",
      t: "Vibrou e apitou juntos",
      d: "A leitura passou do limite e o programa ligou as duas saídas digitais ao mesmo tempo: o buzzer apita e o motor vibra no braço. Em um ambiente com muito ruído, onde o som se perde, é a vibração na pele que garante o aviso.",
      e: "Numa situação real: desligar a fonte de gás, ventilar o ambiente e sair do local se o alarme continuar.",
      f: [
        "Disparou! Apito e vibração ao mesmo tempo, direto no braço.",
        "Alarme ligado: as duas saídas digitais do Arduino foram acionadas juntas.",
      ],
    },
  };

  function tocarBipe() {
    if (!audio) return;
    const t = audio.currentTime;
    const osc = audio.createOscillator();
    const ganho = audio.createGain();
    osc.type = "square";
    osc.frequency.value = 880;
    ganho.gain.setValueAtTime(0.0001, t);
    ganho.gain.exponentialRampToValueAtTime(0.14, t + 0.015);
    ganho.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
    osc.connect(ganho);
    ganho.connect(audio.destination);
    osc.start(t);
    osc.stop(t + 0.18);
  }
  function pararSaida() {
    if (bipeiro) clearInterval(bipeiro);
    if (tremeu) clearInterval(tremeu);
    bipeiro = null;
    tremeu = null;
    if (navigator.vibrate) navigator.vibrate(0);
  }
  function ligarSaida() {
    if (bipeiro) return;
    tocarBipe();
    bipeiro = setInterval(tocarBipe, 700);
    if (!tremorLigado || !navigator.vibrate) return;
    navigator.vibrate([180, 90]);
    tremeu = setInterval(() => navigator.vibrate([180, 90]), 540);
  }

  function medir(novoNivel, quieto) {
    nivel = Math.max(0, Math.min(100, Math.round(novoNivel)));
    gasIn.value = String(nivel);
    gasValor.textContent = String(nivel);
    barra.setAttribute("width", ((nivel / 100) * ESCALA).toFixed(1));
    nuvem.setAttribute("opacity", (nivel / 100).toFixed(2));
    const estado =
      nivel >= LIMITE ? "alarme" : nivel >= AVISO ? "atencao" : "seguro";
    svg.classList.toggle("alarme", estado === "alarme");
    svg.classList.toggle("atencao", estado === "atencao");
    svg.classList.toggle("som", somLigado);
    svg.classList.toggle("tremor", tremorLigado);
    cenas.forEach((b) =>
      b.setAttribute("aria-pressed", String(Number(b.dataset.g) === nivel)),
    );
    const e = ESTADOS[estado];
    const st = $("#demo-status");
    const novo = st.cloneNode();
    novo.textContent = e.r;
    st.replaceWith(novo);
    $("#demo-titulo").textContent = e.t;
    $("#demo-txt").textContent = e.d;
    $("#demo-eng").textContent = e.e;
    if (estado === "alarme" && somLigado) ligarSaida();
    else pararSaida();
    if (!quieto && estado !== ultimoEstado) {
      robo(
        sorteia(e.f),
        estado === "alarme" ? "surprise" : estado === "atencao" ? "think" : "happy",
      );
    }
    ultimoEstado = estado;
    return estado;
  }

  gasIn.addEventListener("input", () => medir(Number(gasIn.value)));
  cenas.forEach((b) => b.addEventListener("click", () => medir(Number(b.dataset.g))));
  $("#som-btn").addEventListener("click", (ev) => {
    somLigado = !somLigado;
    if (somLigado) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) somLigado = false;
      else {
        if (!audio) audio = new Ctx();
        if (audio.state === "suspended") audio.resume();
      }
    }
    const botao = ev.currentTarget;
    botao.setAttribute("aria-pressed", String(somLigado));
    botao.textContent = "Apito: " + (somLigado ? "ligado" : "desligado");
    medir(nivel, true);
    robo(
      somLigado
        ? "Apito ligado. Ele só toca quando a leitura passa do limite, igual ao aparelho de verdade."
        : "Apito desligado. O alarme continua aparecendo no desenho, só sem som.",
      somLigado ? "happy" : "wave",
    );
  });
  $("#tremor-btn").addEventListener("click", (ev) => {
    tremorLigado = !tremorLigado;
    const botao = ev.currentTarget;
    botao.setAttribute("aria-pressed", String(tremorLigado));
    botao.textContent = "Vibração: " + (tremorLigado ? "ligada" : "desligada");
    medir(nivel, true);
    robo(
      tremorLigado
        ? "Vibração ligada: é o aviso que chega em quem não ouve o apito."
        : "Vibração desligada. Assim dá para ver a diferença que o alerta tátil faz.",
      "think",
    );
  });
  medir(Number(gasIn.value), true);

  const Q = [
    [
      "O que é o Projeto Sentinela?",
      [
        "Uma braçadeira que detecta gás no ar e avisa por apito e vibração",
        "Um termômetro digital de ambiente",
        "Um alarme de incêndio de tomada",
        "Um jogo educativo programado em blocos",
      ],
      0,
      "O Sentinela é um dispositivo vestível: a braçadeira leva o sensor de gás, o Arduino, o buzzer e o motor de vibração. Quando a leitura passa do limite, os dois avisos disparam juntos.",
    ],
    [
      "De onde veio a ideia do projeto?",
      [
        "De um pedido de uma fábrica",
        "Das aulas de Química, sobre os gases e os riscos deles para a saúde",
        "De uma corrida de robótica",
        "Das aulas de soldagem apenas",
      ],
      1,
      "Nas aulas de Química a equipe estudou que o efeito do gás depende do tipo, da concentração e do tempo de exposição, e que alguns casos podem ser graves ou fatais. Daí veio a ideia de um vestível que avise a pessoa.",
    ],
    [
      "Qual componente faz a leitura do gás no ar?",
      [
        "O buzzer",
        "O motor de vibração",
        "O sensor MQ-2",
        "A placa de ilhais",
      ],
      2,
      "O modelo usado é o MQ-2, um sensor de gás de semicondutor de óxido metálico: a resistência elétrica dele muda conforme a quantidade de gás na superfície sensível.",
    ],
    [
      "O que decide a hora de acionar o alerta?",
      [
        "O cheiro que o usuário sente",
        "O limite definido na programação do Arduino",
        "A temperatura das pilhas",
        "O tamanho da placa de ilhais",
      ],
      1,
      "O Arduino lê os valores enviados pelo sensor e o programa da equipe compara essa leitura com um limite. Ao ultrapassar o limite, as saídas de alerta são acionadas.",
    ],
    [
      "Por que a braçadeira vibra além de apitar?",
      [
        "Para gastar menos energia",
        "Para trocar de cor quando há gás",
        "Porque no braço a vibração é sentida mesmo em ambiente com muito ruído",
        "Porque o buzzer sozinho não funciona",
      ],
      2,
      "Em um ambiente barulhento o som do buzzer pode ser difícil de ouvir. Como o aparelho está no braço, a vibração chega na pele e o usuário percebe o alerta de qualquer jeito.",
    ],
    [
      "Como buzzer e motor de vibração são ligados?",
      [
        "Em duas saídas digitais do Arduino",
        "Direto nos polos das pilhas",
        "Na porta USB do computador",
        "Em série com o sensor MQ-2",
      ],
      0,
      "Os dois estão em saídas digitais do Arduino, e o programa aciona as duas ao mesmo tempo quando a leitura passa do limite.",
    ],
    [
      "Como o Sentinela recebe energia?",
      [
        "Por um cabo ligado à tomada",
        "Por quatro pilhas AAA ligadas em série, com aproximadamente 6 volts",
        "Por uma bateria de celular",
        "Por um painel solar",
      ],
      1,
      "Quatro pilhas AAA em série fornecem cerca de 6 volts. Como o dispositivo é usado no corpo, ele precisa de uma fonte própria, fora da tomada.",
    ],
    [
      "Qual foi o caminho até o código funcionar na placa?",
      [
        "O código foi escrito direto na placa, sem simulação",
        "Primeiro o circuito físico, depois a programação",
        "Blocos em DEV, simulação no Tinkercad e depois o código na Arduino IDE",
        "O projeto só existiu no Tinkercad",
      ],
      2,
      "Nas aulas de Desenvolvimento de Sistemas a equipe começou programando em blocos e fazendo jogos, montou e simulou o circuito do Arduino no Tinkercad e depois levou o código para a placa física pela Arduino IDE.",
    ],
    [
      "Na placa de ilhais, o que faz o contato elétrico entre o fio e a placa?",
      ["A cola", "O estanho da solda", "O alicate de corte", "O suporte do ferro"],
      1,
      "A solda derretida une o fio ao anel de cobre do furo: ela segura mecanicamente e conduz corrente ao mesmo tempo.",
    ],
    [
      "O que ainda não foi informado pela equipe sobre o Sentinela?",
      [
        "O nome do projeto",
        "Qual sensor foi usado",
        "O valor numérico do limite programado e a autonomia das pilhas",
        "Quem são os integrantes da equipe",
      ],
      2,
      "O site afirma só o que a equipe informou: o sensor é o MQ-2, o controlador é o Arduino, a alimentação é feita com quatro pilhas AAA e o conjunto tem suporte para o braço. Já o valor do limite no código, a autonomia e o material do suporte continuam marcados como não informados.",
    ],
  ];
  const quiz = $("#quiz-area");
  let qi = 0,
    pontos = 0;
  function pergunta() {
    const q = Q[qi];
    quiz.innerHTML = "";
    const prog = el("progress", "progresso");
    prog.max = Q.length;
    prog.value = qi;
    prog.setAttribute("aria-label", "Progresso do quiz");
    const info = el(
      "p",
      "nota",
      "Pergunta " + (qi + 1) + " de " + Q.length + " | Acertos: " + pontos,
    );
    const tit = el("h3", "", q[0]);
    const ops = el("div", "opcoes");
    const fb = el("p", "fb");
    fb.setAttribute("role", "status");
    const prox = el(
      "button",
      "btn",
      qi === Q.length - 1 ? "Ver resultado" : "Próxima pergunta",
    );
    prox.type = "button";
    prox.hidden = true;
    q[1].forEach((txt, i) => {
      const b = el("button", "opcao", txt);
      b.type = "button";
      b.addEventListener("click", () => {
        const ok = i === q[2];
        if (ok) pontos++;
        $$(".opcao", ops).forEach((o, j) => {
          o.disabled = true;
          if (j === q[2]) o.classList.add("certa");
          else if (j === i) o.classList.add("errada");
        });
        fb.textContent = (ok ? "Correto! " : "Não foi dessa vez. ") + q[3];
        prox.hidden = false;
        prox.focus();
        if (ok) {
          robo(
            sorteia([
              "Mandou bem!",
              "Acertou! Você está pegando o jeito.",
              "Isso mesmo!",
            ]),
            "clap",
          );
        } else {
          robo(
            sorteia([
              "Quase! Leia a explicação e tente a próxima.",
              "Errar faz parte. Veja a explicação!",
            ]),
            "think",
          );
        }
      });
      ops.append(b);
    });
    prox.addEventListener("click", () => {
      qi++;
      if (qi < Q.length) pergunta();
      else resultado();
    });
    quiz.append(prog, info, tit, ops, fb, prox);
  }
  function resultado() {
    quiz.innerHTML = "";
    const msg =
      pontos >= 9
        ? "Excelente! Você domina o assunto."
        : pontos >= 6
          ? "Bom trabalho! Reveja as explicações e tente de novo."
          : "Vale rever as seções do site e refazer o quiz.";
    const p = el("p", "placar", pontos + " de " + Q.length);
    p.setAttribute("role", "status");
    const r = el("button", "btn", "Refazer o quiz");
    r.type = "button";
    r.addEventListener("click", () => {
      qi = 0;
      pontos = 0;
      pergunta();
    });
    quiz.append(el("h3", "", "Resultado final"), p, el("p", "", msg), r);
    robo(
      pontos >= 6
        ? "Quiz concluído! Parabéns pelo resultado!"
        : "Quiz concluído! Bora revisar e tentar de novo?",
      pontos >= 6 ? "happy" : "wink",
    );
  }
  pergunta();

  const txt = (n) => (n ? n.textContent.replace(/\s+/g, " ").trim() : "");
  const SECS = $$("main section").map((s) => s.id);
  const nomeSecao = (id) => {
    const s = document.getElementById(id);
    return (s && txt($("h2", s))) || id;
  };
  const norm = (s) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
  const PARAR = new Set(
    "a o as os um uma uns umas de do da dos das em no na nos nas e ou que com para por sem ao aos se sao ser tem ter faz fazer mais menos muito pouca pouco qual quais quando onde quem como tambem entao esse essa isso este esta aquilo aquele eu voce ele ela eles elas ha sobre entre desde ate cada todo toda todos todas meu minha seu sua nosso nossa dele dela vamos pode quero queria diga fala explica mim voce me te lhe".split(
      " ",
    ),
  );
  const palavras = (s) => {
    const out = [];
    norm(s)
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .forEach((w) => {
        if (!w || PARAR.has(w)) return;
        if (w.length === 1 && !/[0-9]/.test(w) && w !== "n" && w !== "r") return;
        out.push(w);
      });
    return out;
  };
  const perto = (a, b) =>
    a === b ||
    (a.length > 4 && b.length > 4 && (a.startsWith(b) || b.startsWith(a)));

  const GRUPOS = [
    ["sentinela", "projeto", "senai", "sobre", "objetivo"],
    ["gas", "gases", "vazamento", "fuga", "concentracao", "ar", "ambiente"],
    [
      "sensor",
      "sensores",
      "modulo",
      "detector",
      "detectar",
      "medir",
      "leitura",
      "medida",
    ],
    [
      "limite",
      "disparo",
      "faixa",
      "nivel",
      "referencia",
      "comparar",
      "comparador",
      "threshold",
    ],
    ["alarme", "alerta", "avisar", "aviso", "disparar", "acionar", "acionado"],
    ["apito", "apitar", "bipe", "buzzer", "som", "sonoro", "audio", "barulho"],
    [
      "vibracao",
      "vibrar",
      "vibrador",
      "tremor",
      "tremer",
      "tatil",
      "toque",
      "tato",
      "sentir",
    ],
    [
      "arduino",
      "microcontrolador",
      "tinkercad",
      "ide",
      "programacao",
      "programa",
      "codigo",
      "sketch",
      "blocos",
      "bloco",
      "dev",
      "simulacao",
      "simular",
    ],
    [
      "bracadeira",
      "braçadeira",
      "vestivel",
      "braco",
      "punho",
      "pulso",
      "corpo",
      "fixacao",
      "fecho",
      "suporte",
      "suportes",
      "usuario",
      "usuarios",
      "pessoa",
      "pessoas",
    ],
    [
      "saida",
      "saidas",
      "digital",
      "digitais",
      "pino",
      "pinos",
      "conector",
      "encaixe",
      "cabecalho",
      "header",
    ],
    [
      "quimica",
      "risco",
      "riscos",
      "exposicao",
      "toxico",
      "inflamavel",
      "explosivo",
      "fumaca",
      "odorizante",
      "cheiro",
    ],
    [
      "mq",
      "mq2",
      "oxido",
      "metalico",
      "semicondutor",
      "capsula",
      "sensibilidade",
    ],
    [
      "placa",
      "ilhais",
      "ilhal",
      "perfurada",
      "fenolica",
      "plaqueta",
    ],
    ["solda", "soldar", "soldagem", "estanho", "ferro", "soldado", "pontos"],
    ["fio", "fios", "decapar", "descascar", "ligacao", "conectar", "cabo"],
    [
      "alicate",
      "corte",
      "diagonal",
      "bico",
      "ferramenta",
      "ferramentas",
      "bancada",
      "suporte",
    ],
    ["resistor", "resistores", "corrente", "tensao", "volts", "amperes", "lei"],
    ["circuito", "eletronica", "eletrico", "sinal", "controle", "controles"],
    [
      "bateria",
      "pilha",
      "pilhas",
      "aaa",
      "serie",
      "energia",
      "autonomia",
      "alimentacao",
      "alimentar",
      "tensao",
      "ligar",
      "desligar",
      "chave",
    ],
    ["led", "leds", "luz", "luminoso", "visual", "pisca"],
    ["ventilacao", "janela", "abrir", "arejar", "seguranca", "cuidado", "risco"],
    ["cozinha", "fogao", "botijao", "gaslp", "glp", "natural", "canaliza"],
    ["montagem", "montar", "etapa", "etapas", "fase", "pronto", "concluido"],
    ["prototipo", "modelo", "maquete", "demonstracao", "prova", "teste"],
    ["componente", "componentes", "peca", "pecas", "item", "parte", "partes"],
    ["equipe", "aluno", "alunos", "grupo", "nome", "nomes", "integrantes", "quemfez"],
    ["professor", "orientador", "orientadora", "avaliacao", "banca", "lucas"],
    ["teste", "testar", "resultado", "resultados", "funcionou", "falha", "problema", "erro"],
    [
      "medida",
      "medidas",
      "dimensao",
      "tamanho",
      "tamanhos",
      "milimetro",
      "numero",
      "numeros",
      "quantos",
      "quantas",
      "quanto",
    ],
    ["custo", "preco", "valor", "gasto", "investimento"],
    ["tempo", "duracao", "prazo", "horas", "semanas", "cronograma"],
    ["porcentagem", "percentual", "escala", "ponto", "porcento"],
    ["sensibilidade", "calibracao", "calibrar", "ajuste", "ajustar", "precisao"],
    ["falso", "positivo", "negativo", "ignoram", "confiavel", "confianca"],
    ["gaso", "monoxido", "carboxico", "co2", "dioxido", "inflammavel", "explosivo"],
    ["simulador", "demo", "demonstracao", "animacao", "desenho", "botao", "slider"],
    ["galeria", "foto", "fotos", "imagem", "imagens", "legenda", "album"],
    ["quiz", "pergunta", "perguntas", "questao", "questoes", "acerto", "placar"],
    ["site", "pagina", "secao", "secoes", "conteudo", "texto", "aba"],
    ["carro", "veiculo", "garagem", "oficina", "motor", "gasolina"],
    ["desgaste", "calor", "temperatura", "aquecimento", "resistencia"],
    ["diferenca", "comparar", "melhor", "pior", "vantagem", "limitacao"],
  ];

  const GUIA = [
    [
      "O que é este projeto",
      "projeto site senai educativa trabalho resumo sobre o que e objetivo inicio sentinela",
      "Este site explica, de forma interativa, o Projeto Sentinela: uma braçadeira com sensor de gás MQ-2 e Arduino que aciona buzzer e motor de vibração quando a leitura passa do limite programado. É um projeto educativo desenvolvido no SENAI, com as seções Como funciona, Componentes, Materiais e fabricação, Galeria da montagem, Demonstração do alarme e Quiz.",
      "O projeto nasceu nas aulas de Química, estudando os gases e os riscos à saúde, e passou pelas aulas de DEV: programação em blocos e jogos, simulação no Tinkercad e código gravado na placa pela Arduino IDE.",
    ],
    [
      "Para que serve o Sentinela",
      "para que serve funcao objetivo principal detector gas avisar braçadeira bracadeira",
      "O Sentinela é uma braçadeira que a pessoa usa no braço. O sensor mede a concentração de gás no ar, o Arduino compara essa leitura com o limite definido na programação, e ao passar do limite o sistema liga o buzzer e o motor de vibração ao mesmo tempo.",
      "O aparelho não fecha o registro nem conserta o vazamento: ele avisa. A reação depois do aviso é desligar a fonte, ventilar o ambiente e sair do local se o alarme continuar.",
    ],
    [
      "De onde veio a ideia",
      "por que precisa motivo ideia origem quimica aula risco saude exposicao quem usa",
      "A ideia veio das aulas de Química, quando a equipe estudou os gases e os riscos que eles trazem para a saúde: dependendo do tipo de gás, da concentração e do tempo de exposição, o efeito pode ser grave ou até fatal.",
      "Daí veio um detector que a pessoa usa no próprio corpo: ele não depende do cheiro nem de estar perto de um alarme fixo, porque o aviso chega no braço de quem está usando.",
    ],
    [
      "Como o sensor mede o ar",
      "sensor como funciona mede gas resistencia eletrica leitura modulo detector mq2 mq",
      "O modelo usado é o MQ-2, um sensor de gás de semicondutor de óxido metálico. Quando as moléculas de gás encostam na superfície sensível, a resistência elétrica muda, e é essa mudança que o Arduino lê: quanto mais gás, maior a variação.",
      "O MQ-2 é sensível a gases inflamáveis como GLP, propano, butano, metano e hidrogênio, além de álcool e fumaça. Sensores desse tipo precisam de alguns segundos de aquecimento antes de ler com estabilidade.",
    ],
    [
      "O limite de disparo",
      "limite disparo threshold faixa nivel referencia quando apita comparacao programacao",
      "O limite é um valor definido na programação do Arduino. Abaixo dele a placa só lê o sensor; ao passar dele, o programa aciona as duas saídas digitais de alerta. Na demonstração deste site o limite aparece em 40% da escala e a faixa de aviso começa em 24%.",
      "O valor numérico programado pela equipe não foi informado, então os 40% da demonstração são um valor de estudo. Um limite baixo demais faz o aparelho disparar à toa; alto demais deixa de avisar antes do perigo.",
    ],
    [
      "O alerta sonoro",
      "apito som buzzer sonoro barulho audio alto intermitente",
      "O buzzer está ligado a uma saída digital do Arduino. Quando o programa aciona essa saída, ele emite o apito: o aviso sonoro que chama atenção de quem está perto e de quem está em outro ambiente.",
      "Um aviso sonoro precisa ser intermitente, e não contínuo: o som que para de mudar é o som que o cérebro deixa de notar depois de alguns segundos.",
    ],
    [
      "O alerta tátil",
      "vibracao vibrador tatil tremor toque sentir pele braco pulso braçadeira bracadeira",
      "O motor de vibração está na outra saída digital e dispara junto com o buzzer. Como a braçadeira fica no braço, o tremor chega direto na pele: é o aviso que funciona mesmo em um ambiente com muito ruído, onde o apito fica difícil de ouvir.",
      "Esse é o motivo de o projeto usar dois avisos em vez de um só: o som alcança quem está por perto, e a vibração alcança quem está usando o aparelho, não importa o barulho em volta.",
    ],
    [
      "Por que os dois avisos juntos",
      "dois avisos juntos porque som vibracao os dois mesmo tempo",
      "Som e vibração não são alternativas um do outro no Sentinela: os dois disparam ao mesmo tempo, porque estão em saídas digitais diferentes e o programa liga as duas de uma vez.",
      "Se a braçadeira tivesse só apito, um ambiente barulhento abafaria o aviso. Se tivesse só vibração, quem está por perto não seria chamado. Os dois canais cobrem situações diferentes.",
    ],
    [
      "Falso alarme",
      "falso alarme dispara toa confianca ignora problema ajuste",
      "Um alarme que dispara à toa é um problema de segurança, não um detalhe: as pessoas passam a ignorar o aviso que importa e a desligar o aparelho.",
      "Por isso o valor do limite precisa ser definido com cuidado na programação e por isso a braçadeira é avisada antes do disparo na demonstração: o limite tem de bater com o ambiente onde o aparelho vai ser usado.",
    ],
    [
      "O Arduino como controle",
      "circuito controle cerebro decide arduino microcontrolador sinal saidas programa codigo",
      "O Arduino é o cérebro do Sentinela: ele lê os valores que o MQ-2 envia, compara cada leitura com o limite definido no programa e, ao ultrapassar o limite, aciona as saídas digitais que ligam o buzzer e o motor de vibração.",
      "O modelo exato da placa e em quais pinos o sensor, o buzzer e o motor foram ligados não foram informados pela equipe. O programa é escrito na Arduino IDE, depois de simulado no Tinkercad.",
    ],
    [
      "Do bloco ao código: como o projeto foi programado",
      "tinkercad ide programacao como programar simulacao antes fisica simulador programar codigo",
      "O caminho de programação foi em três etapas, seguido nas aulas de DEV: primeiro a lógica em blocos, com jogos; depois o programa do Arduino montado e simulado no Tinkercad; por fim o código escrito na Arduino IDE e enviado para a placa física.",
      "Simular antes de montar economiza peças e tempo de bancada: no Tinkercad dá para ver o sensor, as saídas e o disparo funcionando na tela e corrigir a lógica antes de gravar na placa.",
    ],
    [
      "De onde vem a energia",
      "energia pilha bateria alimentacao alimentado quantos volts aaa serie autonomia durar",
      "O circuito é alimentado por quatro pilhas AAA ligadas em série, que fornecem aproximadamente 6 volts. Usar pilhas em vez de tomada é o que permite levar a braçadeira no braço.",
      "A autonomia, o consumo de cada peça e a forma como as pilhas ficam presas na braçadeira não foram informados pela equipe.",
    ],
    [
      "Como o aparelho é usado",
      "braçadeira bracadeira braco usar vestir vestivel corpo peso tamanho como usa onde fica fecho suporte",
      "O Sentinela é vestível: a equipe confirma que o conjunto tem suporte para o braço, e é ele que prende o módulo no corpo com a cápsula do MQ-2 em contato com o ar. Como o suporte fica em contato direto com a pele, é por ele que o usuário sente a vibração quando o alarme dispara.",
      "O material do suporte, o tipo de fecho e o peso final do conjunto não foram informados pela equipe.",
    ],
    [
      "A placa de ilhais",
      "placa ilhais ilhal fenolica perfurada base montagem onde solda",
      "A placa de ilhais é a base da montagem: uma placa furada, com anéis de cobre em volta de cada furo, onde os componentes são apoiados e soldados um a um.",
      "Ela não tem trilhas prontas: quem faz o caminho elétrico é a solda e o pedaço de fio entre cada ponto. Isso dá liberdade para montar qualquer circuito, mas cobra atenção em cada ligação.",
    ],
    [
      "Como se faz uma solda",
      "solda soldar soldagem estanho ferro como faz ponto quente processo",
      "Aquece-se o ilhál e o fio com a ponta do ferro, encosta-se o estanho na junção e espera-se escorrer e cobrir o furo. Depois disso tudo é não mexer na peça até a solda esfriar.",
      "O calor vem da peça, não do estanho: encostar o fio de solda na ponta do ferro só forma uma bola fria por cima do contato. Uma boa solda fica brilhante e molha o anel de cobre inteiro.",
    ],
    [
      "Solda fria e mau contato",
      "solda fria opaca granulada falha mau contato quebra problema conserto",
      "Solda opaca e granulada, feita com a peça se mexendo ou sem calor suficiente, é a solda fria. Ela parece ligada, mas o contato elétrico é ruim e a peça solta com o tempo e com a vibração da bancada.",
      "Em um detector de gás, um ponto frio não é um detalhe estético: é o caminho por onde o aviso pode deixar de passar. Todo ponto duvidoso é refazer antes de ligar as pilhas.",
    ],
    [
      "Pinos e conectores",
      "pinos pino conector encaixe tirar modulo trocar fileira solda pinos",
      "A fileira de pinos soldada na placa cria pontos de ligação firmes por onde os módulos encaixam e podem ser tirados.",
      "Com pinos, trocar um módulo queimado é tirar e encaixar outro. Sem pinos, cada troca exige dessoldar fio por fio, e é assim que uma placa de ilhais se destrói no reparo.",
    ],
    [
      "Fios: corte e decapagem",
      "fio fios cortar corte decapar descascar comprimento tamanho alicate",
      "Cada fio é cortado no tamanho exato e depois decapado: a ponta de plástico é retirada para expor o cobre antes da solda. Fio sobrando atrapalha a solda e fio curto não alcança o componente.",
      "O alicate de diagonal corta; o alicate de bico segura a peça enquanto a solda esfria. É por isso que a solda em dupla funciona bem: uma pessoa aplica o ferro e o estanho e a outra posiciona e segura a peça, sem que ninguém queime o dedo.",
    ],
    [
      "Ferramentas e segurança na bancada",
      "ferramentas bancada ferro suporte alicate seguranca cuidado risco ventilacao",
      "Na bancada estão o ferro de solda com suporte espiral, o alicate de corte e o alicate de bico. O suporte do ferro existe para que a ponta quente nunca encoste na mesa nem na mão de ninguém.",
      "Trabalhar em local ventilado, não deixar o ferro sozinho ligado e conferir cada ponto depois que esfriar são os três cuidados que a equipe segue na montagem.",
    ],
    [
      "Materiais da montagem",
      "materiais material solda placa ilhais fios pinos sensor mq2 arduino buzzer vibrador resistor pilha fabricacao montagem insumos pecas usado usada usados estao",
      "A tabela de materiais lista: placa de ilhais perfurada, fios flexíveis, solda de estanho, pinos e conectores, o módulo sensor de gás MQ-2, a placa Arduino, o buzzer e o motor de vibração, os resistores e componentes de apoio, quatro pilhas AAA em série e o suporte da braçadeira.",
      "As quantidades e as marcas de cada peça não foram informadas pela equipe, nem o modelo exato do Arduino. A ordem de montagem é cortar e decapar os fios, soldar pinos e componentes, ligar o módulo e o Arduino e só depois conectar as pilhas.",
    ],
    [
      "Estado atual da montagem",
      "estado fase andamento prototipo falta terminar quando fica prazo pronto pronta ainda etapa etapas montagem bancada projeto concluido",
      "O protótipo está em fase de montagem na bancada: o trabalho mostrado até agora é o corte e a decapagem dos fios, a solda na placa de ilhais e o módulo do detector com as ligações prontas. O projeto já tem suporte para o braço.",
      "O prazo de conclusão e o material e o tipo de fecho do suporte não foram informados pela equipe. As fotos da montagem estão em manutenção na galeria.",
    ],
    [
      "Como usar a demonstração",
      "demo demonstracao simulador como usar botao slider concentracao apito vibracao",
      "Na demonstração, arraste a barra de concentração de gás ou use os botões de cenário. A barra do topo mostra a leitura e a marca do limite; quando a leitura passa do limite, o LED pisca, a braçadeira no braço treme e as ondas sonoras aparecem.",
      "O apito só toca depois que você liga o botão Apito, porque o som depende de um clique seu para existir. O botão Vibração liga e desliga o tremor no desenho. Os 40% da barra são um valor de estudo: o número programado no Arduino não foi informado.",
    ],
    [
      "Como está a galeria",
      "galeria fotos legenda imagem album montagem soldando bancada manutencao voltar",
      "A galeria está em manutenção: as fotos da montagem na bancada estão sendo atualizadas pela equipe e em breve voltamos com as imagens. No lugar delas há um aviso com atalhos para a Demonstração do alarme e para o Quiz.",
      "Enquanto as fotos não voltam, a explicação das peças e das etapas está nas seções Componentes, Como funciona e Materiais e fabricação, e o comportamento do alarme dá para ver na demonstração.",
    ],
    [
      "Sobre o quiz",
      "quiz perguntas quantas funciona teste nota",
      "O quiz tem 10 perguntas sobre o Sentinela, com feedback e explicação em cada resposta e placar no final. Aqui no chat também posso fazer uma pergunta do quiz: use /quiz.",
      "As perguntas cobrem o que é a braçadeira, a origem da ideia nas aulas de Química, o papel do MQ-2, o limite programado no Arduino, por que a vibração acompanha o apito, as saídas digitais, as quatro pilhas AAA, o caminho do bloco ao código, a solda na placa de ilhais e o que ainda não foi informado.",
    ],
    [
      "Dados que a equipe ainda não informou",
      "dados equipe medida quantidade modelo real resultado custo tempo preenchido vazio nao informado",
      "Não tenho essa informação do projeto. O que já está definido: o sensor é o MQ-2, o controle é um Arduino, os avisos são buzzer e motor de vibração em duas saídas digitais, a alimentação é feita por quatro pilhas AAA em série (cerca de 6 volts) e o conjunto tem suporte para o braço. Ficam marcados como não informados o valor numérico do limite programado, a autonomia das pilhas, o modelo da placa e os pinos usados, o material e o tipo de fecho do suporte, as quantidades e o prazo de conclusão. Se a equipe tiver esse número, registre com /nota título | texto: depois disso eu passo a responder com ele.",
      "Enquanto o dado não está no site, posso explicar o princípio: como o MQ-2 mede, o que o Arduino compara, por que o aviso é duplo e como se faz a solda na placa.",
      true,
    ],
    [
      "Explicando para quem está começando",
      "iniciante simples facil crianca nao entendi explica melhor resumo pratico analogia",
      "Pense em um detector de fumaça: ele não vê o fogo, ele mede o ar e grita quando o resultado passa de um limite. O Sentinela faz o mesmo com o gás, mas usa um truque a mais: ele é uma braçadeira, então o aviso treme em cima do braço de quem está usando a peça.",
      "Resumindo: MQ-2 = o sentido que mede o ar; Arduino = quem lê e compara com o limite do programa; buzzer = o aviso sonoro; motor de vibração = o aviso na pele. Os dois últimos estão em saídas digitais e disparam juntos.",
    ],
    [
      "O que também influencia",
      "aviso limitacoes ventilacao distancia temperatura ambiente influencia erro",
      "A leitura real depende do tipo de gás, da ventilação do ambiente, da distância até o ponto do vazamento, da temperatura e da posição do sensor. O gás mais leve que o ar sobe; o mais pesado desce e acumula no piso.",
      "Por isso as explicações daqui são conceituais: servem para entender o princípio do detector, não para calcular nem para certificar um produto de segurança.",
    ],
  ];

  const notas = ler("senti_notas", []);

  function linhaMats() {
    return $$("tr", corpoMat).map((tr) =>
      $$("th, td", tr).map((c) => txt(c)),
    );
  }

  function colher() {
    const out = [];
    SECS.forEach((id) => {
      const sec = document.getElementById(id);
      const onde = nomeSecao(id);
      $$(".card", sec).forEach((c) => {
        if (c.closest("#quiz-area") || c.classList.contains("sim-ctl")) return;
        out.push({
          titulo: "",
          bloco: txt($("h3", c)),
          corpo: $$("p", c).map(txt).filter(Boolean).join(" "),
          tags: palavras(c.textContent),
          peso: 1,
          onde,
        });
      });
      $$("p, li", sec).forEach((p) => {
        if (p.closest(".card") || p.closest("#quiz-area")) return;
        if (p.classList.contains("intro")) return;
        out.push({
          titulo: "",
          corpo: txt(p),
          tags: palavras(p.textContent),
          peso: 0.95,
          onde,
        });
      });
    });
    $$(".galeria figcaption").forEach((c) => {
      const t = txt(c);
      if (t.length > 3)
        out.push({
          titulo: "",
          bloco: "Legenda de foto",
          corpo: "Na foto da galeria da montagem: " + t,
          tags: palavras(t),
          peso: 1.35,
          num: true,
          onde: nomeSecao("galeria"),
        });
    });
    $$(".rodape p, .rodape li").forEach((p) =>
      out.push({
        titulo: "",
        corpo: txt(p),
        tags: palavras(p.textContent),
        peso: 1,
        onde: "Sobre o projeto",
      }),
    );
    return out;
  }

  function fontes() {
    const lista = [];
    const vistos = new Set();
    function push(f) {
      const chave = norm(f.corpo);
      if (!chave || vistos.has(chave)) return;
      if (palavras(f.corpo).length < 2 && !f.titulo) return;
      vistos.add(chave);
      lista.push(f);
    }
    GUIA.forEach((g) =>
      push({
        titulo: g[0],
        corpo: g[2],
        fundo: g[3],
        tags: palavras(g[1]),
        peso: 1.7,
        guia: true,
        alerta: !!g[4],
      }),
    );
    COMP.forEach((c) =>
      push({
        titulo: c[0],
        corpo:
          "Função: " +
          c[1] +
          " Na nossa montagem: " +
          c[2] +
          (c[4]
            ? " Essa peça já está na nossa montagem."
            : " Essa peça ainda não está na nossa montagem."),
        tags: palavras(c[0] + " " + c[1] + " " + c[2]),
        peso: 1.5,
        onde: nomeSecao("componentes"),
      }),
    );
    Object.keys(ESTADOS).forEach((k) => {
      const e = ESTADOS[k];
      push({
        titulo: e.t,
        corpo: e.d,
        fundo: e.e,
        tags: palavras(e.t + " " + e.r + " " + e.d),
        peso: 1.5,
        onde: nomeSecao("demo"),
      });
    });
    Q.forEach((q) =>
      push({
        titulo: "",
        bloco: q[0],
        corpo: q[3],
        tags: palavras(q[0] + " " + q[1][q[2]] + " " + q[3]),
        peso: 1.05,
        onde: nomeSecao("quiz"),
      }),
    );
    linhaMats().forEach((r) => {
      if (!r[0]) return;
      const partes = COLS.map((nome, i) =>
        r[i] ? nome + ": " + r[i] : "",
      ).filter(Boolean);
      push({
        titulo: "",
        corpo: partes.join(" | "),
        tags: palavras(partes.join(" ")),
        peso: 1.25,
        onde: nomeSecao("materiais"),
      });
    });
    notas.forEach((n) =>
      push({
        titulo: n[0],
        corpo: n[1],
        tags: palavras(n[0] + " " + n[1]),
        peso: 1.9,
        num: true,
        anota: true,
      }),
    );
    colher().forEach(push);
    return lista;
  }

  function buscar(texto, limite) {
    const qs = [...new Set(palavras(texto))];
    if (!qs.length) return [];
    const pesos = new Map();
    qs.forEach((t) => pesos.set(t, 1));
    qs.forEach((t) => {
      const g = GRUPOS.find((x) => x.some((w) => perto(w, t)));
      if (g)
        g.forEach((s) => {
          if (!pesos.has(s)) pesos.set(s, 0.4);
        });
    });
    const marc = [];
    fontes().forEach((f) => {
      const toks = palavras(
        f.corpo + " " + f.titulo + " " + (f.bloco || "") + " " + (f.onde || ""),
      );
      const ach = [];
      pesos.forEach((peso, t) => {
        if (f.tags.some((x) => perto(t, x))) ach.push(peso * 1.6);
        else if (toks.some((d) => perto(t, d))) ach.push(peso);
      });
      if (!ach.length || !ach.some((p) => p >= 1)) return;
      let pt = ach.reduce((s, p) => s + p, 0);
      if (ach.length === pesos.size) pt *= 1.5;
      pt /= Math.sqrt(1 + toks.length / 45);
      pt *= f.peso || 1;
      marc.push({ f, pt });
    });
    marc.sort((a, b) => b.pt - a.pt);
    return marc.slice(0, limite || 3);
  }

  function comTitulo(f, base) {
    if (!f.titulo || norm(base).split(" ")[0] === norm(f.titulo).split(" ")[0])
      return base;
    return f.titulo + ": " + base;
  }
  function fala(f) {
    let s = comTitulo(f, f.corpo);
    if (f.anota) s += " Vem da anotação que a equipe registrou neste navegador.";
    else if (f.onde)
      s +=
        " Está na seção \"" +
        f.onde +
        "\"" +
        (f.bloco ? " (" + f.bloco + ")" : "") +
        " do site.";
    return s;
  }

  const PREF = ["Boa pergunta! ", "Vamos lá: ", "Olha só: ", ""];
  const FALLBACK = [
    "Não encontrei esse assunto no conteúdo do site, e prefiro não inventar. Pergunte sobre o sensor MQ-2, o Arduino e o limite programado, o buzzer, a vibração no braço, as pilhas AAA, a braçadeira, o Tinkercad ou a soldagem na placa. Comandos: /ajuda.",
    "Isso não está no que eu conheço agora. Use /busca <palavra> para varrer o site todo, ou registre a informação com /nota título | texto.",
  ];
  const TEMAS =
    "braçadeira vestível com suporte para o braço, sensor MQ-2, Arduino e limite programado, saídas digitais, buzzer, motor de vibração, quatro pilhas AAA, Química e os riscos dos gases, Tinkercad e Arduino IDE, falso alarme, placa de ilhais, solda e solda fria, pinos, fios e ferramentas, materiais, demonstração do alarme, galeria em manutenção, quiz, equipe e dados do projeto.";
  const SUGERIDAS = [
    "O que é o Projeto Sentinela?",
    "Como o sensor MQ-2 mede o gás no ar?",
    "O que o Arduino faz com a leitura do sensor?",
    "Por que a braçadeira vibra além de apitar?",
    "De onde veio a ideia do projeto?",
    "Como o programa foi feito: blocos, Tinkercad e Arduino IDE?",
    "O que é um falso alarme e por que ele é perigoso?",
    "Como se faz uma boa solda na placa de ilhais?",
    "Quais materiais estão sendo usados na montagem?",
    "Me explica como se eu fosse iniciante.",
    "/ajuda",
  ];
  const ctx = { fila: [], ativa: null, fundo: false, ultima: "", prefixo: "" };
  const chat = $("#chat"),
    chatBtn = $("#chat-btn"),
    log = $("#chat-log"),
    form = $("#chat-form"),
    entrada = $("#chat-in");
  function msg(quem, t) {
    const p = el("p", "msg " + quem, t);
    log.append(p);
    log.scrollTop = log.scrollHeight;
    return p;
  }
  function perguntaRapida() {
    const q = sorteia(Q);
    msg("bot", "Vamos testar! " + q[0]);
    const caixa = el("div", "opcoes");
    q[1].forEach((t, i) => {
      const b = el("button", "opcao", t);
      b.type = "button";
      b.addEventListener("click", () => {
        $$(".opcao", caixa).forEach((o) => {
          o.disabled = true;
        });
        msg("eu", t);
        msg("bot", (i === q[2] ? "Correto! " : "Não foi dessa vez. ") + q[3]);
        gesto(i === q[2] ? "clap" : "think", 2500);
      });
      caixa.append(b);
    });
    log.append(caixa);
    log.scrollTop = log.scrollHeight;
  }
  const PEDIRMAS =
    /(conte mais|conta mais|fale mais|mais detalhes|detalha|aprofunda|explique melhor|explica melhor|por que isso|e por que|continua|pode repetir)/;
  const NUM =
    /(quantos|quantas|quanto|de quanto|em quanto|que medida|qual (o|a|e o|e a) (numero|valor|medida|tamanho|peso|custo|preco|prazo|duracao|modelo|quantidade)|quantidade)/;
  function responder(texto) {
    if (texto[0] === "/") {
      executar(texto);
      return;
    }
    msg("eu", texto);
    falarPergunta(texto);
    gesto("think", 1200);
    const n = norm(texto);
    setTimeout(() => {
      const sobreQuiz = /(quantas|quantos|como|onde|quando|o que|qual|por que|para que)/.test(
        n,
      );
      if (
        !sobreQuiz &&
        /(faca|fazer|quero|me).{0,14}(pergunta|quiz)|testar|quiz/.test(n)
      ) {
        perguntaRapida();
        return;
      }
      if (/o que (voce|tu) sabe|quais temas|sobre o que voce fala|me conhe/.test(n)) {
        const temas =
          "Eu leio todo o conteúdo deste site e respondo sobre: " +
          TEMAS +
          " Use /ajuda para ver os comandos.";
        msg("bot", temas);
        gesto("sparkle", 2200);
        return;
      }
      if (PEDIRMAS.test(n) && (ctx.fundo || ctx.fila.length)) {
        let alvo = null;
        if (ctx.ativa && ctx.ativa.fundo && !ctx.fundo) {
          alvo = ctx.ativa;
          ctx.fundo = true;
        } else if (ctx.fila.length) {
          alvo = ctx.fila.shift().f;
          ctx.ativa = alvo;
          ctx.fundo = !!alvo.fundo;
        }
        if (alvo) {
          const s = comTitulo(alvo, alvo.fundo || alvo.corpo);
          ctx.ultima = s;
          const d = alvo.fundo ? s : fala(alvo);
          msg("bot", d);
          gesto(alvo.fundo ? "think" : "sparkle", 2200);
          return;
        }
      }
      if (
        /comando/.test(n) &&
        /(quais|qual|lista|mostre|mostra|tem|existem|pode|conhece|ajuda)/.test(n)
      ) {
        msg(
          "bot",
          "Comandos que eu aceito:\n" +
            CMD.map((c) => "/" + c[0] + " — " + c[1]).join("\n"),
        );
        gesto("wave", 2200);
        return;
      }
      const top = buscar(texto, 5);
      if (!top.length) {
        ctx.fila = [];
        ctx.ativa = null;
        const d = sorteia(FALLBACK.filter((x) => x !== ctx.ultima));
        msg("bot", d);
        gesto("tilt", 2000);
        return;
      }
      ctx.fila = top.slice(1);
      ctx.ativa = top[0].f;
      ctx.fundo = false;
      let f = ctx.ativa;
      if (fala(f) === ctx.ultima && top[1]) {
        f = top[1].f;
        ctx.ativa = f;
        ctx.fila = top.slice(2);
      }
      let s = fala(f);
      if (NUM.test(n) && !f.num && !/[0-9]/.test(f.corpo) && !f.alerta) {
        s = fala(fontes().find((x) => x.alerta) || f) + " " + s;
      } else if (f.guia) {
        const pre = sorteia(PREF.filter((p) => p !== ctx.prefixo));
        ctx.prefixo = pre;
        s = pre + s;
      }
      const fundo = f.guia ? "" : "\n\nPergunta: " + texto;
      ctx.ultima = s;
      msg("bot", s + fundo);
      gesto(f.guia ? "happy" : "sparkle", 2200);
    }, 900);
  }

  const CMD = [
    [
      "ajuda",
      "mostra os comandos",
      () => ({
        msg:
          "Caixa de comando (digite com / na frente):\n" +
          CMD.map((c) => "/" + c[0] + " — " + c[1]).join("\n") +
          "\n\nFora dos comandos, é só escrever a dúvida: eu procuro a resposta em todo o conteúdo do site, nos cards, nas tabelas, no quiz e nas anotações da equipe.",
        g: "wave",
      }),
      ["help", "comandos", "listar"],
    ],
    [
      "gas",
      "mostra o aparelho numa concentração de gás: /gas 55",
      (a) => {
        const mapa = {
          limpo: 4,
          ar: 4,
          arlimpo: 4,
          seguro: 4,
          fogao: 28,
          cozinha: 28,
          rotina: 28,
          fuga: 55,
          pequena: 55,
          vazamento: 90,
          alarme: 90,
          limite: LIMITE,
          zero: 0,
        };
        if (!a)
          return {
            msg:
              "Diga a concentração em número, de 0 a 100, ou um cenário: limpo, fogão, fuga, vazamento. Exemplo: /gas 55. Na demonstração, o limite aparece em " +
              LIMITE +
              "% da escala e a faixa de aviso começa em " +
              AVISO +
              "%; são valores de estudo, porque o limite programado no Arduino não foi informado.",
            g: "tilt",
          };
        const n = Number(a);
        const alvo = isNaN(n) ? mapa[norm(a).replace(/[^a-z0-9]/g, "")] : n;
        if (alvo === undefined)
          return {
            msg:
              "Não entendi \"" +
              a +
              "\". Use um número de 0 a 100, como /gas 55, ou um cenário: limpo, fogão, fuga, vazamento.",
            g: "dizzy",
          };
        const estado = medir(alvo);
        document
          .getElementById("demo")
          .scrollIntoView({ behavior: "smooth", block: "start" });
        return {
          msg:
            alvo +
            "% da escala: " +
            ESTADOS[estado].r +
            ". " +
            ESTADOS[estado].d,
          g:
            estado === "alarme"
              ? "surprise"
              : estado === "atencao"
                ? "think"
                : "happy",
        };
      },
      ["concentracao", "nivel", "demo", "simule", "alarme", "demonstracao"],
    ],
    [
      "pecas",
      "lista as peças e suas funções",
      () => ({
        msg:
          "Peças descritas no site:\n" +
          COMP.map(
            (c) =>
              "- " +
              c[0] +
              ": " +
              c[1] +
              " " +
              (c[4] ? "(já está na montagem)" : "(ainda não está na montagem)"),
          ).join("\n"),
        g: "scan",
      }),
      ["componentes", "peca", "itens"],
    ],
    [
      "materiais",
      "lê a tabela de materiais da montagem",
      () => {
        const l = linhaMats().filter((r) => r[0]);
        return {
          msg:
            "Materiais da montagem:\n" +
            l
              .map((r) =>
                "- " +
                r.map((v, i) => (i ? COLS[i] + ": " + v : v)).join(" | "),
              )
              .join("\n") +
            "\n\nAs quantidades não foram informadas pela equipe.",
          g: "clap",
        };
      },
      ["material", "insumos", "tabela"],
    ],
    [
      "busca",
      "procura um termo em todo o site: /busca sensor",
      (a) => {
        if (!a)
          return {
            msg: "Escreva o termo depois de /busca. Exemplo: /busca sensor",
            g: "tilt",
          };
        const top = buscar(a, 6).filter((x, i, arr) => {
          const ini = norm(x.f.corpo).slice(0, 40);
          return arr.findIndex((y) => norm(y.f.corpo).slice(0, 40) === ini) === i;
        }).slice(0, 4);
        if (!top.length)
          return {
            msg: "Não achei \"" + a + "\" no conteúdo do site. Tente outra palavra, registre com /nota ou pergunte de outro jeito.",
            g: "dizzy",
          };
        return {
          msg:
            top.length +
            " trecho(s) sobre \"" +
            a +
            "\":\n\n" +
            top.map((x, i) => i + 1 + ". " + fala(x.f)).join("\n\n"),
          g: "sparkle",
        };
      },
      ["procura", "pesquisar", "buscar", "achar"],
    ],
    [
      "nota",
      "ensina uma informação nova ao robô: /nota título | texto",
      (a) => {
        if (!a)
          return {
            msg: notas.length
              ? "Anotações que a equipe já registrou:\n" +
                notas.map((n, i) => i + 1 + ". " + n[0] + ": " + n[1]).join("\n")
              : "Ainda não há anotações. Registre com /nota título | texto da informação.",
            g: "wink",
          };
        const p = a.split("|");
        const corpo = (p.length > 1 ? p[1] : p[0]).trim();
        const titulo = (p.length > 1 ? p[0] : "Anotação da equipe").trim();
        if (corpo.length < 5)
          return {
            msg: "Falta o texto da anotação. Formato: /nota " + titulo + " | informação nova",
            g: "dizzy",
          };
        notas.push([titulo, corpo]);
        gravar("senti_notas", notas);
        return {
          msg: "Anotado! Já posso responder sobre \"" + titulo + "\". Isso fica salvo neste navegador; para publicar no site, passe a informação para uma seção.",
          g: "love",
        };
      },
      ["anotacao", "aprender", "saber", "adicionar", "registrar"],
    ],
    [
      "apagar",
      "remove uma anotação pelo número: /apagar 1",
      (a) => {
        const i = Number(a) - 1;
        if (!(i >= 0) || i >= notas.length)
          return {
            msg: notas.length
              ? "Diga o número entre 1 e " + notas.length + ". Exemplo: /apagar 1"
              : "Não há anotações para apagar.",
            g: "tilt",
          };
        const r = notas.splice(i, 1)[0];
        gravar("senti_notas", notas);
        return { msg: "Removi a anotação \"" + r[0] + "\".", g: "nod" };
      },
      ["remover", "deletar", "esquecer"],
    ],
    [
      "quiz",
      "faz uma pergunta do quiz aqui no chat",
      () => {
        perguntaRapida();
        return { g: "bounce" };
      },
      ["pergunta", "testar", "questao"],
    ],
    [
      "resumo",
      "resume o projeto em poucas linhas",
      () => ({
        msg:
          "Resumo: " +
          (txt($("h1")) || "Projeto Sentinela") +
          ". É uma braçadeira com sensor de gás MQ-2 e Arduino: o programa compara a leitura com um limite e, ao passar dele, aciona em duas saídas digitais o buzzer e o motor de vibração, que alerta quem usa o aparelho mesmo no ruído. A ideia veio das aulas de Química e o código passou por blocos, Tinkercad e Arduino IDE; a alimentação é feita por quatro pilhas AAA em série, cerca de 6 volts, e o conjunto tem suporte para o braço. As " +
          SECS.length +
          " seções do site cobrem o princípio de funcionamento, os " +
          COMP.length +
          " componentes, os materiais e a soldagem na bancada, a galeria (em manutenção), a demonstração do alarme e um quiz de " +
          Q.length +
          " perguntas. Estou lendo " +
          fontes().length +
          " trechos deste site neste momento.",
        g: "salute",
      }),
      ["sobre", "projeto", "oqueeosite"],
    ],
    [
      "site",
      "lista as seções do site",
      () => ({
        msg:
          "Seções do site:\n" +
          SECS.map((id) => "- " + nomeSecao(id) + " (/ir " + id + ")").join(
            "\n",
          ),
        g: "scan",
      }),
      ["secoes", "paginas", "mapa"],
    ],
    [
      "ir",
      "rola até uma seção: /ir demo",
      (a) => {
        const q = norm(a);
        if (!q)
          return {
            msg: "Diga a seção. Opções: " + SECS.join(", "),
            g: "tilt",
          };
        const alvo =
          SECS.find((id) => perto(norm(id), q)) ||
          SECS.find((id) => norm(nomeSecao(id)).includes(q)) ||
          SECS.find((id) => q.includes(norm(id)));
        if (!alvo)
          return {
            msg: "Não achei essa seção. Opções: " + SECS.join(", "),
            g: "dizzy",
          };
        document
          .getElementById(alvo)
          .scrollIntoView({ behavior: "smooth", block: "start" });
        return { msg: "Te levei para " + nomeSecao(alvo) + ".", g: "fly" };
      },
      ["abrir", "vai", "navegar", "secao"],
    ],
    [
      "equipe",
      "mostra quem fez o projeto",
      () => {
        const nomes = $$(".rodape li").map(txt).filter(Boolean);
        return {
          msg: nomes.length
            ? "Equipe do projeto:\n" + nomes.map((n) => "- " + n).join("\n")
            : "Os nomes da equipe aparecem no rodapé do site.",
          g: "clap",
        };
      },
      ["quem", "integrantes", "alunos", "nomes"],
    ],
    [
      "temas",
      "lista os assuntos que eu respondo",
      () => ({
        msg:
          "Respondo sobre: " +
          TEMAS +
          " Hoje eu tenho " +
          fontes().length +
          " trechos indexados, incluindo " +
          notas.length +
          " anotação(ões) da equipe.",
        g: "sparkle",
      }),
      ["assuntos", "conteudo", "status"],
    ],
    [
      "topo",
      "volta ao início da página",
      () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return { msg: "De volta ao topo! Que vista.", g: "fly" };
      },
      ["inicio", "subir"],
    ],
    [
      "limpar",
      "apaga a conversa deste chat",
      () => {
        log.innerHTML = "";
        ctx.fila = [];
        ctx.ultima = "";
        return { msg: "Conversa limpa. Pode perguntar de novo.", g: "sparkle" };
      },
      ["clear", "resetar", "reiniciar"],
    ],
  ];

  function achaCmd(nome) {
    if (!nome) return CMD[0];
    const igual = (a) => norm(a) === nome;
    const comeca = (a) => norm(a).startsWith(nome);
    const termina = (a) => nome.startsWith(norm(a));
    return (
      CMD.find((c) => igual(c[0])) ||
      CMD.find((c) => (c[3] || []).some(igual)) ||
      CMD.find((c) => comeca(c[0])) ||
      CMD.find((c) => (c[3] || []).some(comeca)) ||
      (nome.length > 3 ? CMD.find((c) => termina(c[0])) : null)
    );
  }
  function executar(texto) {
    const m = /^\/([^\s]*)\s*([\s\S]*)$/.exec(texto);
    const nome = norm(m[1] || "").replace(/[^a-z0-9]/g, "");
    const resto = (m[2] || "").trim();
    msg("eu", texto).classList.add("cmd-user");
    falarPergunta(texto);
    const cmd = achaCmd(nome);
    setTimeout(() => {
      if (!cmd) {
        msg(
          "bot",
          "Não conheço o comando /" +
            m[1] +
            ". Digite /ajuda para ver os " +
            CMD.length +
            " comandos.",
        );
        gesto("tilt", 2000);
        return;
      }
      const r = cmd[2](resto);
      if (r && r.msg) msg("bot", r.msg);
      if (r && r.g) gesto(r.g, 2200);
    }, 600);
  }

  const chips = $("#chips");
  const chipsBtn = $("#chips-btn");
  function mostrarChips(mostrar) {
    chips.hidden = !mostrar;
    chipsBtn.setAttribute("aria-expanded", String(mostrar));
  }
  chipsBtn.addEventListener("click", () => mostrarChips(chips.hidden));
  SUGERIDAS.forEach((s) => {
    const b = el("button", "chip", s);
    b.type = "button";
    b.addEventListener("click", () => {
      responder(s);
      mostrarChips(false);
    });
    chips.append(b);
  });

  const cmdIn = $("#cmd-in");
  const cmdDicas = $("#cmd-dicas");
  const historico = [];
  let hIdx = -1;
  function pintarDicas(filtro) {
    cmdDicas.innerHTML = "";
    CMD.filter(
      (c) => !filtro || norm(c[0]).startsWith(filtro) || perto(norm(c[0]), filtro),
    )
      .slice(0, 7)
      .forEach((c) => {
        const b = el("button", "cmd-chip", "/" + c[0]);
        b.type = "button";
        b.title = c[1];
        b.setAttribute("aria-label", c[1]);
        b.addEventListener("click", () => {
          cmdIn.value = "/" + c[0] + " ";
          cmdIn.focus();
        });
        cmdDicas.append(b);
      });
  }
  function disparar(texto) {
    if (!texto) return;
    historico.push(texto);
    hIdx = historico.length;
    responder(texto);
  }
  cmdIn.addEventListener("input", () => {
    const v = cmdIn.value.trim();
    pintarDicas(v[0] === "/" ? norm(v.slice(1).split(" ")[0]) : "");
  });
  cmdIn.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const t = cmdIn.value.trim();
      cmdIn.value = "";
      pintarDicas("");
      disparar(t && t[0] === "/" ? t : "/" + t);
    } else if (e.key === "ArrowUp" && historico.length) {
      e.preventDefault();
      hIdx = Math.max(0, hIdx - 1);
      cmdIn.value = historico[hIdx];
    } else if (e.key === "ArrowDown" && historico.length) {
      e.preventDefault();
      hIdx = Math.min(historico.length, hIdx + 1);
      cmdIn.value = historico[hIdx] || "";
    }
  });
  $("#cmd-ir").addEventListener("click", () => {
    const t = cmdIn.value.trim();
    cmdIn.value = "";
    pintarDicas("");
    disparar(t && t[0] === "/" ? t : "/" + t);
  });
  pintarDicas("");

  let abriuUmaVez = false;
  function alternarChat(abrir) {
    chat.hidden = !abrir;
    chatBtn.setAttribute("aria-expanded", String(abrir));
    chatBtn.textContent = abrir ? "Fechar conversa" : "Perguntar ao professor";
    if (window.SenaiBot) window.SenaiBot.silenciar(abrir);
    if (abrir) {
      mostrarChips(false);
      if (!abriuUmaVez) {
        abriuUmaVez = true;
        msg(
          "bot",
          "Oi! Sou o Robô Professor. Já li todo este site e tenho " +
            fontes().length +
            " trechos na memória: escreva sua dúvida ou use a caixa de comando com /ajuda.",
        );
      }
      gesto("wave", 1800);
      entrada.focus();
    } else chatBtn.focus();
  }
  chatBtn.addEventListener("click", () => alternarChat(chat.hidden));
  $("#chat-x").addEventListener("click", () => alternarChat(false));
  chat.addEventListener("keydown", (e) => {
    if (e.key === "Escape") alternarChat(false);
  });
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const t = entrada.value.trim();
    if (!t) return;
    entrada.value = "";
    responder(t);
  });

  const FALAS_SECAO = {
    demo: [
      "Chegou à demonstração! Arraste a barra de gás e veja quando a braçadeira dispara.",
      "Aqui dá para ouvir o apito: ligue o botão Apito e passe dos " +
        LIMITE +
        "%.",
    ],
    componentes: [
      "Estas são as peças do Sentinela. Confira quais já estão na montagem da equipe!",
      "Cada peça tem uma função: o MQ-2 mede, o Arduino compara com o limite do programa, o buzzer apita e o motor treme no braço.",
    ],
    materiais: [
      "Materiais da montagem: placa de ilhais, fios, estanho, pinos, o módulo MQ-2, o Arduino, o buzzer, o motor de vibração e quatro pilhas AAA.",
    ],
    galeria: [
      "A galeria está em manutenção: as fotos da montagem na bancada estão sendo atualizadas e logo teremos imagens.",
    ],
    funcionamento: [
      "O Sentinela faz quatro coisas: o MQ-2 mede o ar, o Arduino compara com o limite programado, as saídas digitais ligam buzzer e motor, e o usuário sente o aviso no braço.",
      "A ideia veio das aulas de Química: o efeito do gás depende do tipo, da concentração e do tempo de exposição.",
    ],
    quiz: ["Hora do quiz! São 10 perguntas, e eu torço por você."],
  };
  if ("IntersectionObserver" in window) {
    const vistas = {};
    const obs = new IntersectionObserver(
      (itens) => {
        itens.forEach((it) => {
          const id = it.target.id;
          if (it.isIntersecting && !vistas[id]) {
            vistas[id] = true;
            setTimeout(
              () =>
                robo(
                  sorteia(FALAS_SECAO[id]),
                  id === "quiz" ? "bounce" : "think",
                ),
              600,
            );
          }
        });
      },
      { threshold: 0.45 },
    );
    Object.keys(FALAS_SECAO).forEach((id) => {
      const s = document.getElementById(id);
      if (s) obs.observe(s);
    });
  }
})();
