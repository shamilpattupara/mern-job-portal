const Application = require("../models/Application");
const Job = require("../models/Job");

// Apply job
exports.applyJob = async (req, res) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Only users can apply" });
  }

  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({ message: "Job ID required" });
  }

  try {
    // Prevent duplicate
    const existing = await Application.findOne({
      user: req.user.id,
      job: jobId
    });

    if (existing) {
      return res.status(400).json({ message: "Already applied" });
    }

    const app = new Application({
      user: req.user.id,
      job: jobId
    });

    await app.save();

    res.status(201).json({ message: "Applied successfully" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// Get all applications
exports.getApplications = async (req, res) => {
  try {

    const recruiterJobs = await Job.find({
      createdBy: req.user.id
    });

    const jobIds = recruiterJobs.map(job => job._id);

    const apps = await Application.find({
      job: { $in: jobIds }
    })
      .populate("user", "name email")
      .populate("job", "title company");

    res.json(apps);

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};



// Get my applications
exports.getMyApplications = async (req, res) => {
  try {
    const apps = await Application.find({ user: req.user.id })
      .populate("job");

    res.json(apps);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};



// Update application status
exports.updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["accepted", "rejected"].includes(status)) {
      return res.status(400).json({
        message: "Status must be accepted or rejected",
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({
        message: "Application not found",
      });
    }

    application.status = status;
    await application.save();

    res.json({
      message: `Application ${status}`,
      application,
    });
  } catch (error) {
  console.log(error);
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
}
};

// Get applicants for a specific job
exports.getApplicantsByJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    // // Make sure only the recruiter who created the job can view applicants
    // if (job.createdBy.toString() !== req.user.id) {
    //   return res.status(403).json({
    //     message: "Not authorized",
    //   });
    // }



if (job.createdBy.toString() !== req.user.id) {
  return res.status(403).json({
    message: "Not authorized",
  });
}

    const applications = await Application.find({
      job: req.params.jobId,
    })
      .populate("user", "name email")
      .populate("job", "title company");

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};