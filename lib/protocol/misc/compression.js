'use strict';

var Promise = require('bluebird');
var zlib    = require('zlib');
var _ = require('lodash');

var Gzip;

Gzip = {
    decompress: zlib.gunzipSync,

    decompressAsync: _.ary(Promise.promisify(zlib.gunzip), 1),

    compress: zlib.gzipSync,

    compressAsync: _.ary(Promise.promisify(zlib.gzip), 1),
};

module.exports = {
    decompress: function (buffer, codec) {
        if (codec === 1 && typeof zlib.gunzipSync === 'function') {
            return Gzip.decompress(buffer);
        }
        /* istanbul ignore next */
        throw new Error('Unsupported compression codec ' + codec);
    },
    decompressAsync: function (buffer, codec) {
        if (codec === 1) {
            return Gzip.decompressAsync(buffer);
        }
        /* istanbul ignore next */
        return Promise.reject(new Error('Unsupported compression codec ' + codec));
    },
    compress: function (buffer, codec) {
        if (codec === 1 && typeof zlib.gzipSync === 'function') {
            return Gzip.compress(buffer);
        }
        throw new Error('Unsupported compression codec ' + codec);
    },
    compressAsync: function (buffer, codec) {
        if (codec === 1) {
            return Gzip.compressAsync(buffer);
        }
        return Promise.reject(new Error('Unsupported compression codec ' + codec));
    }
};
