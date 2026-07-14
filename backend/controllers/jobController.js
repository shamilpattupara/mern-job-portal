const Job = require("../models/Job");

// Create job
exports.createJob = async (req, res) => {
  if (req.user.role !== "recruiter") {
    return res.status(403).json({ message: "Only recruiters can post jobs" });
  }

  const { title, company, description, location, salary } = req.body;

  try {
    const job = new Job({
      title,
      company,
      description,
      location,
      salary,
      createdBy: req.user.id
    });

    await job.save();

    res.status(201).json({ message: "Job created", job });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("createdBy", "name email");
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Get my jobs
exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.id });
    res.json(jobs);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
};


// Get single job
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: "Job not found",
      });
    }

    res.json(job);

  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};


// Delete job
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) return res.status(404).json({ message: "Job not found" });

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await job.deleteOne();

    res.json({ message: "Job deleted" });

  } catch {
    res.status(500).json({ message: "Server error" });
  }
};

// Update job
exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    if (job.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, company, description, location, salary } = req.body;

    job.title = title || job.title;
    job.company = company || job.company;
    job.description = description || job.description;
    job.location = location || job.location;
    job.salary = salary || job.salary;

    await job.save();

    res.json({
      message: "Job updated",
      job
    });

  } catch (error) {
    res.status(500).json({
      message: "Server error"
    });
  }
};