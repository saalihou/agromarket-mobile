// @flow
import { observable } from 'mobx';
import { AsyncStorage } from 'react-native';

import api from '../config/api';

export type ProductType = {
  id: string,
  label: string,
  unit: string,
  field: string
};

export type PublicationZone = {
  region: string,
  department: string
};

export type Publication = {
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

/**
 * A store for managing publications
 * 
 * Responsible for fetching, creating and removing publications
 * 
 * @class PublicationStore
 */
class PublicationStore {
  @observable
  /** The product types from the API */
  productTypes: Array<ProductType> = [];

  @observable
  /** Whether the user is currently publishing or not */
  publishing: boolean;

  @observable
  /** Whether we are currently fetching publications or not, use it to display a spinner */
  fetching: boolean;

  @observable
  /** The current list of publications fetched from the API */
  publications: Array<Publication> = [];

  @observable
  /** The current list of the logged in user's publications */
  myPublications: Array<Publication> = [];
  
  @observable
  /** The publication id being currently removed */
  removingItem: string = null;

  /** @private */
  _currentPublicationIndex = 0;
  /** @private */
  _lastPublicationReached = false;

  
  /**
   * Fetch product types and update the store
   * 
   * @returns {Promise<undefined>} 
   * @memberof PublicationStore
   */
  async refreshProductTypes(): Promise<undefined> {
    const response = await api.get('/ProductTypes');
    if (!response.ok) {
      throw response.data.error || response.data;
    }
    this.productTypes = response.data;
  }

  /**
   * Create a publication
   * 
   * @param {Publication} publication - the publication to publish
   * @returns {Promise<Publication>} - resolved with the published publication
   * @memberof PublicationStore
   */
  async publish(publication: Publication): Promise<Publication> {
    this.publishing = true;
    const response = await api.post('/Publications', publication);
    if (!response.ok) {
      this.publishing = false;
      throw response.data.error || response.data;
    }
    this.publishing = false;
    const newPublication = response.data;
    this.myPublications.unshift(newPublication);
    this.publications.unshift(newPublication);
    return newPublication;
  }

  /**
   * Remove a publication 
   * 
   * @param {string} publicationId - the id of the publication to remove
   * @returns {Promise<undefined>} 
   * @memberof PublicationStore
   */
  async remove(publicationId: string): Promise<undefined> {
    this.removingItem = publicationId;
    const response = await api.delete(`/Publications/${publicationId}`);
    if (!response.ok) {
      this.removingItem = null;
      throw response.data.error || response.data;
    }
    this.removingItem = null;
    this.publications = this.publications.filter(p => p.id !== publicationId);
    this.myPublications = this.myPublications.filter(
      p => p.id !== publicationId
    );
  }

  /**
   * Get the next page in the publications
   * 
   * Publications are paginated, this fetches the next page and appends it
   * to the current list of publications
   * 
   * @returns {Promise<undefined>} 
   * @memberof PublicationStore
   */
  async getNextPublications(): Promise<undefined> {
    if (this.fetching || this._lastPublicationReached) {
      return;
    }
    this.fetching = true;
    const response = await api.get('/Publications', {
      filter: {
        limit: GET_PUBLICATIONS_LIMIT,
        skip: this._currentPublicationIndex,
        order: 'createdDate DESC'
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
  
  /**
   * Fetch the logged in user's publications and update the store
   * 
   * @returns {Promise<undefined>} 
   * @memberof PublicationStore
   */
  async getMyPublications(): Promise<undefined> {
    try {
      this.loading = true;
      const userId = await AsyncStorage.getItem('currentUserId');
      if (!userId) {
        return;
      }
      const myPubsResponse = await api.get('/Publications', {
        filter: {
          where: {
            userId
          }
        }
      });
      if (!myPubsResponse.ok) {
        throw myPubsResponse.data.error || myPubsResponse.data;
      }
      this.myPublications = myPubsResponse.data;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }
  
  /**
   * Clear the logged in user's publications
   * 
   * @memberof PublicationStore
   */
  clearMyPublications(): undefined {
    this.myPublications = [];
  }
}

/**
 * @ignore
 */
export default new PublicationStore();

export { PublicationStore };
