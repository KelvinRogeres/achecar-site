// Sistema de templates de e-mail Achecar. Gera HTML com estilos inline, compatível com Gmail, Outlook e Apple Mail.
// Cada elemento colorido recebe uma classe de token, remapeada no modo escuro (prefers-color-scheme e Outlook.com [data-ogsc]/[data-ogsb]).
const L = { page: "#F6F6F9", card: "#FFFFFF", soft: "#F6F6F9", lilac: "#F1EBFD", line: "#E6E6EE", tx1: "#1D2433", tx2: "#5A6472", brand: "#7D3EE3", brandTx: "#5B21B6" };
const D = { page: "#0F1117", card: "#1A1D26", soft: "#242938", lilac: "#2C2342", line: "#323849", tx1: "#F2F3F5", tx2: "#B4BAC6", brand: "#C9AEFF", brandTx: "#D9C7FF" };
const TONE = {
  info: { bg: "#F1EBFD", tx: "#4C1D95", dbg: "#2C2342", dtx: "#D9C7FF", dot: "#7D3EE3" },
  ok: { bg: "#EAF8EF", tx: "#14532D", dbg: "#15301F", dtx: "#A7E8BE", dot: "#15803D" },
  warn: { bg: "#FFF4E0", tx: "#6B4100", dbg: "#3A2C12", dtx: "#F5D9A6", dot: "#D97706" },
  err: { bg: "#FDEDEC", tx: "#8F1D14", dbg: "#3B1D1B", dtx: "#F7B9B2", dot: "#DC2626" },
  paid: { bg: "#FFEDEA", tx: "#9A2A1E", dbg: "#3B1F1B", dtx: "#FFB9AE", dot: "#FF5040" }
};
const BTN = { brand: "#7D3EE3", paid: "#D13A28", pay: "#15803D" };
const FH = "'Merriweather Sans',Arial,Helvetica,sans-serif", FB = "Roboto,Arial,Helvetica,sans-serif", FM = "'Roboto Mono','Courier New',Courier,monospace";
const A = "{{url_assets}}/email";
const sp = (h) => `<tr><td style="height:${h}px;line-height:${h}px;font-size:0;mso-line-height-rule:exactly">&nbsp;</td></tr>`;
const darkCss = () => {
  const r = [
    [".e-page", `background:${D.page}!important`], [".e-card", `background:${D.card}!important;border-color:${D.line}!important`], [".e-soft", `background:${D.soft}!important`], [".e-lilac", `background:${D.lilac}!important`],
    [".e-line", `border-color:${D.line}!important`], [".e-rule", `background:${D.line}!important`], [".e-tx1", `color:${D.tx1}!important`], [".e-tx2", `color:${D.tx2}!important`], [".e-brand", `color:${D.brand}!important`], [".e-brandtx", `color:${D.brandTx}!important`],
    [".e-plate", `background:${D.soft}!important;border-color:${D.tx2}!important;color:${D.tx1}!important`], [".e-logo-l", "display:none!important;max-height:0!important;overflow:hidden!important"], [".e-logo-d", "display:block!important;max-height:none!important;overflow:visible!important"]
  ].concat(Object.entries(TONE).flatMap(([k, t]) => [[`.e-t-${k}`, `background:${t.dbg}!important`], [`.e-t-${k} .e-ttx, .e-ttx-${k}`, `color:${t.dtx}!important`], [`.e-dot-${k}`, `color:${t.dtx}!important`]]));
  const sel = (s) => s.split(",").map((x) => x.trim());
  return `@media (prefers-color-scheme:dark){${r.map(([s, v]) => `${s}{${v}}`).join("")}}` +
    r.map(([s, v]) => sel(s).map((x) => `[data-ogsc] ${x},[data-ogsb] ${x}`).join(",") + `{${v}}`).join("");
};
const shell = (o, body) => `<!DOCTYPE html>
<html lang="pt-BR" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="color-scheme" content="light dark"><meta name="supported-color-schemes" content="light dark"><meta name="x-apple-disable-message-reformatting">
<title>${o.subject}</title>
<!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
<style>
:root{color-scheme:light dark;supported-color-schemes:light dark}
a[x-apple-data-detectors]{color:inherit!important;text-decoration:none!important}
@media only screen and (max-width:620px){.e-px{padding-left:22px!important;padding-right:22px!important}.e-h1{font-size:24px!important;line-height:31px!important}.e-stack{display:block!important;width:100%!important;max-width:100%!important;box-sizing:border-box!important}.e-hide-m{display:none!important}.e-btn,.e-btn a{display:block!important;width:100%!important;box-sizing:border-box}.e-code{font-size:28px!important;letter-spacing:6px!important}}
${darkCss()}
</style>
</head>
<body class="e-page" style="margin:0;padding:0;background:${L.page};-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:${L.page};opacity:0">${o.pre}${"&#8199;&#65279;&#847;".repeat(30)}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="e-page" style="background:${L.page}"><tr><td align="center" style="padding:28px 12px 32px">
<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" align="center"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%">

<tr><td class="e-card" style="background:${L.card};border:1px solid ${L.line};border-radius:20px;box-shadow:0 12px 32px rgba(26,13,64,.10)">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
${body}
<tr><td class="e-px" style="padding:4px 32px 30px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="e-rule" height="1" style="height:1px;line-height:1px;font-size:0;background:${L.line}">&nbsp;</td></tr><tr><td style="height:22px;line-height:22px;font-size:0">&nbsp;</td></tr><tr><td><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="52" valign="middle"><img src="${A}/mascote-copiloto.png" width="44" height="44" alt="" style="display:block;border:0;width:44px;height:44px"></td><td valign="middle" style="padding-left:6px"><p class="e-tx2" style="margin:0;font:400 14px/20px ${FB};color:${L.tx2}">${o.sign || "Qualquer dúvida, é só chamar."}</p><p class="e-tx1" style="margin:2px 0 0;font:700 15px/20px ${FB};color:${L.tx1}">Time Achecar</p></td></tr></table></td></tr></table></td></tr>
</table>
</td></tr>
${footer(o)}
</table>
<!--[if mso]></td></tr></table><![endif]-->
</td></tr></table>
</body></html>`;
const footer = (o) => `<tr><td class="e-px" style="padding:26px 30px 0">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="e-tx2" style="font:400 14px/22px ${FB};color:${L.tx2}">Precisa de ajuda? <a href="{{url_atendimento_whatsapp}}" class="e-brand" style="color:${L.brand};font-weight:700;text-decoration:underline">Fale com o atendimento pelo WhatsApp</a></td></tr>
${sp(14)}
<tr><td class="e-tx2" style="font:400 13px/20px ${FB};color:${L.tx2}"><a href="{{url_minha_conta}}" class="e-tx2" style="color:${L.tx2};text-decoration:underline">Minha conta</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="{{url_central_ajuda}}" class="e-tx2" style="color:${L.tx2};text-decoration:underline">Central de ajuda</a>&nbsp;&nbsp;·&nbsp;&nbsp;<a href="{{url_privacidade}}" class="e-tx2" style="color:${L.tx2};text-decoration:underline">Privacidade</a></td></tr>
${sp(16)}
<tr><td class="e-rule" height="1" style="height:1px;line-height:1px;font-size:0;background:${L.line}">&nbsp;</td></tr>
${sp(16)}
<tr><td class="e-tx2" style="font:400 12px/19px ${FB};color:${L.tx2}">${o.mkt
  ? `Você recebe este e-mail porque ativou este aviso na sua conta Achecar. <a href="{{url_preferencias}}" class="e-tx2" style="color:${L.tx2};text-decoration:underline">Gerenciar avisos</a> ou <a href="{{url_descadastro}}" class="e-tx2" style="color:${L.tx2};text-decoration:underline">cancelar inscrição</a>.`
  : `Este é um e-mail sobre a sua conta e não pode ser desativado. Não responda: esta caixa não é lida.`}<br><br>{{empresa_razao_social}} · CNPJ {{empresa_cnpj}}<br>{{empresa_endereco}}</td></tr>
</table></td></tr>`;
const row = (inner, padd = "0 32px") => `<tr><td class="e-px" style="padding:${padd}">${inner}</td></tr>`;
const badge = (t, tone = "info") => { const c = TONE[tone]; return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td class="e-t-${tone}" style="background:${c.bg};border-radius:999px;padding:6px 12px 6px 10px;font:700 12px/16px ${FB};color:${c.tx}"><span class="e-ttx" style="color:${c.tx}"><span class="e-dot-${tone}" style="color:${c.dot};font-size:14px;line-height:14px">&#9679;</span>&nbsp; ${t}</span></td></tr></table>`; };
const GR = {
  info: ["#3A1A7A", "linear-gradient(135deg,#25105A 0%,#5B21B6 55%,#9D3DB5 100%)", "#C9AEFF"],
  ok: ["#1E3A5F", "linear-gradient(135deg,#1F1550 0%,#4C1D95 50%,#0F7A5A 115%)", "#7EE2B0"],
  warn: ["#4A2268", "linear-gradient(135deg,#2A1260 0%,#6B2BA8 55%,#C26A1A 120%)", "#FFD08A"],
  err: ["#2A1B3D", "linear-gradient(135deg,#1D2433 0%,#3B1D4F 55%,#A3201A 125%)", "#FFA59B"],
  paid: ["#8A2A55", "linear-gradient(135deg,#5B21B6 0%,#C2418F 52%,#FF5040 100%)", "#FFD3CC"]
};
const hero = ({ status, tone = "info", title, text, img, imgAlt = "", imgH = 88, hello = true }) => { const g = GR[tone] || GR.info; const ih = Math.round(imgH * 120 / 88); return `<tr><td bgcolor="${g[0]}" style="background:${g[0]};background-image:${g[1]};border-radius:20px 20px 0 0">
<!--[if gte mso 9]><v:rect xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false" style="width:600px"><v:fill type="gradient" color="${g[0]}" color2="#7D3EE3" angle="135"/><v:textbox inset="0,0,0,0"><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
<tr><td class="e-px" style="padding:26px 32px 0"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td align="left" valign="middle"><a href="{{url_site}}" style="text-decoration:none;display:inline-block"><img src="${A}/logo-achecar-branco.png" width="124" height="25" alt="Achecar" style="display:block;border:0;width:124px;height:25px;font:800 20px ${FH};color:#FFFFFF"></a></td>
${status ? `<td align="right" valign="middle"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td style="background:rgba(255,255,255,.14);border:1px solid rgba(255,255,255,.22);border-radius:999px;padding:6px 12px 6px 10px;font:700 12px/16px ${FB};color:#FFFFFF;white-space:nowrap"><span style="color:${g[2]};font-size:13px;line-height:13px">&#9679;</span>&nbsp; ${status}</td></tr></table></td>` : ""}
</tr></table></td></tr>
<tr><td class="e-px" style="padding:30px 32px 34px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
<td valign="middle" class="e-stack">
${hello && !String(title).includes("{{nome}}") ? `<p style="margin:0 0 10px;font:500 15px/22px ${FB};color:#E9DDFF">Oi, {{nome}}!</p>` : ""}
<h1 class="e-h1" style="margin:0;font:800 28px/35px ${FH};color:#FFFFFF;mso-line-height-rule:exactly">${title}</h1>
${text ? `<p style="margin:12px 0 0;font:400 16px/25px ${FB};color:#EDE4FF;mso-line-height-rule:exactly">${text}</p>` : ""}</td>
${img ? `<td width="132" valign="middle" align="right" class="e-hide-m" style="padding-left:12px"><img src="${A}/${img}" width="120" height="${ih}" alt="${imgAlt}" style="display:block;border:0;width:120px;height:${ih}px"></td>` : ""}
</tr></table></td></tr>
</table>
<!--[if gte mso 9]></v:textbox></v:rect><![endif]-->
</td></tr>
${sp(28)}`; };
const p = (t) => `<p class="e-tx1" style="margin:0 0 16px;font:400 15px/24px ${FB};color:${L.tx1};mso-line-height-rule:exactly">${t}</p>`;
const small = (t) => `<p class="e-tx2" style="margin:0;font:400 13px/20px ${FB};color:${L.tx2}">${t}</p>`;
const h2 = (t) => `<p class="e-tx1" style="margin:0 0 12px;font:800 17px/24px ${FH};color:${L.tx1}">${t}</p>`;
const label = (t) => `<p class="e-tx2" style="margin:0 0 10px;font:700 11px/16px ${FB};letter-spacing:1px;text-transform:uppercase;color:${L.tx2}">${t}</p>`;
const btn = (t, href, kind = "brand") => { const c = BTN[kind]; return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" class="e-btn"><tr><td align="center" bgcolor="${c}" style="border-radius:10px;background:${c}">
<!--[if mso]><v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:52px;v-text-anchor:middle;width:320px" arcsize="19%" stroke="f" fillcolor="${c}"><w:anchorlock/><center style="color:#FFFFFF;font-family:Arial,sans-serif;font-size:16px;font-weight:bold">${t}</center></v:roundrect><![endif]-->
<!--[if !mso]><!--><a href="${href}" style="display:inline-block;padding:16px 30px;font:700 16px/20px ${FB};color:#FFFFFF;text-decoration:none;border-radius:10px;text-align:center">${t}</a><!--<![endif]-->
</td></tr></table>`; };
const plate = (v) => `<span class="e-plate" style="display:inline-block;padding:2px 10px;border:2px solid ${L.tx1};border-radius:6px;background:#FFFFFF;font:700 15px/22px ${FM};letter-spacing:2px;color:${L.tx1};white-space:nowrap">${v}</span>`;
const info = (rows, title) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="e-soft" style="background:${L.soft};border-radius:14px">
${title ? `<tr><td colspan="2" style="padding:18px 20px 6px">${label(title)}</td></tr>` : `<tr><td colspan="2" style="height:8px;line-height:8px;font-size:0">&nbsp;</td></tr>`}
${rows.map(([k, v], i) => `<tr><td class="e-tx2 e-line" valign="middle" style="padding:12px 0 12px 20px;font:400 14px/20px ${FB};color:${L.tx2};${i ? `border-top:1px solid ${L.line};` : ""}">${k}</td><td class="e-tx1 e-line" align="right" valign="middle" style="padding:12px 20px 12px 12px;font:700 14px/20px ${FB};color:${L.tx1};${i ? `border-top:1px solid ${L.line};` : ""}">${v}</td></tr>`).join("")}
<tr><td colspan="2" style="height:8px;line-height:8px;font-size:0">&nbsp;</td></tr></table>`;
const notice = (t, tone = "info", icon = "") => { const c = TONE[tone]; return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="e-t-${tone}" style="background:${c.bg};border-radius:12px;padding:15px 18px"><p class="e-ttx" style="margin:0;font:400 14px/22px ${FB};color:${c.tx}">${icon ? `<b>${icon}</b> ` : ""}${t}</p></td></tr></table>`; };
const code = (v) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" class="e-lilac" style="background:${L.lilac};border-radius:14px;padding:26px 12px"><p class="e-code e-tx1" style="margin:0;font:700 36px/42px ${FM};letter-spacing:10px;color:${L.tx1}">${v}</p></td></tr></table>`;
const steps = (list) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">${list.map((s, i) => `<tr><td width="40" valign="top" style="padding:${i ? 12 : 0}px 0 0"><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><td width="28" height="28" align="center" valign="middle" class="e-lilac" style="width:28px;height:28px;border-radius:14px;background:${L.lilac};font:800 13px/28px ${FB};color:${L.brand}"><span class="e-brand" style="color:${L.brand}">${i + 1}</span></td></tr></table></td><td valign="top" class="e-tx1" style="padding:${i ? 16 : 4}px 0 0;font:400 15px/22px ${FB};color:${L.tx1}">${s}</td></tr>`).join("")}</table>`;
const rule = row(`<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td class="e-rule" height="1" style="height:1px;line-height:1px;font-size:0;background:${L.line}">&nbsp;</td></tr></table>`);
const fallback = (href) => small(`Se o botão não abrir, copie este endereço: <a href="${href}" class="e-brand" style="color:${L.brand};word-break:break-all">${href}</a>`);
const a = (t, href) => `<a href="${href}" class="e-brand" style="font-family:${FB};color:${L.brand};font-weight:700;text-decoration:underline">${t}</a>`;
const gen = (e) => hero({ status: e.status, tone: e.tone, title: e.title, text: e.text, img: e.img, imgH: e.imgH || 88 }) +
  (e.code ? row(code(e.code)) + sp(18) : "") +
  (e.info ? row(info(e.info, e.infoTitle)) + sp(22) : "") +
  (e.paras ? row(e.paras.map(p).join("")) + sp(4) : "") +
  (e.note && e.notePos !== "end" ? row(notice(e.note[0], e.note[1] || "info", e.note[2] || "")) + sp(22) : "") +
  (e.btn ? row(btn(e.btn[0], e.btn[1], e.btn[2] || "brand")) + sp(e.after ? 14 : 22) : "") +
  (e.after ? row(small(e.after)) + sp(22) : "") +
  (e.note && e.notePos === "end" ? row(notice(e.note[0], e.note[1] || "info", e.note[2] || "")) + sp(22) : "") +
  (e.steps ? rule + sp(26) + row(h2(e.stepsTitle || "Próximos passos") + steps(e.steps)) + sp(26) : "") +
  (e.list ? rule + sp(26) + row(h2(e.listTitle) + e.list.map(([t, d, href]) => `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 10px"><tr><td class="e-soft" style="background:${L.soft};border-radius:12px;padding:14px 16px"><p class="e-tx1" style="margin:0;font:700 15px/21px ${FB};color:${L.tx1}">${href ? `<a href="${href}" class="e-tx1" style="color:${L.tx1};text-decoration:none">${t}</a>` : t}</p><p class="e-tx2" style="margin:4px 0 0;font:400 14px/21px ${FB};color:${L.tx2}">${d}</p></td></tr></table>`).join("")) + sp(16) : "") +
  (e.tail ? row(`<p class="e-tx2" style="margin:0;font:400 14px/22px ${FB};color:${L.tx2}">${e.tail}</p>`) + sp(10) : "") + sp(22);
const SYS = { gen, L, D, TONE, BTN, FH, FB, FM, A, sp, shell, row, badge, hero, p, small, h2, label, btn, plate, info, notice, code, steps, rule, fallback, a };
