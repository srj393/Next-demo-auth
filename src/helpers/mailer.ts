import nodemailer from 'nodemailer';
import User from '@/models/userModels';
import bcryptjs from 'bcryptjs'


export const sendEmail = async ({email, emailType, userId 
}:any) =>{
    try {
        // create hash token 
        const hashedToken = await bcryptjs.hash(userId.toString(),10)
        
      if(emailType === "VERIFY"){
        await User.findByIdAndUpdate(userId,{verifyToken:hashedToken, 
            verifyTokenExpiry:Date.now() + 3600000})
      } else if(emailType === "RESET"){
        await User.findByIdAndUpdate(userId,{forgotPasswordToken:hashedToken, 
            forgotPasswordTokenExpiry:Date.now() + 3600000})
      }

      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f4d59d8597038a",
          pass: "bc4689f9a41459"
        }
      });

      const mailOptions = {
        from : 'surajsuryavanshi0007@gmail.com',
        to: email,
        subject : emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
        html : `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here </a>
         to ${ emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password"}</p>`

      }

      const mailresponse = await transport.sendMail(mailOptions);
      return mailresponse

    } catch (error:any) {
        throw new Error(error.message)
    }
}