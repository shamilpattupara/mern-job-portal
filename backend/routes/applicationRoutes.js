const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  applyJob,
  getApplications,
  getMyApplications,
  updateApplicationStatus,
  getApplicantsByJob
} = require("../controllers/applicationController");
// Apply job
router.post("/", authMiddleware, applyJob);

// Get my applications (IMPORTANT: keep before "/")
router.get("/my", authMiddleware, getMyApplications);

// Get all applications
router.get("/", authMiddleware, getApplications);

// Get applicants for a specific job
router.get("/job/:jobId", authMiddleware, getApplicantsByJob);

router.patch("/:id", authMiddleware, updateApplicationStatus);

module.exports = router;