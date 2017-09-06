// @flow
import { observable } from 'mobx';
import assign from 'lodash/assign';

import api from '~config/api';

type AuthParams = {
  phoneNumber: string,
  password: string
};

class AuthStore {
  @observable pendingUser = null;
  @observable loading = false;
  @observable token = null;
  @observable currentUser = null;

  async subscribe({ phoneNumber, password }: AuthParams) {
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

  async login({ phoneNumber, password }: AuthParams) {
    this.loading = true;
    try {
      const loginResponse = await api.post('/AGMUsers/loginWithPhone', {
        phoneNumber: `221${phoneNumber}`,
        password
      });
      if (!loginResponse.ok) {
        throw loginResponse.data.error || loginResponse.data;
      }
      this.token = loginResponse.data;
      api.setHeader('Authorization', this.token.id);
      const userResponse = await api.get(`/AGMUsers/${this.token.userId}`);
      if (!userResponse.ok) {
        throw userResponse.data.error || userResponse.data;
      }
      this.currentUser = userResponse.data;
      return this.currentUser;
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
      const response = await api.patch(`/AGMUsers/${this.pendingUser.id}`, {
        profile: mergedProfile
      });
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
