// @flow
import { observable } from 'mobx';

import api from '~config/api';

type ProductType = {
  id: string,
  label: string,
  unit: string,
  field: string
};

type PublicationZone = {
  region: string,
  department: string
};

type Publication = {
  id: string,
  label: string,
  stock: number,
  description: string,
  zone: PublicationZone,
  pictures: Array<string>,
  productTypeId: string,
  userId: string
};

class PublicationStore {
  @observable productTypes: Array<ProductType> = [];
  @observable publishing: boolean;

  async refreshProductTypes() {
    const response = await api.get('/ProductTypes');
    if (!response.ok) {
      throw response.data.error || response.data;
    }
    this.productTypes = response.data;
  }

  async publish(publication: Publication): Publication {
    this.publishing = true;
    const response = await api.post('/Publications', publication);
    if (!response.ok) {
      this.publishing = false;
      throw response.data.error || response.data;
    }
    this.publishing = false;
    return response.data;
  }
}

export default new PublicationStore();
