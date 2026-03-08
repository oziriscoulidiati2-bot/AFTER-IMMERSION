const PDFDocument = require("pdfkit");
const { generateQR } = require("../utils/qr.util");

async function createCertificate(user, certificateId){

  const doc = new PDFDocument({
    size:"A4",
    margin:50
  });

  const buffers = [];

  doc.on("data", buffers.push.bind(buffers));

  const verifyUrl = `https://tonsite.com/verify/${certificateId}`;

  const qr = await generateQR(verifyUrl);

  // LOGO
  doc.image("assets/images/logo.png", 250, 40, {width:100});

  doc.moveDown(4);

  doc.fontSize(22)
  .text("CERTIFICAT DE MENBRE AFTER IMMERSION GAME",{
    align:"center"
  });

  doc.moveDown();

  doc.fontSize(14)
  .text(`Nom du membre : ${user.name}`);

  doc.text(`ID du compte : ${user.id}`);

  doc.text(`Code du compte : ${user.account_code}`);

  doc.moveDown();

  doc.fontSize(13)
  .text("Je m'engage à respecter les règles et les objectifs de la communauté After Immersion.");

  doc.moveDown();

  doc.text("Valeurs : Discipline - Ordre - Développement");

  doc.moveDown(2);

  doc.text("Contacts : +22650854781");

  doc.moveDown();

  doc.text("Réseaux sociaux :");

  doc.text("Facebook : After Immersion");

  doc.text("YouTube : After Immersion");

  doc.text("TikTok : After Immersion");

  doc.moveDown(2);

  // QR code
  doc.image(qr,{
    fit:[120,120],
    align:"center"
  });

  doc.moveDown(2);

  doc.text("Vérification du certificat via QR Code",{
    align:"center"
  });

  doc.moveDown(3);

  // signature
  doc.image("assets/signature.png", 400, 650, {width:150});

  doc.text("Signature du Haut Responsable",400,720);

  doc.end();

  return new Promise((resolve)=>{
    doc.on("end",()=>{
      resolve(Buffer.concat(buffers));
    });
  });

}

module.exports = { createCertificate };