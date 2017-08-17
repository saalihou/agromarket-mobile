// @flow
import { observable } from 'mobx';

import api from '~config/api';

type ProductType = {
  id: string,
  label: string,
  unit: string,
  field: string
};

class PublicationStore {
  @observable productTypes: Array<ProductType> = [];

  async refreshProductTypes() {
    const response = await api.get('/ProductTypes');
    if (!response.ok) {
      throw response.data.error || response.data;
    }
    this.productTypes = response.data;
  }
}

export default new PublicationStore();
