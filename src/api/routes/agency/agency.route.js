const { Router } = require("express");
const AgencyController = require("../../controllers/agency/agency.controller");
const validate = require("../../helpers/validationLayers/agency.layer");

const auth = require("../../middlewares/auth.middleware");

const { catchValidationError } = require("../../middlewares/validationError");

const router = Router();

router.route("/getAll").get(auth, AgencyController.getAllAgencies);

router.route("/create").post(
  validate("createGroup"),
  catchValidationError,

  AgencyController.createAgnecy
);

router.route("/getAgency/:id").get(auth, AgencyController.getAgnecyById);

router
  .route("/createReqJoinFromUserToAgency/:agencyId")
  .put(auth, AgencyController.createReqJoinFromUserToAgency);
router
  .route("/getAgencyJoinReqs/:agencyId")
  .get(AgencyController.getAgencyJoinReqs);
router
  .route("/approveAgencyJoinReq/:agencyId")
  .put(AgencyController.approveAgencyJoinReqs);
router
  .route("/getAgencyMembers/:agencyId")
  .get(AgencyController.getAgencyMembers);
router
  .route("/sendGiftFromUserToAgencyMember")
  .put(auth, AgencyController.sendGiftFromUserToAgencyMember);
router
  .route("/awardAgencyMembers/:agencyId")
  .put(auth, AgencyController.awardAgencyMembers);
router
  .route("/addMemberToAgency/:agencyId")
  .put(AgencyController.addMemberToAgency);

router.route("/updateAgency/:id").put(AgencyController.updateAgency);
router.route("/deleteAgency/:id").delete(AgencyController.deleteAgency);

module.exports = router;
