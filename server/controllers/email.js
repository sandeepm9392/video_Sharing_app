import nodemailer from 'nodemailer';

export const email = (req, res) => {
    const {name,email,issue,videoLink,description} = req.body;
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: "process.env.USERMAIL", // generated ethereal email
        password:"process.env.PASSCODE" // generated ethere
      }
    });
  
  
  const mailOptions = {
    from: email,
    to: 'sandeepm9392@gmail.com',
    subject: 'Report/Feedback',
    html: `
    <p>Name: ${name}</p>
    <p>Email: ${email}</p>
    <p>Issue: ${issue}</p>
    <p>Video Link: ${videoLink}</p>
    <p>Description: ${description}</p>
    `
  };
  
  transporter.sendMail(mailOptions,(err,info)=>{
    if(err){
      console.log(err)
    }else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  })
  
  }