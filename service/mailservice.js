const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'bhunganimitu@gmail.com',
        pass:'npfq lzyt zjih wzwj'
    }
})

const sendMail = async (to,subject,content)=>{
    try {
        const mailOptions ={
            from:'bhunganimitu@gmail.com',
            to:to,
            subject:subject,
            html:content
        }
        let res = await transport.sendMail(mailOptions)
    } catch (error) {
        console.error(error);
        
    }
}

module.exports = sendMail