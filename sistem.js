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
      "Engrenagens",
      "Transmitem o movimento por dentes que se encaixam. Tamanhos diferentes criam relações de transmissão diferentes.",
      "Cada par de engrenagens define quanto o torque é multiplicado e quanto a rotação é reduzida em cada marcha.",
      '<circle cx="24" cy="24" r="14" stroke-width="6" stroke-dasharray="4.4 3.5"/><circle cx="24" cy="24" r="5"/>',
      true,
    ],
    [
      "Eixos",
      "Sustentam as engrenagens e conduzem o movimento: eixo de entrada, intermediário e de saída.",
      "O eixo de entrada recebe o movimento do motor e o eixo de saída o leva em direção às rodas.",
      '<path d="M4 24h40"/><rect x="14" y="14" width="6" height="20"/><rect x="28" y="18" width="6" height="12"/>',
      true,
    ],
    [
      "Rolamentos",
      "Apoiam os eixos e reduzem o atrito para que girem com facilidade.",
      "Ficam entre o eixo e a carcaça (ou entre peças que giram em velocidades diferentes), diminuindo perdas e aquecimento.",
      '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="8"/><circle cx="24" cy="12" r="2"/><circle cx="24" cy="36" r="2"/><circle cx="12" cy="24" r="2"/><circle cx="36" cy="24" r="2"/>',
      false,
    ],
    [
      "Garfos seletores",
      "Peças em forma de garfo que deslocam luvas ou engrenagens ao longo do eixo.",
      "Ao serem movidos pelo mecanismo de seleção, engatam o par de engrenagens da marcha escolhida.",
      '<path d="M10 8v14a14 14 0 0 0 28 0V8M24 36v8"/>',
      true,
    ],
    [
      "Mecanismo de seleção",
      "Conjunto de alavanca e hastes que leva o comando do condutor até os garfos.",
      "Traduz o movimento da alavanca (N, 1, 2, 3, 4, R) em deslocamento do garfo correto.",
      '<circle cx="24" cy="38" r="6"/><path d="M24 32L34 8"/><circle cx="34" cy="8" r="3"/>',
      true,
    ],
    [
      "Carcaça",
      "Estrutura que mantém eixos e rolamentos alinhados e protege o conjunto.",
      "Garante a distância correta entre os eixos, para que as engrenagens engrenem bem.",
      '<rect x="6" y="10" width="36" height="28" rx="5"/><circle cx="17" cy="26" r="4"/><circle cx="31" cy="26" r="4"/>',
      true,
    ],
    [
      "Sincronizadores",
      "Elementos que igualam as rotações entre a engrenagem e o eixo antes do engate, em muitos câmbios.",
      "Deixam a troca mais suave. Em modelos simplificados de estudo eles podem nem existir.",
      '<circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="10" stroke-dasharray="3 3"/>',
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
      ? "Está no nosso modelo físico"
      : "Não está no nosso modelo físico";
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

  const MARCHAS = {
    N: {
      t: "Neutro (N)",
      d: "Nenhuma marcha está engatada. As engrenagens da saída giram soltas no eixo, então não há transmissão de torque às rodas por uma marcha. O motor pode continuar funcionando.",
      e: "O eixo de entrada e o intermediário continuam girando juntos. Os detalhes variam conforme o sistema.",
      f: [
        "Neutro: o motor gira, mas nenhuma marcha leva a força até as rodas.",
      ],
    },
    1: {
      t: "1ª marcha",
      d: "Relação de transmissão alta: máxima multiplicação de torque e menor velocidade. É a marcha usada para arrancar e vencer ladeiras.",
      e: "Uma engrenagem pequena no eixo intermediário move uma grande no eixo de saída. A rotação cai e o torque aumenta.",
      f: [
        "Primeira! Muita força, pouca velocidade.",
        "Engatei a 1ª: ótima pra arrancar e subir ladeira.",
      ],
    },
    2: {
      t: "2ª marcha",
      d: "Relação ainda alta, mas menor que a da 1ª. Dá velocidade melhor mantendo boa força para acelerar.",
      e: "O par fica menos desigual: a engrenagem do eixo intermediário é maior e a de saída é menor que na 1ª.",
      f: ["Segunda: mais velocidade sem perder toda a força."],
    },
    3: {
      t: "3ª marcha",
      d: "Marcha mais longa: menos multiplicação de torque e mais velocidade para a mesma rotação do motor.",
      e: "As engrenagens do par ficam mais próximas em tamanho, e a redução de rotação diminui.",
      f: ["Terceira! Já entramos no ritmo de velocidade."],
    },
    4: {
      t: "4ª marcha",
      d: "A marcha mais longa deste câmbio: pouca multiplicação de torque e maior velocidade para uma dada rotação do motor, boa para manter a velocidade em retas.",
      e: "Nesta ilustração, o par é o que menos reduz a rotação. A relação real depende do projeto.",
      f: ["Quarta! Marcha longa pra estrada reta."],
    },
    R: {
      t: "Marcha à ré (R)",
      d: "Inverte o sentido de giro da saída, e o veículo se desloca para trás. Costuma usar uma relação curta, com bastante torque.",
      e: "Uma engrenagem intermediária extra (em laranja) fica entre o par e inverte o sentido de rotação da saída.",
      f: [
        "Ré: uma engrenagem extra inverte o giro.",
        "Marcha à ré! O sentido de rotação da saída foi invertido.",
      ],
    },
  };
  const PARES = {
    1: [34, 86],
    2: [48, 72],
    3: [62, 58],
    4: [72, 48],
    R: [40, 80],
  };
  const XS = { 1: 130, 2: 210, 3: 290, 4: 370, R: 450 };
  const svg = $("#sim-svg");
  let h = "";
  [70, 190, 310].forEach((y, i) => {
    h +=
      '<line class="eixo" x1="24" x2="516" y1="' +
      y +
      '" y2="' +
      y +
      '"/><line class="fluxo ' +
      ["f-ent", "f-int", "f-sai"][i] +
      '" x1="24" x2="516" y1="' +
      y +
      '" y2="' +
      y +
      '"/>';
  });
  h +=
    '<g class="fixa"><rect x="52" y="15" width="16" height="110" rx="3"/><rect x="52" y="125" width="16" height="130" rx="3"/></g>';
  Object.keys(PARES).forEach((k) => {
    const r = PARES[k],
      x = XS[k];
    h +=
      '<g class="par" data-m="' +
      k +
      '"><rect x="' +
      (x - 8) +
      '" y="' +
      (190 - r[0]) +
      '" width="16" height="' +
      r[0] * 2 +
      '" rx="3"/><rect x="' +
      (x - 8) +
      '" y="' +
      (310 - r[1]) +
      '" width="16" height="' +
      r[1] * 2 +
      '" rx="3"/>';
    if (k === "R")
      h +=
        '<rect class="idler" x="' +
        (x + 16) +
        '" y="212" width="12" height="36" rx="3"/>';
    h +=
      '<text class="rot" x="' +
      x +
      '" y="414">' +
      (k === "R" ? "R" : k + "ª") +
      "</text></g>";
  });
  svg.innerHTML = h;

  const PASSO = 44;
  const BASE_FLUXO = PASSO / 0.9;
  const fSai = $(".f-sai", svg);
  const giros = {};
  Object.keys(PARES).forEach((k) => {
    giros[k] = PARES[k][0] / PARES[k][1];
  });
  let giroAlvo = 0;
  let giroAtual = 0;
  let faseSai = 0;
  let tUltimo = 0;

  function girarSaida(agora) {
    const dt = Math.min((agora - tUltimo) / 1000, 0.05);
    tUltimo = agora;
    giroAtual += (giroAlvo - giroAtual) * Math.min(1, dt * 8);
    faseSai = (faseSai + giroAtual * BASE_FLUXO * dt) % PASSO;
    fSai.style.strokeDashoffset = (-faseSai).toFixed(2);
    requestAnimationFrame(girarSaida);
  }
  if (!semMovimento.matches) requestAnimationFrame(girarSaida);

  function engatar(id, quieto) {
    const m = MARCHAS[id];
    $$(".par", svg).forEach((p) =>
      p.classList.toggle("sel", p.dataset.m === id),
    );
    $$(".btn-marcha").forEach((b) =>
      b.setAttribute("aria-pressed", String(b.dataset.m === id)),
    );
    svg.classList.toggle("neutro", id === "N");
    giroAlvo = id === "N" ? 0 : (id === "R" ? -1 : 1) * giros[id];
    const st = $("#sim-status");
    const novo = st.cloneNode();
    novo.textContent =
      id === "N"
        ? "Neutro selecionado"
        : "Marcha engatada: " + (id === "R" ? "ré" : id + "ª");
    st.replaceWith(novo);
    $("#sim-titulo").textContent = m.t;
    $("#sim-txt").textContent = m.d;
    $("#sim-eng").textContent = m.e;
    if (!quieto) {
      robo(
        sorteia(m.f),
        id === "R" ? "surprise" : id === "N" ? "sleep" : "happy",
      );
    }
  }
  $$(".btn-marcha").forEach((b) =>
    b.addEventListener("click", () => engatar(b.dataset.m)),
  );
  engatar("N", true);

  const Q = [
    [
      "Qual é a principal função da caixa de câmbio?",
      [
        "Armazenar combustível para o motor",
        "Adaptar torque e rotação do motor à necessidade das rodas",
        "Resfriar o motor",
        "Reduzir o peso do veículo",
      ],
      1,
      "O câmbio oferece várias relações de transmissão, equilibrando torque e velocidade conforme a situação. Também permite neutro e ré.",
    ],
    [
      "Qual marcha é a mais indicada para arrancar em uma ladeira?",
      ["4ª marcha", "3ª marcha", "1ª marcha", "Neutro"],
      2,
      "A 1ª tem a maior relação de transmissão: multiplica mais o torque, ao custo de menor velocidade.",
    ],
    [
      "Uma engrenagem motora de 20 dentes move uma movida de 40 dentes. O que ocorre com a movida, ignorando perdas?",
      [
        "Gira com metade da rotação e cerca do dobro do torque",
        "Gira com o dobro da rotação e metade do torque",
        "Gira igual e com o mesmo torque",
        "Para de girar",
      ],
      0,
      "A relação é 40 ÷ 20 = 2. A rotação cai à metade e o torque dobra aproximadamente, pois a potência se conserva sem perdas.",
    ],
    [
      "Ao passar da 1ª para a 4ª marcha, a relação de transmissão geralmente...",
      ["Aumenta", "Diminui", "Fica sempre igual", "Inverte o sentido"],
      1,
      "Marchas mais longas têm relação menor: menos multiplicação de torque e mais velocidade para a mesma rotação do motor.",
    ],
    [
      "Conceitualmente, como a marcha à ré consegue inverter o sentido do movimento?",
      [
        "Girando o motor ao contrário",
        "Usando uma engrenagem intermediária extra no caminho",
        "Aumentando o tamanho das rodas",
        "Soltando os rolamentos",
      ],
      1,
      "Uma engrenagem a mais no caminho inverte o sentido de giro do eixo de saída. O arranjo exato depende do projeto.",
    ],
    [
      "Qual alternativa descreve melhor o torque?",
      [
        "Número de voltas por minuto",
        "Força de giro, medida em N·m",
        "Velocidade do veículo em km/h",
        "Temperatura do óleo",
      ],
      1,
      "Torque é a capacidade de produzir giro. O número de voltas por minuto é a rotação (rpm).",
    ],
    [
      "Qual é a função dos rolamentos em uma caixa de câmbio?",
      [
        "Trocar as marchas",
        "Apoiar os eixos e reduzir o atrito",
        "Aumentar o número de dentes",
        "Armazenar óleo",
      ],
      1,
      "Eles permitem que os eixos girem com menos atrito e perdas, mantendo-os apoiados na carcaça.",
    ],
    [
      "Qual peça desloca luvas ou engrenagens para engatar a marcha escolhida?",
      ["Garfo seletor", "Carcaça", "Rolamento", "Eixo de entrada"],
      0,
      "O garfo seletor é movido pelo mecanismo de seleção e engata o par de engrenagens ao eixo.",
    ],
    [
      "No neutro, o que acontece de forma geral?",
      [
        "O motor para de funcionar",
        "O motor pode girar sem transmitir torque às rodas por uma marcha",
        "A marcha à ré fica engatada",
        "O câmbio gira ao contrário",
      ],
      1,
      "Sem marcha engatada, a saída fica desacoplada do caminho de potência. Detalhes variam conforme o sistema.",
    ],
    [
      "Qual é uma limitação das peças impressas em PLA em relação às metálicas?",
      [
        "Não podem ter dentes",
        "Costumam resistir menos ao desgaste, ao impacto e ao calor",
        "São mais pesadas que o aço",
        "Não podem ser coladas",
      ],
      1,
      "O PLA é ótimo para protótipos e modelos didáticos, mas tem menor resistência mecânica e térmica que o metal.",
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
    ["cambio", "caixa", "transmissao", "cambios", "engrenar"],
    ["engrenagem", "engrenagens", "dente", "dentes", "rodadentes"],
    ["torque", "forca", "apertar", "novo"],
    ["rotacao", "rpm", "giro", "girar", "volta", "voltas", "velocidade"],
    ["re", "reversa", "recuar", "tras", "inverte", "invertido", "inverter"],
    ["relacao", "reducao", "proporcao", "razao"],
    ["neutro", "pontomorto", "n", "desengatado", "parado"],
    [
      "peca",
      "pecas",
      "componente",
      "componentes",
      "item",
      "itens",
      "parte",
      "partes",
    ],
    ["rolamento", "rolamentos", "atrito", "mancais", "esferas", "girarfacil"],
    [
      "garfo",
      "garfos",
      "seletor",
      "seletores",
      "luva",
      "luvas",
      "engatar",
      "engate",
      "engatada",
    ],
    ["alavanca", "haste", "hastes", "selecao", "mecanismo", "varinha"],
    ["carcaca", "carcasas", "estrutura", "corpo", "tampa", "alinhamento"],
    ["sincronizador", "sincronizadores", "anel", "suave", "troca", "trocar"],
    ["eixo", "eixos", "arvore", "primario", "secundario", "intermediario"],
    ["embreagem", "disco", "conecta", "desconecta", "tranco"],
    ["pla", "plastico", "impressao", "imprimir", "impressa", "impressas", "3d", "filamento", "prototipo"],
    ["cola", "adesivo", "cianoacrilato", "epoxi", "quente"],
    ["lixa", "lixas", "lixamento", "acabamento"],
    ["parafuso", "parafusos", "porca", "rosca", "buchas"],
    ["motor", "propulsor", "potencia", "cavalos", "ligado"],
    ["roda", "rodas", "pneu", "pneus", "diferencial", "asfalto"],
    ["equipe", "aluno", "alunos", "grupo", "nome", "nomes", "integrantes", "quemfez"],
    ["professor", "orientador", "orientadora", "avaliacao", "banca"],
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
    ["tempo", "duracao", "prazo", "horas", "semanas", "cronograma", "etapa", "etapas"],
    ["inclinacao", "subida", "ladeira", "serra", "carga", "peso", "arrancar"],
    ["primeira", "1a", "1", "marcha1"],
    ["segunda", "2a", "2", "marcha2"],
    ["terceira", "3a", "3", "marcha3"],
    ["quarta", "4a", "4", "marcha4"],
    ["marcha", "marchas", "curta", "longa", "cambio"],
    ["simulador", "simular", "animacao", "fluxo", "amarelo", "desenho"],
    ["galeria", "foto", "fotos", "imagem", "imagens", "legenda", "album"],
    ["quiz", "pergunta", "perguntas", "questao", "questoes", "acerto", "placar"],
    ["site", "pagina", "secao", "secoes", "conteudo", "texto", "endureco"],
    ["automatico", "manual", "automatizado", "automativel"],
    ["watts", "cavalo", "conservacao", "potencia"],
    ["desgaste", "calor", "temperatura", "aquecimento", "resistencia"],
    ["longas", "curtas", "diferenca", "comparar"],
  ];

  const GUIA = [
    [
      "O que é este projeto",
      "projeto site senai educativa trabalho resumo sobre o que e objetivo inicio",
      "Este site explica, de forma interativa, uma caixa de câmbio manual automotiva com 4 marchas à frente e 1 marcha à ré, projeto educativo desenvolvido no SENAI. Ele tem as seções Como funciona, Componentes, Materiais e fabricação, Galeria do projeto físico, Simulador de marchas e Quiz.",
      "O foco é didático: o modelo físico é impresso em PLA e demonstra o princípio de funcionamento, por isso não serve para ser usado em um veículo real.",
    ],
    [
      "Função da caixa de câmbio",
      "para que serve funcao objetivo principal cambio caixa",
      "A caixa de câmbio adapta o torque e a rotação do motor às necessidades das rodas: mais força para arrancar e vencer ladeiras, mais velocidade nas retas. Ela também permite neutro e marcha à ré.",
      "O motor térmico entrega potência útil apenas em uma faixa estreita de rotação. O câmbio oferece vários pares de engrenagens, cada um com uma relação diferente, para manter o motor nessa faixa enquanto a velocidade do veículo muda.",
    ],
    [
      "Por que existem marchas",
      "por que existem quantas marchas precisa motivo faixa rotacao",
      "O motor gira rápido e com torque limitado. Sem câmbio, uma única relação de engrenagens obrigaria o motor a trabalhar fora da faixa boa: força demais em baixa velocidade ou rotação alta demais em velocidade de cruzeiro.",
      "Cada marcha é um par de engrenagens diferente. Com várias relações, o veículo consegue sair do zero, subir ladeira e manter velocidade na estrada sem estourar o motor.",
    ],
    [
      "Engrenagens",
      "engrenagem engrenagens dente dentes tamanhos diferentes",
      "Engrenagens transmitem movimento por dentes que se encaixam. Quando uma pequena move uma grande, a rotação cai e o torque aumenta. Quando uma grande move uma pequena, a rotação sobe e o torque cai.",
      "Pelo número de dentes: se a engrenagem motora tem 20 dentes e a movida tem 40, a relação é 40 ÷ 20 = 2:1. A movida gira na metade da rotação e, sem perdas, entrega cerca do dobro do torque.",
    ],
    [
      "Torque",
      "torque forca de giro nm newton metro",
      "Torque é a força de giro, medida em newton-metro (N·m). É o que faz a roda vencer a resistência para girar o veículo.",
      "Pense em soltar uma porca com uma chave: o cabo longo aumenta o torque no mesmo esforço. O câmbio faz uma troca parecida, distribuindo torque e rotação conforme a marcha escolhida.",
    ],
    [
      "Rotação e rpm",
      "rotacao rpm giro voltas por minuto velocidade do motor",
      "Rotação é o número de voltas por minuto do eixo (rpm). Ela é diferente do torque: uma mede a velocidade do giro e outra mede a força desse giro.",
      "No câmbio, rotação e torque se equilibram: ao reduzir a rotação na saída, o torque aumenta na mesma proporção, desprezando as perdas por atrito.",
    ],
    [
      "Conservação de potência",
      "potencia conserva energia troca entre torque e rotacao watts",
      "Ignorando as perdas, a potência se conserva ao passar pelo par de engrenagens. Por isso ganhar torque custa rotação, e ganhar rotação custa torque.",
      "Potência é torque multiplicado pela rotação (com a constante de conversão). Se a relação dobra o torque, ela divide a rotação por dois, e o produto fica praticamente o mesmo.",
    ],
    [
      "Relação de transmissão",
      "relacao transmissao calculo como se calcula divisao dentes reducao",
      "A relação de transmissão é a razão entre a rotação de entrada e a de saída de um par de engrenagens. Pelos dentes: dentes da engrenagem movida ÷ dentes da engrenagem motora.",
      "Relação maior que 1 reduz a rotação e multiplica o torque (marcha curta). Relação mais próxima de 1 pouco reduz a rotação e dá mais velocidade (marcha longa). As relações numéricas do nosso modelo dependem das medidas reais da equipe.",
    ],
    [
      "Marcha à ré",
      "re reversa para tras inverte sentido locomover",
      "Na ré, uma engrenagem intermediária extra entra no caminho do movimento e inverte o sentido de giro do eixo de saída, fazendo o veículo se deslocar para trás. Ela costuma usar uma relação curta, com bastante torque.",
      "Duas engrenagens engrenadas giram em sentidos opostos. Com uma terceira no meio, a última passa a girar no mesmo sentido da primeira, o contrário do que acontece sem ela. Por isso a saída inverte o giro.",
    ],
    [
      "Neutro",
      "neutro n ponto morto parado desacoplado",
      "No neutro nenhuma marcha está engatada: as engrenagens da saída giram soltas no eixo e não há transmissão de torque às rodas por uma marcha. O motor pode continuar funcionando.",
      "No simulador, o fluxo amarelo do eixo de saída desaparece quando você escolhe N, porque o caminho de potência fica interrompido.",
    ],
    [
      "Marchas curtas e longas",
      "curta longa diferenca entre marchas 1 2 3 4 velocidade forca",
      "Marchas curtas (1ª e 2ª) têm relação alta: muito torque e pouca velocidade, boas para arrancar e subir ladeira. Marchas longas (3ª e 4ª) têm relação menor: mais velocidade para a mesma rotação do motor.",
      "Por isso se arranca em 1ª e se sobe a escala de marchas conforme a velocidade aumenta, terminando em 4ª no trecho reto.",
    ],
    [
      "Os três eixos do câmbio",
      "eixos entrada intermediario saida tres caminhos do movimento",
      "O esquema tem três eixos: o eixo de entrada recebe o movimento do motor, o eixo intermediário carrega os pares de engrenagens das marchas, e o eixo de saída leva o movimento até as rodas.",
      "De cima para baixo no simulador: entrada, intermediário e saída. O par selecionado em amarelo mostra por onde o movimento passa naquele momento.",
    ],
    [
      "Sincronizadores",
      "sincronizador sincronizadores troca suave igualar rotacao anel",
      "Os sincronizadores igualam a rotação entre a engrenagem e o eixo antes do engate, tornando a troca de marcha suave.",
      "Sem sincronizar, as peças engrenariam em rotações diferentes e a troca seria brusca, com ruído e desgaste. Em modelos simplificados eles podem não existir, mas no nosso modelo físico os sincronizadores estão presentes.",
    ],
    [
      "Embreagem",
      "embreagem disco conecta desconecta motor tranco pedal",
      "A embreagem desconecta o motor da caixa de câmbio para que a marcha possa ser trocada sem tranco.",
      "Ela fica entre o motor e o eixo de entrada. Ao pisar no pedal, a transmissão é interrompida; ao soltar, o torque volta a entrar no câmbio de forma progressiva. A embreagem não faz parte deste modelo físico.",
    ],
    [
      "Câmbio manual e automático",
      "manual automatico diferenca troca sozinho",
      "No câmbio manual o condutor escolhe a marcha com a alavanca e usa a embreagem. No automático, o sistema engata a marcha sozinho conforme a carga e a velocidade.",
      "Este projeto é um câmbio manual de 4 marchas + ré: a seleção é feita por alavanca, hastes e garfos, sem embreagem nem conversor de torque.",
    ],
    [
      "Garfos seletores e mecanismo de seleção",
      "garfo seletor alavanca hastes mecanismo como engata muda de marcha",
      "Ao mover a alavanca, o mecanismo de seleção desloca o garfo correto, que empurra a luva ou a engrenagem e engata o par da marcha escolhida. Por vez, só um par transmite o movimento.",
      "O mecanismo traduz a posição da alavanca (N, 1, 2, 3, 4, R) em deslocamento longitudinal do garfo no eixo. Por isso a escolha de uma marcha exige que a anterior seja desengatada.",
    ],
    [
      "Carcaça",
      "carcaca estrutura alinhamento protege conjunto caixametlica",
      "A carcaça é a estrutura que mantém eixos e rolamentos alinhados e protege o conjunto.",
      "Ela garante a distância correta entre os eixos, para que as engrenagens engrenem na medida certa. Se a carcaça flexiona ou desalinha, o câmbio ruído, aquece e gasta os dentes.",
    ],
    [
      "Rolamentos",
      "rolamento rolamentos atrito aquecimento eixo gira",
      "Os rolamentos apoiam os eixos e reduzem o atrito para que eles girem com facilidade, diminuindo perdas e aquecimento.",
      "Eles ficam entre o eixo e a carcaça, ou entre peças que giram em velocidades diferentes, permitindo movimento relativo suave. No nosso modelo físico os rolamentos não estão presentes: os eixos giram apoiados direto na estrutura.",
    ],
    [
      "Materiais do modelo",
      "materiais pla impressao 3d parafusos cola lixa mdf motor led microrruptor fios fabricacao",
      "A tabela de materiais do protótipo lista: PLA, em todas as peças impressas em 3D (engrenagens, eixos, garfos, placas da estrutura, alavanca e pomo); lixas, para o acabamento dessas peças; parafusos, para fixar as placas e o suporte do mecanismo de seleção; cola, no acabamento final; MDF, na caixa da parte elétrica; e os componentes elétricos (motor, microrruptores, LEDs e fios).",
      "A ordem de fabricação é modelar e imprimir, lixar, montar a estrutura com parafusos e cola e, por último, ligar a parte elétrica fora da caixa de câmbio. As quantidades não foram informadas pela equipe.",
    ],
    [
      "Impressão 3D: vantagens",
      "impressao 3d vantagens porque usar PLA prototipo rapido",
      "A impressão 3D permite testar formas rapidamente, criar geometrias difíceis de usinar e substituir uma peça sem fabricar tudo de novo.",
      "Isso encurta o ciclo de ajuste do protótipo: se uma engrenagem não engrena bem, redesenha-se e reimprime-se só aquela peça.",
    ],
    [
      "Impressão 3D: limitações",
      "impressao limitacoes resistencia calor desgaste impacto PLA fraco quebra",
      "O PLA costuma ter menos resistência ao desgaste, ao impacto e ao calor do que peças metálicas. Por isso o modelo serve para demonstrar o funcionamento, não para uso em um veículo real.",
      "Dentes de plástico deformam e quebram sob carga alta, e o PLA amolece em temperatura bem menor que a de um câmbio real em uso contínuo.",
    ],
    [
      "Como usar o simulador",
      "simulador como usar botao marcha ver fluxo",
      "No simulador, escolha uma marcha nos botões N, 1, 2, 3, 4 e R. O par selecionado aparece em amarelo, o fluxo tracejado mostra o caminho do movimento e o painel ao lado traz título, explicação e o que acontece com as engrenagens.",
      "Repare que a ré acende uma engrenagem extra em laranja, que é a peça responsável por inverter o sentido de giro da saída.",
    ],
    [
      "Como usar a galeria",
      "galeria fotos legenda imagem album prototipo montada",
      "A galeria traz 7 fotos reais da caixa de câmbio montada pela equipe: a vista lateral completa, a vista com o motor elétrico, a tampa com o eixo de saída, a vista superior dos garfos, a demonstração com a equipe, um eixo com as engrenagens fora da carcaça e a parte elétrica de microrruptores e LEDs. Cada foto tem legenda própria e pode ser ampliada com um clique.",
      "As legendas da galeria descrevem o protótipo físico. Se a sua dúvida é sobre uma peça ou etapa que não aparece nas fotos, a explicação teórica está nas seções Componentes e Como funciona.",
    ],
    [
      "Sobre o quiz",
      "quiz perguntas quantas funciona teste nota",
      "O quiz tem 10 perguntas sobre a caixa de câmbio, com feedback e explicação em cada resposta e placar no final. Aqui no chat também posso fazer uma pergunta do quiz: use /quiz.",
      "As perguntas cobrem função do câmbio, escolha de marcha, cálculo de relação de transmissão, ré, torque, rolamentos, garfo seletor, neutro e limite do PLA.",
    ],
    [
      "Dados do projeto físico",
      "dados equipe medida quantidade quantidade real resultado custo tempo preenchido vazio",
      "Não tenho essa informação do projeto físico. Para evitar erros, eu só afirmo o que está no conteúdo educativo do site. A tabela da seção Materiais e fabricação é fixa e não traz quantidades, medidas, custo nem prazo. Se a equipe tiver esse número, registre com /nota título | texto: depois disso eu passo a responder com ele.",
      "Enquanto o dado não está no site, posso explicar o princípio: relação de transmissão, torque, marcha curta e longa, ré e peças.",
      true,
    ],
    [
      "Explicando para quem está começando",
      "iniciante simples facil crianca bicicleta nao entendi explica melhor resumo pratico",
      "Pense em uma bicicleta com marchas: na marcha leve você pedala mais voltas, mas sobe a ladeira com facilidade. Na marcha pesada, cada pedalada rende mais velocidade no plano. O câmbio do carro faz isso com pares de engrenagens de tamanhos diferentes.",
      "Resumindo: marcha curta = mais força e menos velocidade. Marcha longa = menos força e mais velocidade. Ré = uma engrenagem extra inverte o sentido de giro. Neutro = o motor gira, mas nenhuma marcha leva força às rodas.",
    ],
    [
      "O que também influencia",
      "aviso limitacoes motor carga peso pneu atrito difere",
      "O comportamento real do veículo também depende do motor, da carga, do peso, do diferencial, dos pneus e das perdas por atrito. Os valores variam de veículo para veículo.",
      "Por isso as explicações daqui são conceituais: servem para entender o princípio, não para calcular um projeto real.",
    ],
  ];

  const notas = ler("camb_notas", []);

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
          corpo: "Na foto da galeria do projeto físico: " + t,
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
          " No nosso modelo: " +
          c[2] +
          (c[4]
            ? " Essa peça está no nosso modelo físico."
            : " Essa peça não está no nosso modelo físico."),
        tags: palavras(c[0] + " " + c[1] + " " + c[2]),
        peso: 1.5,
        onde: nomeSecao("componentes"),
      }),
    );
    Object.keys(MARCHAS).forEach((k) => {
      const m = MARCHAS[k];
      push({
        titulo: m.t,
        corpo: m.d,
        fundo: m.e,
        tags: palavras(m.t + " " + k + " " + m.d),
        peso: 1.5,
        onde: nomeSecao("simulador"),
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
        peso: 1.4,
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
    "Não encontrei esse assunto no conteúdo do site, e prefiro não inventar. Pergunte sobre torque, engrenagens, relação de transmissão, marcha à ré, peças ou materiais. Comandos: /ajuda.",
    "Isso não está no que eu conheço agora. Use /busca <palavra> para varrer o site todo, ou registre a informação com /nota título | texto.",
  ];
  const TEMAS =
    "marchas, engrenagens, torque e rotação, relação de transmissão, ré, neutro, sincronizadores, embreagem, eixos, garfos, carcaça, rolamentos, materiais e PLA, impressão 3D, simulador, galeria, quiz, equipe e dados do projeto.";
  const SUGERIDAS = [
    "Para que serve a caixa de câmbio?",
    "Por que existem várias marchas?",
    "Como se calcula a relação de transmissão?",
    "Como funciona a marcha à ré?",
    "O que são os sincronizadores?",
    "Quais materiais foram usados no modelo?",
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
    /(quantos|quantas|quanto|de quanto|em quanto|que medida|qual (o|a) (numero|valor|medida|tamanho|peso|custo|preco|prazo|duracao)|quantidade)/;
  function responder(texto) {
    if (texto[0] === "/") {
      executar(texto);
      return;
    }
    msg("eu", texto);
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
        msg(
          "bot",
          "Eu leio todo o conteúdo deste site e respondo sobre: " +
            TEMAS +
            " Use /ajuda para ver os comandos.",
        );
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
          msg("bot", alvo.fundo ? s : fala(alvo));
          gesto(alvo.fundo ? "think" : "sparkle", 2200);
          return;
        }
      }
      const top = buscar(texto, 5);
      if (!top.length) {
        ctx.fila = [];
        ctx.ativa = null;
        msg("bot", sorteia(FALLBACK.filter((x) => x !== ctx.ultima)));
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
    }, 320);
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
      "marcha",
      "explica uma marcha: /marcha 1",
      (a) => {
        const k = norm(a).replace(/[^a-z0-9]/g, "");
        const mapa = {
          n: "N",
          neutro: "N",
          0: "N",
          1: "1",
          2: "2",
          3: "3",
          4: "4",
          r: "R",
          re: "R",
          reversa: "R",
        };
        const id = mapa[k];
        if (!a)
          return {
            msg:
              "Marchas deste câmbio: N, 1ª, 2ª, 3ª, 4ª e R (ré). Use /marcha 1, /marcha 2, /marcha 3, /marcha 4, /marcha R ou /marcha N.",
            g: "tilt",
          };
        if (!id)
          return {
            msg: "Não conheço \"" + a + "\". As opções são N, 1, 2, 3, 4 e R.",
            g: "dizzy",
          };
        engatar(id, true);
        const m = MARCHAS[id];
        document
          .getElementById("simulador")
          .scrollIntoView({ behavior: "smooth", block: "start" });
        return {
          msg: m.t + ": " + m.d + " Por dentro: " + m.e,
          g: id === "R" ? "surprise" : "happy",
        };
      },
      ["m", "marchas", "engatar", "simule"],
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
              (c[4] ? "(está no modelo físico)" : "(não está no modelo físico)"),
          ).join("\n"),
        g: "scan",
      }),
      ["componentes", "peca", "itens"],
    ],
    [
      "materiais",
      "lê a tabela de materiais do protótipo",
      () => {
        const l = linhaMats().filter((r) => r[0]);
        return {
          msg:
            "Materiais do protótipo:\n" +
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
      "procura um termo em todo o site: /busca sincronizador",
      (a) => {
        if (!a)
          return {
            msg: "Escreva o termo depois de /busca. Exemplo: /busca sincronizadores",
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
        gravar("camb_notas", notas);
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
        gravar("camb_notas", notas);
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
          (txt($("h1")) || "caixa de câmbio") +
          ". O projeto mostra uma caixa de câmbio manual com 4 marchas à frente e 1 ré, feita como modelo didático impresso em PLA no SENAI. As " +
          SECS.length +
          " seções do site cobrem o princípio de funcionamento, os " +
          COMP.length +
          " componentes, os materiais e a fabricação, as fotos do modelo, o simulador de marchas e um quiz de " +
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
      "rola até uma seção: /ir simulador",
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
    }, 220);
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

  $$(".campo-projeto").forEach((i) => {
    const d = ler("camb_rodape", {});
    i.value = d[i.dataset.k] || "";
    i.addEventListener("input", () => {
      const x = ler("camb_rodape", {});
      x[i.dataset.k] = i.value;
      gravar("camb_rodape", x);
    });
  });

  const FALAS_SECAO = {
    simulador: [
      "Chegou ao simulador! Escolha uma marcha e veja o caminho do movimento.",
      "Simulador aberto! Experimente a ré para ver a engrenagem extra.",
    ],
    componentes: [
      "Estas são as peças do câmbio. Confirme quais existem no modelo da equipe!",
      "Cada peça tem uma função. Qual será a mais importante?",
    ],
    materiais: [
      "Materiais do protótipo: PLA impresso em 3D, lixa, parafuso, cola, MDF e a parte elétrica.",
    ],
    galeria: [
      "Aqui estão as fotos reais da caixa de câmbio montada. Clique em uma foto para ampliar.",
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
