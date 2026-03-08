const { v4: uuidv4 } = require("uuid");
const { createCertificate } = require("../services/pdf.service");
const { uploadPDF } = require("../services/r2.service");

exports.generateCertificate = async (req,res)=>{

 try{

  const user = req.user;

  const certificateId = uuidv4();

  const pdf = await createCertificate(user,certificateId);

  const fileName = `certificates/${certificateId}.pdf`;

  const url = await uploadPDF(pdf,fileName);

  res.json({
   success:true,
   url:url
  });

 }catch(err){

  console.error(err);

  res.status(500).json({
   error:"PDF generation failed"
  });

 }

};