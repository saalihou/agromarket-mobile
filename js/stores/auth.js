// @flow
import { observable } from 'mobx';
import assign from 'lodash/assign';
import { AsyncStorage } from 'react-native';

import api from '../config/api';

export type AuthParams = {
  phoneNumber: string,
  password: string
};

export type User = {
  id: string,
  phoneNumber: string,
  profile: UserProfile
};

export type UserProfile = {
  firstName: string,
  lastName: string,
  phoneNumbers: Array<string>,
  address: UserAddress
};

export type UserAddress = {
  region: string,
  department: string,
  district: string,
  details: string
};

export type Token = {
  id: string,
  ttl: number,
  created: Date,
  userId: string
};

/**
 * Store for managing authentication, authorization and sessions
 * 
 * @class AuthStore
 */
class AuthStore {
  @observable
  /** The user being currently subscribed */
  pendingUser: User = null;

  @observable
  /** Whether the store is busy or not */
  loading: boolean = false;

  @observable
  /** The authentication token currently used */
  token: Token = null;

  @observable
  /** The current logged in user */
  currentUser: User = null;

  /**
   * Subscribe a user
   * 
   * @param {AuthParams} params - the authentication parameters
   * @returns {Promise<User>} - resolved with a user in pending state
   * @memberof AuthStore
   */
  async subscribe({ phoneNumber, password }: AuthParams): Promise<User> {
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

  /**
   * Log a user in
   * 
   * @param {AuthParams} params - the authentication parameters
   * @returns {Promise<User>} 
   * @memberof AuthStore
   */
  async login({ phoneNumber, password }: AuthParams): Promise<User> {
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
      const user = userResponse.data;
      await AsyncStorage.multiSet([
        ['session', JSON.stringify({ currentUser: user, token: this.token })],
        ['currentUserId', user.id]
      ]);
      this.currentUser = user;
      return this.currentUser;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Log the current user out
   * 
   * @returns {Promise<boolean>} 
   * @memberof AuthStore
   */
  async logout(): Promise<boolean> {
    try {
      this.loading = true;
      this.currentUser = null;
      this.token = null;
      const logoutResponse = await api.post('/AGMUsers/logout');
      if (!logoutResponse.ok) {
        throw logoutResponse.data.error || logoutResponse.data;
      }
      await AsyncStorage.multiRemove(['session', 'currentUserId']);
      return true;
    } catch (e) {
      throw e;
    } finally {
      this.loading = false;
    }
  }

  /**
   * Restore the current user's session
   * 
   * Call this when the app launches
   * 
   * @returns {Promise<undefined>} 
   * @memberof AuthStore
   */
  async restoreSession(): Promise<undefined> {
    try {
      const session = await AsyncStorage.getItem('session');
      if (!session) {
        console.log('No session to restore');
        return;
      }
      const sessionObject = JSON.parse(session);
      this.currentUser = sessionObject.currentUser;
      this.token = sessionObject.token;
      api.setHeader('Authorization', this.token.id);
    } catch (e) {
      console.log('Session restore failed', e);
    }
  }

  /**
   * Verify a pending user's phone when subscribing
   * 
   * @param {string} code - the code to verify
   * @returns {Promise<{ verified: boolean }>} - resolved with whether verification is good or not 
   * @memberof AuthStore
   */
  async verifyPhone(code: string): Promise<{ verified: boolean }> {
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

  /**
   * Update the pending user's profile with various keys
   * 
   * @param {object} profile 
   * @returns {Promise<undefined>} 
   * @memberof AuthStore
   */
  async updatePendingProfile(profile: object): Promise<undefined> {
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

/**
 * @ignore
 */
export default new AuthStore();

export { AuthStore };
