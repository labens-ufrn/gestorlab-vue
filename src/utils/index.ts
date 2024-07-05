export function removerCaracter(texto: any) {
  const regex = /[.\-\/()\s]/g;
  const textoSemCaracteres = texto.replace(regex, '');
  return Number(textoSemCaracteres);
}