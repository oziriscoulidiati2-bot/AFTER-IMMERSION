const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const r2 = new S3Client({
 region:"auto",
 endpoint:process.env.R2_ENDPOINT,
 credentials:{
  accessKeyId:process.env.R2_ACCESS_KEY,
  secretAccessKey:process.env.R2_SECRET_KEY
 }
});

async function uploadPDF(buffer,fileName){

 const command = new PutObjectCommand({
  Bucket:process.env.R2_BUCKET,
  Key:fileName,
  Body:buffer,
  ContentType:"application/pdf"
 });

 await r2.send(command);

 return `${process.env.R2_PUBLIC_URL}/${fileName}`;

}

module.exports = { uploadPDF };