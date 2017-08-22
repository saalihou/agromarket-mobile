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

const GET_PUBLICATIONS_LIMIT = 20;

class PublicationStore {
  @observable productTypes: Array<ProductType> = [];
  @observable publishing: boolean;
  @observable fetching: boolean;
  @observable publications: Array<Publication> = [];

  _currentPublicationIndex = 0;
  _lastPublicationReached = false;

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

  async getNextPublications() {
    if (this.fetching || this._lastPublicationReached) {
      return;
    }
    this.fetching = true;
    const response = await api.get('/Publications', {
      filter: {
        limit: GET_PUBLICATIONS_LIMIT,
        skip: this._currentPublicationIndex
      }
    });
    if (!response.ok) {
      this.fetching = false;
      throw response.data.error || response.data;
    }
    this.fetching = false;
    this._currentPublicationIndex += response.data.length;
    this.publications = this.publications.concat(response.data);
    if (response.data.length < GET_PUBLICATIONS_LIMIT) {
      this._lastPublicationReached = true;
    }
  }
}

export default new PublicationStore();
