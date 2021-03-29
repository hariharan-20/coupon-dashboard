const mongoose = require("mongoose");

const coupon = mongoose.Schema(
  {
    code: {
      type: String,
      unique:true,
      require: true,
    },
    purpose: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      default: "Not Applicable",
    },
    validfrom: {
      type: Date,
      default: new Date(),
    },
    validuntil: {
      type: Date,
    },
    /*
        P - %
        F - Flat - Amount
    */
    discounttype: {
      type: String,
      enum: ["P", "F"],
      default: "F",
    },
    discountamount: {
      type: Number,
      min: 0,
      require: true,
    },
    maxdiscount: {
      type: Number,
      min: 0,
    },
    minamount: {
      type: Number,
      default: 0,
      min: 0,
    },
    status: {
      type: Boolean,
    },
    createdby: {
      type: mongoose.Types.ObjectId,
      ref: "admin_base",
      require: true,
    },
    limit: {
      type: Number,
      default: 1,
      min: 0,
    },
    usercondition: [
      {
        userid: {
          type: String,
        },
        email: {
          type: String,
          require: true,
        },
        limit: {
          type: Number,
          min: 0,
          default: 1,
        },
        validfrom: {
          type: Date,
          default: new Date(),
        },
        validuntil: {
          type: Date,
        },
      },
    ],
    platformconditon: [
      {
        platformid: {
          type: mongoose.Types.ObjectId,
          ref: "platforms",
          require: true,
        },
        limit: {
          type: Number,
          min: 0,
          default: 1,
        },
        validfrom: {
          type: Date,
          default: new Date(),
        },
        validuntil: {
          type: Date,
        },
      },
    ],
    condition: [
      {
        field: {
          type: String,
        },
        matchtype: {
          type: String,
          length: 2,
        },
        value: {
          type: String,
        },
        data1: {
          type: String,
        },
        date2: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

coupon.pre("save", async function (next) {
  const couponInstance = this;

  if (couponInstance.isNew) {

    if (couponInstance.validfrom <= new Date()) {
     
        couponInstance.status = true;
    } else {
        couponInstance.status = false;
    }
  }

  if (couponInstance.isModified("validfrom")) {
    if (couponInstance.validfrom <= new Date()) {
        couponInstance.status = true;
    } else {
        couponInstance.status = false;
    }
  }

  next();
});

module.exports = mongoose.model("couponsv3", coupon, "couponsv3");
