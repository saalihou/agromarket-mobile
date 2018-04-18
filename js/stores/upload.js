// @flow
import { observable } from 'mobx';
import ImagePicker from 'react-native-image-crop-picker';
import { RNS3 } from 'react-native-aws3';
import Chance from 'chance';
import Promise from 'bluebird';

import api from '../config/api';

const uploadOptions = {
  keyPrefix: 'images/',
  bucket: 'folomi2',
  region: 'eu-west-2',
  accessKey: 'AKIAITRBXW2E7XY2WJYQ',
  secretKey: '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'
};

/**
 * Upload helpers and tracking
 * 
 * Manages selection and uploading of files from the user's device.
 * Also keeps track of the progress of uploads and groups them
 * under jobs
 * 
 * @class UploadStore
 */
class UploadStore {
  @observable
  /** A <String, Number> map that keeps track of different upload progresses */
  progresses: Map = new Map();

  @observable
  /** An object having upload jobs under different keys, each job is a collection of uploads */
  jobs: object = {};

  /**
   * Select images from the gallery and upload them
   * @param {string} existingJobId - if this is part of an existing upload job, pass its id
   * @returns {Promise} - resolved with an array, [jobId, uploadPromise]
   * @memberof UploadStore
   */
  async selectImagesAndUpload(existingJobId: string): Promise {
    const chance = new Chance();
    const images = await ImagePicker.openPicker({
      multiple: true
    });
    const jobId = existingJobId || chance.guid();
    this.jobs[jobId] = this.jobs[jobId] || [];
    return [
      jobId,
      Promise.map(images, async image => {
        const uploadId = chance.guid();
        const upload = {
          path: image.path,
          name: image.path.substr(-10),
          type: image.mime,
          uploadId
        };
        this.jobs[jobId].push(upload);
        const location = await this.upload(upload);
        return location;
      })
    ];
  }

  /**
   * Upload a file
   * 
   * @param {object} options { path, name, type, uploadId } 
   * @returns {Promise} - resolved when the upload completes
   * @memberof UploadStore
   */
  async upload({ path, name, type, uploadId }): Promise {
    const response = await RNS3.put(
      {
        uri: path,
        name,
        type
      },
      uploadOptions
    ).progress(data => {
      this.progresses.set(uploadId, data.percent);
    });

    return response.body.postResponse.location;
  }
}

/**
 * @ignore
 */
export default new UploadStore();

export { UploadStore };
