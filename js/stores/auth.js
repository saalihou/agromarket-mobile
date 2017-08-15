// @flow
import { observable } from 'mobx';
import assign from 'lodash/assign';

import api from '~config/api';

type SubscribeParams = {
  phoneNumber: string,
  password: string
};

class AuthStore {
  @observable pendingUser = null;
  @observable loading = false;

  async subscribe({ phoneNumber, password }: SubscribeParams) {
    try {
      this.loading = true;
      const response = await api.post('/AGMUsers', {
        phoneNumber: `221${phoneNumber}`,
        password
      });
      if (!response.ok) {
        throw response.data.error || response.data;
      }
      this.pendingUser = response.data;
      const loginResponse = await api.post('/AGMUsers/loginWithPhone', {
        phoneNumber: this.pendingUser.phoneNumber,
        password
      });
      if (!loginResponse.ok) {
        throw loginResponse.data.error || loginResponse.data;
      }
      const token = loginResponse.data;
      api.setHeader('Authorization', token.id);
      return this.pendingUser;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  async verifyPhone(code: string): { verified: boolean } {
    try {
      const response = await api.post('/AGMUsers/verifyPhone', {
        phoneNumber: this.pendingUser.phoneNumber,
        code
      });
      if (!response.ok) {
        throw response.data.error || response.data;
      }
      return response.data;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  async updatePendingProfile(profile) {
    try {
      this.loading = true;
      const mergedProfile = {};
      assign(mergedProfile, this.pendingUser.profile, profile);
      const response = await api.patch(
        `/AGMUsers/${this.pendingUser.id}`,
        { profile: mergedProfile }
      );
      if (!response.ok) {
        throw response.data.error || response.data;
      }
      this.pendingUser.profile = response.data.profile;
      return response.data;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }
}

export default new AuthStore();
