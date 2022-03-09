'use strict';
let mongoose = require('mongoose');

let PostSchema = new mongoose.Schema(
  {
    title: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        text: String,
        postedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        },
      },
    ],
  },
  {
    toObject: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

module.exports = mongoose.model('Post', PostSchema);
