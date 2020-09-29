interface IMailConfig {
  driver: 'ethereal' | 'mailjet';

  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',

  defaults: {
    from: {
      email: 'dikezeko.oliveira@firgun.com.br', // email padrão de envio
      name: 'Equipe Firgun',
    },
  },
} as IMailConfig;
