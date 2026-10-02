/**
 * ============================================================
 * RENOMEADOR DE ARQUIVOS
 * ============================================================
 * Limpa o nome dos arquivos, substitui termos, recorta 
 * intervalos, apaga textos entre marcadores e adiciona 
 * automaticamente prefixo/sufixo.
 */

/**
 * SUPER RENOMEADOR DE ARQUIVOS
 * 
 * Script de automação desenvolvido de forma independente por Pablo Phillipe Cândido dos Santos,
 * destinado à renomeação de arquivos em massa no Google Drive.
 * 
 * Automation script independently developed by Pablo Phillipe Cândido dos Santos,
 * designed for bulk file renaming in Google Drive.
 * 
 * O desenvolvimento contou com ferramentas de inteligência artificial generativa como recurso auxiliar.
 * The development process utilized generative artificial intelligence tools as an auxiliary resource.
 * 
 * Currículo Lattes/Lattes Curriculum: http://lattes.cnpq.br/9500873674712528
 */

// ================= CONFIGURAÇÕES =================

const ID_DA_PASTA = 'COLE_AQUI_O_ID_DA_PASTA';

// ----- 1. CONFIGURAÇÕES DE REMOÇÃO -----
// Quantidade de caracteres para cortar das extremidades do nome original
const REMOVER_DO_INICIO = 0; // Ex: 5 removerá os 5 primeiros caracteres
const REMOVER_DO_FINAL = 0;  // Ex: 5 removerá os 5 últimos caracteres (antes da extensão)

// Remover um intervalo específico de caracteres pela sua posição.
// inicio: posição do primeiro caractere (começando a contar do 1)
// fim: posição do último caractere a ser removido
// Exemplo: { inicio: 9, fim: 24 }
// Deixe 0 para inativar a função.
const REMOVER_INTERVALO = { inicio: 0, fim: 0 };

// Remover todo o texto localizado entre dois marcadores específicos.
// Os marcadores em si SERÃO MANTIDOS, apenas o "recheio" será apagado.
// Exemplo para transformar "08 - Teoria e Redação VIII - Resumo" em "08 - Teoria e Redação - Resumo":
// marcadorInicial: 'Teoria e Redação ', marcadorFinal: '- Resumo'
// Deixe os campos com '' para inativar a função.
const REMOVER_ENTRE_TEXTOS = {
  marcadorInicial: '',
  marcadorFinal: ''
};

// Termos específicos para remover de qualquer parte do nome
// Respeita espaços em branco. Remova todas as instâncias exatas.
// Exemplo: [' - Aula', 'Cópia de ']
const TERMOS_PARA_REMOVER = [];

// ----- 2. CONFIGURAÇÕES DE SUBSTITUIÇÃO -----
// Substitui um texto específico por outro em qualquer parte do nome.
// O termo à esquerda é o que será procurado, o da direita é o novo.
// Exemplo: {'Aulinha': 'Aula', 'Doc_': 'Documento '}
const TERMOS_PARA_SUBSTITUIR = {
  'Aulinha': 'Aula'
};

// ----- 3. CONFIGURAÇÕES DE ADIÇÃO -----
// Textos a serem adicionados (deixe '' para não usar)
const PREFIXO = '';
const SUFIXO = '';

// ----- 4. CONFIGURAÇÕES DE FILTRAGEM -----
// Modos de Filtragem: 'TODAS', 'SOMENTE' ou 'EXCETO'
const MODO_EXTENSOES = 'TODAS';

// O ponto antes da extensão é opcional (ex: 'pdf' ou '.pdf')
const EXTENSOES_PERMITIDAS = ['', ''];
const EXTENSOES_EXCLUIDAS = [''];


// ================= LÓGICA DE APOIO =================

function normalizarExtensaoParaComparacao(extensao) {
  if (!extensao) return '';
  return extensao.replace(/^\./, '').trim().toLowerCase();
}

function obterExtensao(nomeArquivo) {
  const ultimoPonto = nomeArquivo.lastIndexOf('.');
  if (ultimoPonto <= 0 || ultimoPonto === nomeArquivo.length - 1) return '';
  return normalizarExtensaoParaComparacao(nomeArquivo.substring(ultimoPonto + 1));
}

function deveProcessarArquivo(nomeArquivo) {
  const extensao = obterExtensao(nomeArquivo);

  if (MODO_EXTENSOES === 'TODAS') return true;

  if (MODO_EXTENSOES === 'SOMENTE') {
    const permitidas = EXTENSOES_PERMITIDAS.map(normalizarExtensaoParaComparacao);
    return permitidas.includes(extensao);
  }

  if (MODO_EXTENSOES === 'EXCETO') {
    const excluidas = EXTENSOES_EXCLUIDAS.map(normalizarExtensaoParaComparacao);
    return !excluidas.includes(extensao);
  }

  throw new Error('MODO_EXTENSOES inválido. Utilize "TODAS", "SOMENTE" ou "EXCETO".');
}

function separarExtensao(nome) {
  const ultimoPonto = nome.lastIndexOf('.');
  if (ultimoPonto <= 0) return { nome: nome, extensao: '' };
  
  return {
    nome: nome.substring(0, ultimoPonto),
    extensao: nome.substring(ultimoPonto)
  };
}

function possuiTexto(nomeBase, textoAdicional, noInicio) {
  if (!textoAdicional) return false;
  const nomeLower = nomeBase.toLowerCase();
  const textoLower = textoAdicional.toLowerCase();
  return noInicio ? nomeLower.startsWith(textoLower) : nomeLower.endsWith(textoLower);
}

function gerarNovoNome(nomeAtual) {
  const partes = separarExtensao(nomeAtual);
  let novoNome = partes.nome;

  // --- 1. REMOÇÃO DE CARACTERES (INÍCIO E FIM) ---
  if (REMOVER_DO_INICIO > 0) {
    novoNome = novoNome.substring(REMOVER_DO_INICIO);
  }

  if (REMOVER_DO_FINAL > 0) {
    const limite = Math.max(0, novoNome.length - REMOVER_DO_FINAL);
    novoNome = novoNome.substring(0, limite);
  }

  // --- 2. REMOÇÃO POR INTERVALO ---
  if (REMOVER_INTERVALO && REMOVER_INTERVALO.inicio > 0 && REMOVER_INTERVALO.fim >= REMOVER_INTERVALO.inicio) {
    const inicioIndice = REMOVER_INTERVALO.inicio - 1; // Ajusta para a contagem 0-based do JavaScript
    const fimIndice = REMOVER_INTERVALO.fim;
    
    if (inicioIndice < novoNome.length) {
      const parte1 = novoNome.substring(0, inicioIndice);
      const parte2 = novoNome.substring(fimIndice);
      novoNome = parte1 + parte2;
    }
  }

  // --- 3. REMOÇÃO ENTRE MARCADORES DE TEXTO ---
  if (REMOVER_ENTRE_TEXTOS && REMOVER_ENTRE_TEXTOS.marcadorInicial && REMOVER_ENTRE_TEXTOS.marcadorFinal) {
    const mInicio = REMOVER_ENTRE_TEXTOS.marcadorInicial;
    const mFim = REMOVER_ENTRE_TEXTOS.marcadorFinal;

    let indexInicio = novoNome.indexOf(mInicio);
    while (indexInicio !== -1) {
      // Procura o marcador final apenas APÓS o marcador inicial
      let indexFim = novoNome.indexOf(mFim, indexInicio + mInicio.length);
      if (indexFim !== -1) {
        // Recorta a string mantendo o marcador inicial e o marcador final
        const parte1 = novoNome.substring(0, indexInicio + mInicio.length);
        const parte2 = novoNome.substring(indexFim);
        novoNome = parte1 + parte2;
        
        // Atualiza a posição de busca para evitar loops infinitos caso existam múltiplas ocorrências
        indexInicio = novoNome.indexOf(mInicio, indexInicio + mInicio.length);
      } else {
        break; // Se encontrou o início mas não o fim, sai do laço
      }
    }
  }

  // --- 4. REMOÇÃO DE TERMOS ESPECÍFICOS ---
  if (TERMOS_PARA_REMOVER && TERMOS_PARA_REMOVER.length > 0) {
    TERMOS_PARA_REMOVER.forEach(termo => {
      if (termo) {
        novoNome = novoNome.split(termo).join('');
      }
    });
  }

  // --- 5. SUBSTITUIÇÃO DE TERMOS ---
  if (TERMOS_PARA_SUBSTITUIR && typeof TERMOS_PARA_SUBSTITUIR === 'object') {
    Object.keys(TERMOS_PARA_SUBSTITUIR).forEach(termoAntigo => {
      if (termoAntigo) {
        const termoNovo = TERMOS_PARA_SUBSTITUIR[termoAntigo];
        novoNome = novoNome.split(termoAntigo).join(termoNovo);
      }
    });
  }

  // --- 6. ADIÇÃO DE PREFIXO E SUFIXO ---
  const prefixo = PREFIXO || '';
  const sufixo = SUFIXO || '';

  if (prefixo && !possuiTexto(novoNome, prefixo, true)) {
    novoNome = prefixo + novoNome;
  }

  if (sufixo && !possuiTexto(novoNome, sufixo, false)) {
    novoNome = novoNome + sufixo;
  }

  // --- 7. PREVENÇÃO DE MÚLTIPLOS ESPAÇOS ---
  // Substitui 2 ou mais espaços consecutivos por apenas 1 espaço
  novoNome = novoNome.replace(/\s{2,}/g, ' ');

  return novoNome + partes.extensao;
}


// ================= FUNÇÕES PRINCIPAIS =================

/**
 * Executa a SIMULAÇÃO. Não altera nenhum arquivo.
 */
function simularRenomeacao() {
  processarArquivosDaPasta(true);
}

/**
 * Executa a RENOMEAÇÃO EFETIVA. Altera os arquivos no Drive.
 */
function renomearArquivosDaPasta() {
  processarArquivosDaPasta(false);
}


// ================= MOTOR PRINCIPAL =================

function processarArquivosDaPasta(apenasSimulacao) {
  const pasta = DriveApp.getFolderById(ID_DA_PASTA);
  const arquivos = pasta.getFiles();

  let analisados = 0;
  let alterados = 0;
  let semAlteracao = 0;
  let ignoradosPorExtensao = 0;
  let erros = 0;

  console.log('========================================');
  console.log(apenasSimulacao ? 'SIMULAÇÃO DE RENOMEAÇÃO' : 'RENOMEAÇÃO DE ARQUIVOS');
  console.log('========================================');
  console.log('Pasta: ' + ID_DA_PASTA);
  
  console.log('Remover do início: ' + REMOVER_DO_INICIO + ' char(s)');
  console.log('Remover do final: ' + REMOVER_DO_FINAL + ' char(s)');
  
  if (REMOVER_INTERVALO && REMOVER_INTERVALO.inicio > 0) {
    console.log(`Remover intervalo: Do caractere ${REMOVER_INTERVALO.inicio} ao ${REMOVER_INTERVALO.fim}`);
  } else {
    console.log('Remover intervalo: Inativo');
  }

  if (REMOVER_ENTRE_TEXTOS && REMOVER_ENTRE_TEXTOS.marcadorInicial && REMOVER_ENTRE_TEXTOS.marcadorFinal) {
    console.log(`Remover entre textos: "${REMOVER_ENTRE_TEXTOS.marcadorInicial}" e "${REMOVER_ENTRE_TEXTOS.marcadorFinal}"`);
  } else {
    console.log('Remover entre textos: Inativo');
  }
  
  const termosStr = TERMOS_PARA_REMOVER.filter(t => t).length > 0 ? `['${TERMOS_PARA_REMOVER.filter(t => t).join("', '")}']` : 'Nenhum';
  console.log('Termos removidos: ' + termosStr);
  
  const substituicoes = Object.keys(TERMOS_PARA_SUBSTITUIR);
  console.log('Substituições: ' + (substituicoes.length > 0 ? substituicoes.length + ' regra(s) ativa(s)' : 'Nenhuma'));
  
  console.log('Prefixo: "' + PREFIXO + '" | Sufixo: "' + SUFIXO + '"');
  console.log('Modo de extensões: ' + MODO_EXTENSOES);
  console.log('----------------------------------------');

  while (arquivos.hasNext()) {
    const arquivo = arquivos.next();
    const nomeAtual = arquivo.getName();
    analisados++;

    try {
      if (!deveProcessarArquivo(nomeAtual)) {
        ignoradosPorExtensao++;
        console.log('[IGNORADO — EXTENSÃO] ' + nomeAtual);
        continue;
      }

      const novoNome = gerarNovoNome(nomeAtual);

      if (nomeAtual === novoNome) {
        semAlteracao++;
        console.log('[SEM ALTERAÇÃO] ' + nomeAtual);
        continue;
      }

      if (!apenasSimulacao) {
        arquivo.setName(novoNome);
      }

      alterados++;
      const tag = apenasSimulacao ? '[ALTERAR]' : '[RENOMEADO]';
      console.log(`${tag} ${nomeAtual} → ${novoNome}`);

    } catch (erro) {
      erros++;
      console.error('[ERRO] ' + nomeAtual + ' → ' + erro.message);
    }
  }

  console.log('========================================');
  console.log(apenasSimulacao ? 'SIMULAÇÃO CONCLUÍDA' : 'RENOMEAÇÃO CONCLUÍDA');
  console.log('========================================');
  console.log('Arquivos analisados: ' + analisados);
  console.log((apenasSimulacao ? 'Arquivos que seriam renomeados: ' : 'Arquivos renomeados: ') + alterados);
  console.log('Arquivos sem alteração: ' + semAlteracao);
  console.log('Arquivos ignorados por extensão: ' + ignoradosPorExtensao);
  console.log('Erros: ' + erros);
  if (apenasSimulacao) console.log('\nNenhum arquivo foi modificado.');
  console.log('========================================');
}