const Clearance = require("../models/clearanceModel");

const createClearanceRequest = async (req, res) => {
  try {
  
    const {
      studentName,
     
      studentEmail,
      roomID,
      registrationYear,
      duration,
    
      handOverDate,
      otherNotes,
      certified,
    } = req.body;
    

    const newClearanceRequest = new Clearance({
      studentName,
     
      studentEmail,
      roomID,
      registrationYear,
      duration,
   
      handOverDate,
      otherNotes,
      certified,
    });

 
    await newClearanceRequest.save();
    res.status(201).json(newClearanceRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllClearanceRequests = async (req, res) => {
  try {
    const clearanceRequests = await Clearance.find({});
    res.status(200).json(clearanceRequests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateClearanceRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const clearanceRequest = await Clearance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!clearanceRequest) {
      res.status(404).json({ error: "Clearance request not found" });
    } else {
      res.status(200).json(clearanceRequest);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createClearanceRequest,
  getAllClearanceRequests,
  updateClearanceRequestStatus,
 
};
