/* eslint-disable indent */
export function removerCaracter(texto: any) {
  // eslint-disable-next-line no-useless-escape
  const regex = /[.\-\/()\s]/g;
  const textoSemCaracteres = texto.replace(regex, '');
  return Number(textoSemCaracteres);
}

export function chooseListMenu(option: Number) {
  const menuAdmin = [
    {
      label: 'Linha do tempo',
      icon: 'view_timeline',
      separator: true,
      link: ''
    },
    {
      label: 'Coordenadores',
      icon: 'admin_panel_settings',
      separator: true,
      link: ''
    },
    {
      label: 'Laboratorios',
      icon: 'group_work',
      separator: true,
      link: ''
    },
    {
      label: 'Pedidos de acesso',
      icon: 'person_add',
      separator: true,
      link: 'pedidos-acess'
    },
    {
      label: 'Usuários',
      icon: 'group',
      separator: true,
      link: ''
    },
    {
      label: 'Projetos',
      icon: 'dashboard',
      separator: true,
      link: ''
    },
    {
      label: 'Colaboradores',
      icon: 'diversity_2',
      separator: true,
      link: ''
    },
  ];

  const menuCoordenador = [
    {
      label: 'Linha do tempo',
      icon: 'view_timeline',
      separator: true,
      link: ''
    },
    {
      label: 'Laboratórios',
      icon: 'group_work',
      separator: true,
      link: ''
    },
    {
      label: 'Pedidos de acesso',
      icon: 'person_add',
      separator: true,
      link: ''
    },
    {
      label: 'Membros',
      icon: 'group',
      separator: true,
      link: ''
    },
    {
      label: 'Projetos',
      icon: 'dashboard',
      separator: true,
      link: ''
    },
    {
      label: 'Colaboradores',
      icon: 'diversity_2',
      separator: true,
      link: ''
    },
  ];

  const menuMember = [
    {
      label: 'Linha do tempo',
      icon: 'view_timeline',
      separator: true,
      link: ''
    },
    {
      label: 'Laboratório',
      icon: 'group_work',
      separator: true,
      link: ''
    },
    {
      label: 'Projetos',
      icon: 'dashboard',
      separator: true,
      link: ''
    },
    {
      label: 'Colaboradores',
      icon: 'diversity_2',
      separator: true,
      link: ''
    },
  ];

  const menuColaboradores = [
    {
      label: 'Linha do tempo',
      icon: 'view_timeline',
      separator: true,
      link: ''
    },
    {
      label: 'Laboratório',
      icon: 'group_work',
      separator: true,
      link: ''
    },
    {
      label: 'Projetos',
      icon: 'dashboard',
      separator: true,
      link: ''
    },
  ];

  let decisionOption = null;
  switch (option) {
    case 0:
      decisionOption = menuMember;
      break;
    case 1:
      decisionOption = menuCoordenador;
      break;
    case 2:
      decisionOption = menuAdmin;
      break;
    case 3:
      decisionOption = menuColaboradores;
      break;
    default:
      decisionOption = menuMember;
  }

  return decisionOption;
}