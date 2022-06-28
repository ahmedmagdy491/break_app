const { check } = require("express-validator");

const validate = (method) => {
  switch (method) {
    case "createGroup": {
      return [
        check("name")
          .notEmpty()
          .trim()
          .withMessage("REQUIRED")
          .bail()
          .isString("group name must be string")
          .bail(),
      ];
    }
    // case 'createReqJoinFromUserToJoin':{
    // 	return [
    // 		check('')
    // 	]
    // }
  }
};
module.exports = validate;
