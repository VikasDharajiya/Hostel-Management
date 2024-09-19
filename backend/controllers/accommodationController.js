const Accommodation = require("../models/accommodationModel");

const createAccommodation = async (req, res) => {
    try {
        const {
            fname,
            sname,
            fullname,
            birthday,
            NICnumber,
    
            mobnum,
            emailA,
            paddress,
            ncity,
        
            guardianFullname,
            guardianPaddress,
            contactnum,
          
            eFname,
            eContactnum,
            eAddress,
            confirmationFname,
            confirmationDate,
        } = req.body;

        const newAccommodation = new Accommodation({
            fname,
            sname,
            fullname,
            birthday,
            NICnumber,
          
            mobnum,
            emailA,
            paddress,
            ncity,
         
            guardianFullname,
            guardianPaddress,
            contactnum,
         
            eFname,
            eContactnum,
            eAddress,
            confirmationFname,
            confirmationDate,
        });

        await newAccommodation.save();
        res.status(201).json(newAccommodation);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllAccommodations = async (req, res) => {
    try {
        const accommodations = await Accommodation.find({});
        res.status(200).json(accommodations);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
};

module.exports = {
    createAccommodation,
    getAllAccommodations,
  
};
