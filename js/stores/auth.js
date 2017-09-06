// @flow
import { observable } from 'mobx';
import assign from 'lodash/assign';
import { AsyncStorage } from 'react-native';

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
      await AsyncStorage.setItem(
        'session',
        JSON.stringify({ currentUser: this.currentUser, token: this.token })
      );
      return this.currentUser;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  async logout() {
    try {
      this.loading = true;
      this.currentUser = null;
      this.token = null;
      const logoutResponse = await api.post('/AGMUsers/logout');
      if (!logoutResponse.ok) {
        throw logoutResponse.data.error || logoutResponse.data;
      }
      await AsyncStorage.removeItem('session');
      return true;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  async restoreSession() {
    try {
      const session = await AsyncStorage.getItem('session');
      if (!session) {
        console.log('No session to restore');
        return;
      }
      const sessionObject = JSON.parse(session);
      this.currentUser = sessionObject.currentUser;
      this.token = sessionObject.token;
    } catch (e) {
      console.log('Session restore failed', e);
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
