const Medical = require("../models/medicalModel");


const createMedicalRequest = async (req, res) => {
  try {
    
    const {
      studentName,
      studentEmail,
     
      roomID,
      age,
     
      illness,
      otherMention,
      sickPeriod,
   
      appointmentTime,
    } = req.body;

    
    const newMedicalRequest = new Medical({
      studentName,
      studentEmail,
      
      roomID,
      age,
      
      illness,
      otherMention,
      sickPeriod,
     
      appointmentTime,
    });

    
    await newMedicalRequest.save();
    res.status(201).json(newMedicalRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllMedicalRequests = async (req, res) => {
  try {
    const medicalRequests = await Medical.find({});
    res.status(200).json(medicalRequests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateMedicalRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const medicalRequest = await Medical.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!medicalRequest) {
      res.status(404).json({ error: "Medical request not found" });
    } else {
      res.status(200).json(medicalRequest);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createMedicalRequest,
  getAllMedicalRequests,
  updateMedicalRequestStatus,
 
};
