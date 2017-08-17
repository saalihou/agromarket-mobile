module.exports = {
  productTypeId: {
    presence: {
      message: '^Vous devez renseigner un type de produit'
    }
  },
  unitPrice: {
    presence: {
      message: '^Vous devez renseigner un prix unitaire'
    }
  },
  stock: {
    presence: {
      message: '^Vous devez renseigner votre stock'
    }
  }
};
