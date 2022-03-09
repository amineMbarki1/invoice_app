const mongooose = require('mongoose');
const getRandomId = require('../utils/randomIDGenerator');

const invoiceSchema = mongooose.Schema(
  {
    id: {
      type: String,
      default: getRandomId(6),
    },
    paymentDue: {
      type: Date,
      requied: true,
    },

    description: {
      type: String,
      required: true,
    },

    paymentTerms: {
      type: Number,
      required: true,
    },

    clientName: {
      type: String,
      required: true,
    },

    clientEmail: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      required: true,
    },

    senderAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    clientAddress: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },

    items: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        total: {
          type: Number,
        },
      },
    ],
    total: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongooose.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true }
);

invoiceSchema.pre('save', function (next) {
  this.items.forEach((item, i) => {
    this.items[i].total = item.quantity * item.price;
  });

  this.total = this.items.reduce((prev, cur) => prev + cur.total, 0);

  next();
});

module.exports = mongooose.model('Invoice', invoiceSchema);
