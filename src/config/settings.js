/**
 * Created by arnauddebacker on 11/07/17.
 */
'use strict';
var constants = require('src/constants');

module.exports = {
  OVH: {
    OBJECT_STORAGE: {
      PROVIDER: process.env.OBJECT_STORAGE_PROVIDER,
      USERNAME: process.env.OBJECT_STORAGE_USERNAME,
      PASSWORD: process.env.OBJECT_STORAGE_PASSWORD,
      TENANT_ID: process.env.OBJECT_STORAGE_TENANT_ID,
      REGION: process.env.OBJECT_STORAGE_REGION,
      AUTH_URL: process.env.OBJECT_STORAGE_AUTH_URL,
      VERSION: process.env.OBJECT_STORAGE_VERSION
    }
  }
};
