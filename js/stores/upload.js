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

class UploadStore {
  @observable progresses = new Map();
  @observable jobs = {};

  async selectImagesAndUpload() {
    const chance = new Chance();
    const images = await ImagePicker.openPicker({
      multiple: true
    });
    const jobId = chance.guid();
    this.jobs[jobId] = [];
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

  async upload({ path, name, type, uploadId }) {
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

export default new UploadStore();
