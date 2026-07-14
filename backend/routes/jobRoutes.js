const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

const {
  createJob,
  getJobs,
  getJobById,
  getMyJobs,
  deleteJob,
  updateJob
} = require("../controllers/jobController");


router.post("/", authMiddleware, createJob);
router.get("/my", authMiddleware, getMyJobs);
router.get("/", getJobs);
router.delete("/:id", authMiddleware, deleteJob);
router.get("/:id", getJobById);
router.put("/:id", authMiddleware, updateJob);

module.exports = router;