// Dados editoriais do Blog Achecar (protótipo). Todos os cards abrem o modelo de matéria em Artigo.dc.html.
export const CATS = [
  { id: "noticias", label: "Notícias", icon: "newspaper", desc: "Lançamentos, mercado e o que muda para quem dirige." },
  { id: "avaliacoes", label: "Avaliações", icon: "speed", desc: "Testes, comparativos e usados com veredito claro." },
  { id: "compra", label: "Compra e venda", icon: "handshake", desc: "Guias, negociação, financiamento e golpes." },
  { id: "bolso", label: "Seu bolso", icon: "savings", desc: "IPVA, seguro, desvalorização e custo por mês." },
  { id: "manutencao", label: "Manutenção", icon: "build", desc: "Revisões, problemas comuns e cuidados do dia a dia." },
  { id: "leis", label: "Documentos e leis", icon: "gavel", desc: "CNH, multas, transferência e regras de trânsito." },
  { id: "eletricos", label: "Elétricos e híbridos", icon: "bolt", desc: "Recarga, autonomia e o que considerar na troca." },
  { id: "rankings", label: "Rankings", icon: "leaderboard", desc: "Mais vendidos, mais econômicos e que menos desvalorizam." }
];
export const FORMATS = { guia: "Guia", comparativo: "Comparativo", noticia: "Notícia", explicador: "Explicador", ranking: "Ranking", usado: "Usado a fundo" };
const P = (id, cat, fmt, title, dek, date, min, img, opts = {}) => ({ id, cat, fmt, title, dek, date, min, img, ...opts });
export const POSTS = [
  P("compra-no-escuro", "compra", "guia", "Compra no escuro: o que checar antes de fechar negócio", "Placa, documento, leilão, sinistro e débitos: o passo a passo para não levar surpresa junto com o carro.", "21 out 2026", 9, "assets/home/blog-destaque.webp", { lead: true, pick: true }),
  P("cnh-categorias", "leis", "explicador", "Categorias de CNH: veja o que cada habilitação permite dirigir", "Limites de peso e lotação de cada categoria e os cuidados antes de assumir o volante de outro veículo.", "20 out 2026", 5, "assets/garagem/foto-02.webp"),
  P("ipva-eletrico", "bolso", "explicador", "IPVA de carro elétrico: quais estados oferecem benefícios?", "Isenção ou desconto: o que muda de estado para estado e as condições antes de comprar.", "16 out 2026", 6, "assets/home/blog-ipva.webp", { pick: true }),
  P("documento-perdido", "leis", "guia", "Documento do carro perdido: como emitir uma nova via", "Como acessar de novo o CRLV-e, imprimir outra cópia e o que fazer se o CRV também sumiu.", "16 out 2026", 4, "assets/garagem/foto-03.webp"),
  P("celta-usado", "avaliacoes", "usado", "Chevrolet Celta usado: por que ainda aparece no radar", "Preço baixo e mecânica simples. As vantagens, os limites e o que checar antes de comprar um.", "14 out 2026", 7, "assets/carros/onix.webp", { cutout: true, car: "Chevrolet Celta", fipe: "R$ 18.900" }),
  P("recarga-eletrico", "eletricos", "explicador", "Quanto custa recarregar um carro elétrico em casa ou na rua", "Compare tarifas e calcule o gasto por quilômetro sem cobrança extra na conta de luz.", "14 out 2026", 6, "assets/carros/byd-dolphin.webp", { cutout: true }),
  P("radar-media", "leis", "explicador", "Radar de velocidade média: como funciona nas rodovias", "Como o sistema calcula a velocidade entre dois pontos e onde ele já está em teste.", "12 out 2026", 5, "assets/garagem/foto-04.webp"),
  P("freio-regenerativo", "eletricos", "explicador", "Freio regenerativo: como elétricos e híbridos recuperam energia", "O que acontece em cada frenagem e por que isso muda o consumo no trânsito.", "12 out 2026", 5, "assets/carros/eqe.webp", { cutout: true }),
  P("suv-7-lugares", "avaliacoes", "comparativo", "SUVs de 7 lugares: qual leva a família com mais conforto", "Espaço na terceira fileira, porta-malas e preço lado a lado.", "9 out 2026", 11, "assets/carros/commander.webp", { cutout: true, pick: true }),
  P("assinatura", "compra", "guia", "Carro por assinatura: o que está incluído na mensalidade", "Seguro, manutenção e impostos: o que entra, o que fica de fora e os custos extras.", "9 out 2026", 6, "assets/garagem/foto-01.webp"),
  P("tracker-creta", "avaliacoes", "comparativo", "Tracker ou Creta: qual SUV compacto vale mais a pena", "Desempenho, consumo, equipamentos e custo de manter, com veredito em cada quesito.", "8 out 2026", 12, "assets/carros/tracker.webp", { cutout: true }),
  P("golpes-venda", "compra", "guia", "Os golpes mais comuns na venda de carro usado (e como evitar)", "Falso comprador, pagamento agendado e clonagem: os sinais que aparecem antes do prejuízo.", "7 out 2026", 7, "assets/home/blog-golpes.jpg"),
  P("desvalorizacao", "rankings", "ranking", "Os 10 carros que menos desvalorizaram em um ano", "Ranking com base na Tabela FIPE: quem segura melhor o preço na revenda.", "6 out 2026", 5, "assets/carros/corolla-cross.webp", { cutout: true }),
  P("mais-vendidos-set", "rankings", "ranking", "Mais vendidos de setembro: o que mudou no topo", "Os 20 modelos mais emplacados do mês e quem ganhou ou perdeu posições.", "2 out 2026", 4, "assets/carros/strada.webp", { cutout: true }),
  P("oleo-troca", "manutencao", "explicador", "Troca de óleo: prazo do manual ou a cada 5 mil km?", "Uso severo, tipo de óleo e o que realmente define a hora de trocar.", "1 out 2026", 5, "assets/garagem/foto-05.jpg"),
  P("recall-como-saber", "manutencao", "guia", "Recall: como saber se o seu carro tem um pendente", "Onde consultar, o que fazer e por que isso pesa na hora de vender.", "30 set 2026", 4, "assets/garagem/foto-06.jpg"),
  P("lancamentos-out", "noticias", "noticia", "Lançamentos de outubro: os carros que chegam às lojas", "Preços, versões e o que muda em cada novidade do mês.", "1 out 2026", 6, "assets/carros/fastback.webp", { cutout: true }),
  P("seguro-perfil", "bolso", "explicador", "Seguro do carro: o que mais pesa no preço da apólice", "CEP, perfil do motorista e modelo: como cada fator muda o valor e onde dá para economizar.", "27 set 2026", 6, "assets/garagem/foto-01.webp"),
  P("custo-mensal", "bolso", "guia", "Quanto custa manter um carro por mês (de verdade)", "Combustível, seguro, IPVA, revisões e desvalorização somados para saber o custo real.", "25 set 2026", 7, "assets/carros/hb20.webp", { cutout: true }),
  P("financiar-ou-consorcio", "bolso", "comparativo", "Financiamento, consórcio ou à vista: qual sai mais barato", "Juros, prazo e custo de oportunidade comparados em três cenários.", "23 set 2026", 8, "assets/garagem/foto-02.webp"),
  P("autonomia-real", "eletricos", "explicador", "Autonomia real x autonomia de catálogo: por que a conta não fecha", "Ar-condicionado, velocidade e temperatura: o que reduz o alcance no dia a dia.", "22 set 2026", 6, "assets/carros/taycan.webp", { cutout: true }),
  P("hibrido-vale", "eletricos", "guia", "Híbrido leve, pleno ou plug-in: qual faz sentido para você", "As diferenças entre os sistemas e o perfil de uso de cada um.", "20 set 2026", 7, "assets/carros/corolla.webp", { cutout: true }),
  P("onix-usado", "avaliacoes", "usado", "Chevrolet Onix usado: 10 fatos antes de comprar", "Versões, motores, problemas conhecidos e quanto vale na Tabela FIPE.", "19 set 2026", 9, "assets/carros/onix-2026.webp", { cutout: true }),
  P("documentacao-transferencia", "compra", "guia", "Transferência de veículo: passo a passo e prazos", "Do reconhecimento de firma ao novo CRLV-e, sem multa por atraso.", "18 set 2026", 6, "assets/garagem/foto-04.webp"),
  P("consulta-o-que-mostra", "compra", "explicador", "O que a consulta veicular mostra (e o que ela não mostra)", "Leilão, sinistro, gravame, RENAJUD, recall e quilometragem: como ler cada item do relatório.", "28 set 2026", 8, "assets/home/blog-consulta.webp")
];
export const byId = (id) => POSTS.find((p) => p.id === id) || POSTS[0];
