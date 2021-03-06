export const PATHS = {
  portfolioDetail: {
    to: (code: string) => `/portfolio/${code}`,
  },
  portfolio: {
    to: (params?: URLSearchParams) => `/portfolio${params ? `?${params}` : ''}`,
  },
  portfolioSearch: {
    to: '/search-portfolio',
  },
};

export const WORDINGS = {
  DIVISION: 'Division',
  PORTFOLIO_TYPE: 'Type de portefeuille',
  PORTFOLIO_PARENT: 'Portefeuille parent',
  PORTFOLIO_MANAGER: 'Responsable du portefeuille',
  CREATE_PORTFOLIO: 'Créer Portefeuille',
  SEARCH_PORTFOLIO: 'Rechercher un portefeuille',
  NOT_SPECIFIED: 'Non renseigné',
  PORTFOLIO_SEARCH_PLACEHOLDER:
    'code parent, code portefeuille, code division...',
  CANCEL: 'Annuler',
  CONFIRM: 'Confirmer',
  DELETION_CONFIRMATION: 'Confirmation de suppression',
  PORTFOLIO_DELETION_MESSAGE:
    'Êtes-vous sûr de vouloir supprimer ce portefeuille?',
  ERRORS: {
    'technical.error':
      'Une erreur est survenue, veuillez réessayer ultérieurement.',
    'portfolio.notFound': 'Portefeuille introuvable',
  } as Record<string, string>,
};
