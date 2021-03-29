const fs = require("fs");
const Readable = require("stream").Readable;
const path = require('path');



const Json2csvParser = require("json2csv").Parser;
const csv = require("csv-parser");
const validator = require("validator");



const Coupon = require("../models/couponv2");
const Employee = require("../models/employee");
const { sendEmail, sendUserEmail } = require("../utlities/sendEmail");


//Function to convert buffer to stream
function bufferToStream(buffer) {
  var stream = new Readable();
  stream.push(buffer);
  stream.push(null);

  return stream;
}



//Function to generate coupon code
const generateCouponCode = (len) => {
  let code = "";
  const keys = "0123456789abcdefghijklmnopqrstuvwxyz";
  for (let i = 0; i < len; i++) {
    code += keys[Math.floor(Math.random() * keys.length)];
  }
  return code;
};



//Function to check discount is applicable or not
const isDiscountApplicable = (price, discount) => {
  if (price < 4000) {
    return {
      valid: false,
    };
  }
  if (price >= 4000 && price < 7000) {
    if (discount > 1200) {
      return {
        valid: false,
      };
    }
  }
  if (price >= 7000 && price < 10000) {
    if (discount > 2700) {
      return {
        valid: false,
      };
    }
  }
  if (price >= 10000) {
    if (discount > 4300) {
      return {
        valid: false,
      };
    }
  }
  return {
    valid: true,
  };
};



// Adding Single Coupon with limit in conditions
const addCoupon = async (req, res) => {
  let { discount, courseName, programName, price, forEmail } = req.body;

  try {
    const { userType, email, name } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    if (!discount || !courseName || !programName || !price || !forEmail) {
      return res.status(400).json({
        error: {
          message: "Please fill out all the fields!",
        },
      });
    }

    const discountDetails = isDiscountApplicable(price, discount);

    if (!discountDetails.valid) {
      return res.status(400).json({
        error: {
          message:
            "Sorry! coupon cannot be generated. Either Price is too low or discount is too much!",
        },
      });
    }

    const couponCode = generateCouponCode(7);

    const validArr = [
      ["greaterThan", price],
      ["forCourse", courseName],
      ["forEmail", forEmail],
      ["forProgram", programName],
    ];

    const payload = {
      couponCode,
      couponPurpose: "For OnBoarding Form",
      byDiscountPerc: false,
      discount_perc: 0,
      discount_money: discount,
      discountLimit: false,
      maxDiscount: 0,
      startingDate: new Date().toLocaleDateString(),
      expireByDate: false,
      dateOfExpiry: new Date().toLocaleDateString(),
      isLimited: true,
      limitedTo: 1,
      validFor: validArr,
      couponStatus: true,
      createdBy: email,
      createdOn: new Date(),
    };

    const couponDetails = await Coupon.create(payload);

    const arg1 = {
      to: payload.createdBy,
      subject: "Coupon Code Details- Verzeo",
      template: "newCoupon",
      name: name,
      couponCode: payload.couponCode,
      couponPurpose: payload.couponPurpose,
      validFor: payload.validFor,
      discount: payload.discount_money,
    };

    const arg2 = {
      to: forEmail,
      subject: "Coupon for Registration- Verzeo",
      template: "couponToUser",
      couponCode: payload.couponCode,
      validFor: payload.validFor,
      discount: payload.discount_money,
    };

    //sendEmail(arg1);
    //sendUserEmail(arg2);

    res.status(201).send({
      msg: "Coupon Created Successfully!",
      couponDetails,
    });
  } catch (e) {
    return res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



//NOT In USE
const addCouponFullFledge = async (req, res) => {
  // console.log(req.body);
  const data = await Coupon.findOne({
    couponCode: req.body.code,
  });
  // console.log(data);
  if (data == null) {
    const fact = req.body.fact;
    const rule = req.body.rule;
    let validFor = [];
    console.log(typeof fact);
    if (fact != undefined && rule != undefined) {
      if (typeof fact != "string") {
        for (i = 0; i < fact.length; i++) {
          const condition = [fact[i], rule[i]];
          validFor.push(condition);
        }
      } else {
        validFor.push([fact, rule]);
      }

      // console.log(validFor);
    }
    // console.log('====================================');
    // console.log(validFor);

    await Coupon.create({
      couponCode: String(req.body.code).toLowerCase(),
      couponPurpose: req.body.purpose,
      couponDescription: req.body.description,
      byDiscountPerc: req.body.byper == "true",
      discount_perc: parseFloat(req.body.per),
      discount_money: parseFloat(req.body.discount),
      discountLimit: req.body.discountlimit == "true",
      maxDiscount: parseFloat(req.body.max),
      startingDate: new Date(req.body.starting).toLocaleDateString(),
      expireByDate: req.body.expiry == "true",
      dateOfExpiry: req.body.dateofexpiry,
      isLimited: req.body.islimited == "true",
      limitedTo: parseInt(req.body.limitedto),
      createdBy: req.body.email,
      couponStatus: true,
      createdOn: new Date().toLocaleString(),
      validFor: validFor,
    });
    res.send("working");
  } else {
    res.send(
      "Code already exist. You can update it or change coupon code name"
    );
  }
};



//Add a single coupon with multiple conditions (no limit)
const addCouponMulti = async (req, res) => {
  try {
    let {
      couponCode,
      couponPurpose,
      discount_perc,
      discount_money,
      limitedTo,
      conditions,
      startingDate,
      dateOfExpiry,
      maxDiscount,
    } = req.body;
    let discountLimit, byDiscount_money, byDiscountPerc, isLimited;

    //Data required to come from front-end
    if (!couponCode || !couponPurpose) {
      return res.status(400).json({
        error: {
          message: "Fill up the couponCode and couponPurpose.",
        },
      });
    }

    couponCode=couponCode.trim().toLowerCase()

    if (!/[0-9a-z]{7,10}/.test(couponCode)) {
      return res.status(400).json({
        error: {
          message:
            "Coupon Code should be a combination of 0-9 and a-z only and should be of 7 to 10 characters.",
        },
      });
    }

    //validator check
    discountLimit = !maxDiscount ? false : true;
    byDiscountPerc = !discount_perc ? false : true;
    isLimited = !limitedTo ? false : true;
    byDiscount_money = !discount_money ? false : true;

    // Either Discount by money or percent
    if (
      (byDiscount_money && byDiscountPerc) ||
      (!byDiscountPerc && !byDiscount_money)
    ) {
      return res.status(400).json({
        error: {
          message: "Choose either discount_money or discount_perc",
        },
      });
    }

    //Discount percent check
    if (byDiscountPerc) {
      let checkDiscount_perc = parseFloat(discount_perc);
      if (
        isNaN(discount_perc) ||
        checkDiscount_perc > 100 ||
        checkDiscount_perc < 0
      ) {
        return res.status(400).json({
          error: {
            message: "discount_perc should be in the range 0-100",
          },
        });
      }
    }
    //Discount money Check
    else {
      if (isNaN(discount_money) || parseFloat(discount_money) < 0) {
        return res.status(400).json({
          message: "discount_money should be a number",
        });
      }
    }

    //MaxDiscount Check
    if (discountLimit) {
      if (
        isNaN(maxDiscount) ||
        !byDiscountPerc ||
        parseFloat(maxDiscount) < 0
      ) {
        return res.status(400).json({
          error: {
            message:
              "Max Discount is applicable only if discont_perc is given. It should be a number",
          },
        });
      }
    }

    //LimitedTo check
    if (isLimited && (isNaN(limitedTo) || parseInt(limitedTo) < 0)) {
      return res.status(400).json({
        error: {
          message: "limitedTo should be a number",
        },
      });
    }

    //if start date not given then use current date otherwise check starting date
    let checkStartDate = new Date();

    if (startingDate) {
      checkStartDate = new Date(startingDate);
      if (
        checkStartDate == "Invalid Date" ||
        checkStartDate < new Date(new Date().toLocaleDateString())
      ) {
        return res.status(400).json({
          error: {
            message: "Invalid Starting Date",
          },
        });
      }
    }

    //dateOfExpiry Check
    if (dateOfExpiry) {
      let checkExpiryDate = new Date(dateOfExpiry);
      if (
        checkExpiryDate == "Invalid Date" ||
        checkStartDate > checkExpiryDate
      ) {
        return res.status(400).json({
          error: {
            message: "Invalid Date of Expiry",
          },
        });
      }
    }

    //coupon code exist or not
    const coupon = await Coupon.findOne({
      couponCode: couponCode,
    });

    if (coupon) {
      return res.status(400).json({
        error: {
          message: "Coupon Code Already Exist",
        },
      });
    }

    //conditons
    const validArr = [];

    for (let no = 0; no < conditions.length; no++) {
      let condition = conditions[no];

      let key = Object.keys(condition)[0];

      if (key == "forEmail") {
        if (!validator.isEmail(condition[key])) {
          return res.status(400).json({
            error: {
              message: `Invalid forEmail ${condition[key]}`,
            },
          });
        }
      }

      validArr.push([key, condition[key]]);
    }

    //payload
    const payload = {
      couponCode: couponCode.toLowerCase(),
      couponPurpose: couponPurpose,
      byDiscountPerc: byDiscountPerc,
      discount_perc: byDiscountPerc ? discount_perc : null,
      discount_money: byDiscountPerc ? null : discount_money,
      discountLimit: discountLimit,
      maxDiscount: discountLimit ? maxDiscount : null,
      startingDate: startingDate
        ? new Date(startingDate).toLocaleDateString()
        : new Date().toLocaleDateString(),
      expireByDate: dateOfExpiry ? true : false,
      dateOfExpiry: dateOfExpiry
        ? new Date(dateOfExpiry).toLocaleDateString()
        : "",
      isLimited: isLimited,
      limitedTo: isLimited ? limitedTo : null,
      validFor: validArr,
      couponStatus: true,
      createdBy: req.user.email,
      createdOn: new Date(),
    };

    const couponDetails = await Coupon.create(payload);
    res.status(201).send({
      msg: `Coupon Code- ${couponDetails.couponCode} Created Successfully!`,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



//get all the coupon details
const getAllCoupon = async (req, res) => {
  try {
    const { userType, email } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    let coupon;
    if (userType === "super_admin" || userType === "admin") {
      coupon = await Coupon.find({});
    } else {
      coupon = await Coupon.find({
        createdBy: email,
      });
    }
    if (!coupon || coupon.length < 1) {
      return res.status(404).json({
        error: {
          message: "No Coupon Found!",
        },
      });
    }
    res.status(200).send({
      coupon,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



// Getting Single Coupon Details
const getSingleCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const { userType, email } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    if (!id) {
      return res.status(400).json({
        error: {
          message: "Invalid Coupon Code!",
        },
      });
    }
    let coupon;
    if (userType === "admin" || userType === "super_admin") {
      coupon = await Coupon.findOne({
        _id: id,
      });
    } else {
      coupon = await Coupon.findOne({
        _id: id,
        createdBy: email,
      });
    }

    if (!coupon) {
      return res.status(404).json({
        error: {
          message: "No Coupon Found!",
        },
      });
    }

    res.status(200).send({
      coupon,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



// Changing Coupon Status Activate/Deactivate
const changeCouponStatus = async (req, res) => {
  const { id } = req.params;
  try {
    const { userType, email } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    if (!id) {
      return res.status(400).json({
        error: {
          message: "Invalid Coupon Code!",
        },
      });
    }
    let coupon;
    if (userType === "admin" || userType === "super_admin") {
      coupon = await Coupon.findOne({
        _id: id,
      });
    } else {
      coupon = await Coupon.findOne({
        _id: id,
        createdBy: email,
      });
    }

    if (!coupon) {
      return res.status(404).json({
        error: {
          message: "No Coupon Found!",
        },
      });
    }
    let status = false;
    if (!coupon.couponStatus) {
      status = true;
    }
    const updateCoupon = await Coupon.findOneAndUpdate(
      {
        _id: id,
      },
      {
        couponStatus: status,
      },
      {
        new: true,
      }
    );
    res.status(200).send({
      status: updateCoupon.couponStatus,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



// Update Single Coupon with limit
const updateCoupon = async (req, res) => {
  let { discount, courseName, programName, price, forEmail } = req.body;
  const { id } = req.params;
  try {
    const { userType, email } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    if (!id) {
      return res.status(400).json({
        error: {
          message: "Invalid Coupon Code!",
        },
      });
    }
    if (!discount || !courseName || !programName || !price || !forEmail) {
      return res.status(400).json({
        error: {
          message: "Please fill out all the fields!",
        },
      });
    }

    let coupon;
    if (userType === "admin" || userType === "super_admin") {
      coupon = await Coupon.findOne({
        _id: id,
      });
    } else {
      coupon = await Coupon.findOne({
        _id: id,
        createdBy: email,
      });
    }

    if (!coupon) {
      return res.status(404).json({
        error: {
          message: "No Coupon Found!",
        },
      });
    }
    const discountDetails = isDiscountApplicable(price, discount);
    if (!discountDetails.valid) {
      return res.status(400).json({
        error: {
          message:
            "Sorry! coupon cannot be generated. Either Price is too low or discount is too much!",
        },
      });
    }

    const validArr = [
      ["greaterThan", price],
      ["forCourse", courseName],
      ["forEmail", forEmail],
      ["forProgram", programName],
    ];

    const updateDetails = {
      discount_money: discount,
      validFor: validArr,
    };
    const couponDetails = await Coupon.findOneAndUpdate(
      {
        _id: id,
      },
      updateDetails,
      {
        new: true,
      }
    );
    res.status(200).send({
      msg: "Coupon Updated Successfully!",
      couponDetails,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



//Update single coupon with multiple condtions (no limit)
const updateCouponMulti = async (req, res) => {
  try {
    let {
      couponPurpose,
      discount_perc,
      discount_money,
      limitedTo,
      conditions,
      startingDate,
      dateOfExpiry,
      maxDiscount,
    } = req.body;
    let discountLimit, byDiscount_money, byDiscountPerc, isLimited;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        error: {
          message: "Invalid coupon id!",
        },
      });
    }

    //Data required to come from front-end
    if (!couponPurpose || !startingDate) {
      return res.status(400).json({
        error: {
          message: "Fill up the coupon Purpose and starting date",
        },
      });
    }

    //validator check
    discountLimit = !maxDiscount ? false : true;
    byDiscountPerc = !discount_perc ? false : true;
    isLimited = !limitedTo ? false : true;
    byDiscount_money = !discount_money ? false : true;

    // Either Discount by money or percent
    if (
      (byDiscount_money && byDiscountPerc) ||
      (!byDiscountPerc && !byDiscount_money)
    ) {
      return res.status(400).json({
        error: {
          message: "Choose either discount_money or discount_perc",
        },
      });
    }

    //Discount percent check
    if (byDiscountPerc) {
      let checkDiscount_perc = parseFloat(discount_perc);
      if (
        isNaN(discount_perc) ||
        checkDiscount_perc > 100 ||
        checkDiscount_perc < 0
      ) {
        return res.status(400).json({
          error: {
            message: "discount_perc should be in the range 0-100",
          },
        });
      }
    }
    //Discount money Check
    else {
      if (isNaN(discount_money) || parseFloat(discount_money) < 0) {
        return res.status(400).json({
          message: "discount_money should be a number",
        });
      }
    }

    //MaxDiscount Check
    if (discountLimit) {
      if (
        isNaN(maxDiscount) ||
        !byDiscountPerc ||
        parseFloat(maxDiscount) < 0
      ) {
        return res.status(400).json({
          error: {
            message:
              "Max Discount is applicable only if discont_perc is given. It should be a number",
          },
        });
      }
    }

    //LimitedTo check
    if (isLimited && (isNaN(limitedTo) || parseInt(limitedTo))) {
      return res.status(400).json({
        error: {
          message: "limitedTo should be a number",
        },
      });
    }

    let coupon;
    if (req.user.userType === "admin" || req.user.userType === "super_admin") {
      coupon = await Coupon.findOne({
        _id: id,
      });
    } else {
      coupon = await Coupon.findOne({
        _id: id,
        createdBy: req.user.email,
      });
    }

    if (!coupon) {
      return res.status(400).json({
        error: {
          message: "Coupon doesn't exist",
        },
      });
    }

    //if start date not given then use current date otherwise check starting date
    let checkStartDate = new Date(coupon.startingDate);

    if (startingDate && coupon.startingDate !== startingDate) {

      checkStartDate = new Date(startingDate);
      if (
        checkStartDate == "Invalid Date" ||
        checkStartDate < new Date(new Date().toLocaleDateString())
      ) {
        return res.status(400).json({
          error: {
            message: "Invalid Starting Date",
          },
        });
      }
    }

    //dateOfExpiry Check
    if (dateOfExpiry) {

      let checkExpiryDate = new Date(dateOfExpiry);
      if (
        checkExpiryDate == "Invalid Date" ||
        checkStartDate > checkExpiryDate
      ) {
        return res.status(400).json({
          error: {
            message: "Invalid Date of Expiry",
          },
        });
      }
    }

    //conditons
    const validArr = [];

    for (let no = 0; no < conditions.length; no++) {
      let condition = conditions[no];

      let key = Object.keys(condition)[0];

      if (key == "forEmail") {
        if (!validator.isEmail(condition[key])) {
          return res.status(400).json({
            error: {
              message: `Invalid forEmail ${condition[key]}`,
            },
          });
        }
      }

      validArr.push([key, condition[key]]);
    }

    const updateDetails = {
      couponPurpose: couponPurpose,
      byDiscountPerc: byDiscountPerc,
      discount_perc: byDiscountPerc ? parseFloat(discount_perc) : null,
      discount_money: byDiscountPerc ? null : parseFloat(discount_money),
      discountLimit: discountLimit,
      maxDiscount: discountLimit ? parseFloat(maxDiscount) : null,
      startingDate: new Date(startingDate).toLocaleDateString(),
      expireByDate: dateOfExpiry ? true : false,
      dateOfExpiry: dateOfExpiry
        ? new Date(dateOfExpiry).toLocaleDateString()
        : "",
      isLimited: isLimited,
      limitedTo: isLimited ? parseInt(limitedTo) : null,
      validFor: validArr,
    };

    const updatedCoupon = await Coupon.findOneAndUpdate(
      { _id: id },
      updateDetails,
      { new: true }
    );

    res.status(200).json({
      msg: `Coupon Code- ${updatedCoupon.couponCode} Updated Successfully`,
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



// Delete Single Coupon
const deleteCoupon = async (req, res) => {
  const { id } = req.params;
  try {
    const { userType, email } = req.user;
    if (!email || !userType) {
      throw new Error("Something went wrong. Try again!");
    }
    if (!id) {
      return res.status(400).json({
        error: {
          message: "Invalid Coupon Code!",
        },
      });
    }
    if (userType !== "super_admin") {
      return res.status(400).json({
        error: {
          message: "Access is denied. You don't have permission!",
        },
      });
    }
    await Coupon.deleteOne({
      _id: id,
    });
    res.status(200).send({
      msg: "Coupon Deleted Successfully!",
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



//generate CSV file from coupons
const coupon2CSV = async (req, res, next) => {
  try {

    let coupons;

    if(req.user.userType==='admin' || req.user.userType==='super_admin'){
      coupons = await Coupon.find();

    }else{
      coupons = await Coupon.find({createdBy:req.user.email});
    }
     
    const couponArr = [];

    coupons.forEach((coupon) => {
      couponArr.push({
        couponCode: coupon.couponCode || "",
        couponPurpose: coupon.couponPurpose || "",
        byDiscountPerc: coupon.byDiscountPerc || "",
        discount_perc: coupon.discount_perc || "",
        discount_money: coupon.discount_money || "",
        discountLimit: coupon.discountlimit || "",
        maxDiscount: coupon.maxDiscount || "",
        startingDate: coupon.startingDate || "",
        expireByDate: coupon.expireByDate || "",
        dateOfExpiry: coupon.dateOfExpiry || "",
        isLimited: coupon.isLimited || "",
        limitedTo: coupon.limitedTo || "",
        validFor: coupon.validFor || "",
        couponStatus: coupon.couponStatus || "",
        createdBy: coupon.createdBy || "",
        createdOn: coupon.createdOn || "",
      });
    });

       const dateTime = new Date().toISOString().slice(-24).replace(/\D/g, 
      '').slice(0, 14); 

      let filepath= (path.join(__dirname, `../public/exports/csv-${dateTime}.csv`));

    const csvFields = [
      "couponCode",
      "couponPurpose",
      "byDiscountPerc",
      "discount_perc",
      "discount_money",
      "discountLimit",
      "maxDiscount",
      "startingDate",
      "expireByDate",
      " dateOfExpiry",
      "isLimited",
      "limitedTo",
      "validFor",
      "couponStatus",
      "createdBy",
      "createdOn",
    ];

    const json2csvParser = new Json2csvParser({
      csvFields,
    });

    const csv = await json2csvParser.parse(couponArr);

      fs.writeFile(filepath, csv, function (err) {
        
        if (err) {
          return res.status(500).json({
            error: {
              message: "Something went wrong. Try again!",
            },
          });
        }

        setTimeout(function () {
          fs.unlink(filepath, function (err) { // delete file after 30 sec
          if (err) {
            return res.status(500).json({
              error: {
                message: "Something went wrong. Try again!",
              },
            });
          }
          console.log('File has been Deleted');
      });

  }, 30000);
      res.download(filepath);
  });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong. Try again!",
      },
    });
  }
};



//function to check coupon data from csv file - either return payload or error
const getCouponDataFromCSV = async (data, creator, serial_no) => {

  if(!data.couponCode && !data.couponPurpose && !data.percentDiscount	&& !data.maxDiscount && !data.flatDiscount &&	!data.startingDate &&	!data.dateOfExpiry &&	!data.limitedTo &&	!data.forEmail &&	!data.forCourse &&	!data.forProgram &&	!data.greaterThanAmount && !data.lesserThanAmount	&& !data.equalToAmount){
    return {empty:'empty data'};
  }
 

  // Coupon Code and Coupon Purpose are compulsory
  if (!data.couponPurpose ) {
    return {
      error: `missing couponCode or CouponPurpose in line ${serial_no} of CSV file`,
    };
  }

  discountLimit = !data.maxDiscount ? false : true;

  byDiscountPerc = !data.percentDiscount ? false : true;

  isLimited = !data.limitedTo ? false : true;

  byDiscount_money = !data.flatDiscount ? false : true;

  //either flatDiscount or Percentage_Discount
  if (
    (byDiscount_money && byDiscountPerc) ||
    (!byDiscountPerc && !byDiscount_money)
  ) {
    return {
      error: `Choose either percentDiscount or flatDiscount in line ${serial_no} of csv file`,
    };
  }

  //coupon code in 0-9 and a-z format
  if(data.couponCode){
    data.couponCode= data.couponCode.trim().toLowerCase()
    if(!(/[0-9a-z]/).test(data.couponCode)){
      console.log(`couponCode should be in the format of 0-9 or a-z in line ${serial_no}`);
      return
  }
}else{
  data.couponCode= generateCouponCode(7);
}


  let checkStartDate = new Date().toLocaleDateString();

  //if starting date given then use the given date otherwise current date
  if (data.startingDate) {
    checkStartDate = new Date(data.startingDate);
  }

  //starting date in right format and should not be less than current date
  if (
    checkStartDate == "Invalid Date" ||
    checkStartDate < new Date(new Date().toLocaleDateString())
  ) {
    return {
      error: `Invalid starting date in line ${serial_no}. format: "MM/DD/YYYY" of CSV file`,
    };
  }

  //if dateOfExpiry given then should be more or equal to current date
  if (data.dateOfExpiry) {
    let checkExpiryDate = new Date(data.dateOfExpiry);
    if (checkExpiryDate == "Invalid Date" || checkStartDate > checkExpiryDate) {
      return {
        error: `Invalid expiry date in line ${serial_no}. format: "MM/DD/YYYY" of CSV file`,
      };
    }
  }

  //if limitedTo than it must be a number
  if (isLimited) {
    if (isNaN(data.limitedTo)) {
      return {
        error: `limitedTo should be a number in line ${serial_no} of CSV file`,
      };
    }
  }

  //if maxDiscount then it must be a number
  if (discountLimit) {
    if (
      isNaN(data.maxDiscount) ||
      !byDiscountPerc ||
      parseFloat(data.maxDiscount) < 0
    ) {
      return {
        error: `maxDiscount applicable if percentDiscount given and should be a number in line ${serial_no}`,
      };
    }
  }

  //if percentDiscount than it must be less than or equal to 100
  if (byDiscountPerc) {
    if (
      isNaN(data.percentDiscount) ||
      parseFloat(data.percentDiscount) > 100 ||
      parseFloat(data.percentDiscount) < 0
    ) {
      return {
        error: `percentDiscount should be a number [min:0 max:100] in line ${serial_no} of CSV file`,
      };
    }
  }

  data.couponCode = data.couponCode.toLowerCase();

  let couponCheck = await Coupon.findOne({
    couponCode: data.couponCode,
  });

  if (couponCheck) {
    return {
      error: `Coupon code already exist. Choose a different coupon code in line ${serial_no} of CSV file `,
    };
  }

  const validArr = [];

  if (data.forEmail) {
    const emails = data.forEmail.split(",").map((email) => {
      return email.trim();
    });

    emails.forEach((email) => {
      if (validator.isEmail(email)) {
        validArr.push(["forEmail", email]);
      } else {
        return {
          error: `${email} is invalid email in line no ${serial_no} of CSV file`,
        };
      }
    });
  }

  if (data.forProgram) {
    const programs = data.forProgram.split(",").map((program) => {
      return program.trim();
    });

    programs.forEach((program) => {
      validArr.push(["forProgram", program]);
    });
  }

  if (data.forCourse) {
    const courses = data.forCourse.split(",").map((course) => {
      return course.trim();
    });

    courses.forEach((course) => {
      validArr.push(["forCourse", course]);
    });
  }

  if (data.greaterThanAmount) {
    const greaterThan = data.greaterThanAmount.split(",").map((price) => {
      return price.trim();
    });

    greaterThan.forEach((greatPrice) => {
      validArr.push(["greaterThan", greatPrice]);
    });
  }

  if (data.lesserThanAmount) {
    const lesserThan = data.lesserThanAmount.split(",").map((price) => {
      return price.trim();
    });

    lesserThan.forEach((lessPrice) => {
      validArr.push(["lesserThan", lessPrice]);
    });
  }

  if (data.equalToAmount) {
    const equalTo = data.equalToAmount.split(",").map((price) => {
      return price.trim();
    });

    equalTo.forEach((equalPrice) => {
      validArr.push(["equalTo", equalPrice]);
    });
  }

  const payload = {
    couponCode: data.couponCode,
    couponPurpose: data.couponPurpose,
    byDiscountPerc: byDiscountPerc,
    discount_perc: byDiscountPerc ? data.percentDiscount : null,
    discount_money: byDiscountPerc ? null : data.flatDiscount,
    discountLimit: discountLimit,
    maxDiscount: discountLimit ? data.maxDiscount : null,
    startingDate: data.startingDate
      ? new Date(data.startingDate).toLocaleDateString()
      : new Date().toLocaleDateString(),
    expireByDate: data.dateOfExpiry ? true : false,
    dateOfExpiry: data.dateOfExpiry
      ? new Date(dateOfExpiry).toLocaleDateString()
      : "",
    isLimited: isLimited,
    limitedTo: isLimited ? data.limitedTo : null,
    validFor: validArr,
    couponStatus: true,
    createdBy: creator,
    createdOn: new Date(),
  };

  return { success: payload };
};



//generation of coupon code from csv file
const generateCouponFromCSV = async (req, res) => {
  try {
    let readStream = bufferToStream(req.file.buffer);
    let errorArray = [];
    let dataArray=[];
    let allObj=[]

    await readStream
      .pipe(csv())
      .on("data", async (row) => {

        allObj.push(row)     
      
      }).on('close',()=>{
        console.log(req.user.email, ' tried to generate coupon from csv');
       
      })

   for(let i = 0; i < allObj.length; i++){
        let result = await getCouponDataFromCSV(allObj[i], req.user.email, i+2);
        if (result.success) {
          dataArray.push(result.success);
        } else if(result.error) {
          errorArray.push(result.error);
        }
      }
      
    if (errorArray.length > 0) {
      return res.status(400).json({
        error: {
          message: "fields are wrong. Kindly give proper data",
          errorArray,
        },
      });
    }

    if(dataArray.length<1){
      return res.status(400).json({
        error: {
          message: "empty CSV file",
        },
      });
    }

    await Coupon.insertMany(dataArray);

    res.status(200).json({
      msg: "coupon created successfully!",
    });
  } catch (e) {
    res.status(500).json({
      error: {
        message: "Something went wrong!",
      },
    });
  }
};



module.exports = {
  addCoupon,
  addCouponFullFledge,
  addCouponMulti,
  generateCouponFromCSV,
  getAllCoupon,
  getSingleCoupon,
  changeCouponStatus,
  updateCoupon,
  updateCouponMulti,
  deleteCoupon,
  coupon2CSV,
};
