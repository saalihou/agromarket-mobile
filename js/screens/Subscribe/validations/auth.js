module.exports = {
  phoneNumber: {
    presence: {
      message: '^Le téléphone doit être renseigné'
    },
    format: {
      pattern: /(70|76|77|78)[\d]{7}/,
      message: "^%{value} n'est pas un numéro de téléphone valide"
    }
  },
  password: {
    presence: {
      message: '^Le mot de passe doit être renseigné'
    }
  }
};
