const Cleaning = require("../models/cleaningModel");


const createCleaningRequest = async (req, res) => {
  try {
    const {
      accommodationBlock,
      roomID,
      studentID,
      requestDate,
   
      cleaningLevel,
      mention,
      studentEmail
     
    } = req.body;

    const newCleaningRequest = new Cleaning({
      accommodationBlock,
      roomID,
      studentID,
      requestDate,
     
      cleaningLevel,
      mention,
      studentEmail
     
    });

    await newCleaningRequest.save();
    res.status(201).json(newCleaningRequest);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCleaningRequests = async (req, res) => {
  try {
    const cleaningRequests = await Cleaning.find({});
    res.status(200).json(cleaningRequests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCleaningRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const cleaningRequest = await Cleaning.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    if (!cleaningRequest) {
      res.status(404).json({ error: "Cleaning request not found" });
    } else {
      res.status(200).json(cleaningRequest);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCleaningRequest,
  getAllCleaningRequests,
  updateCleaningRequestStatus,
  
};
