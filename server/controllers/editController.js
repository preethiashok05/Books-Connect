const nodemailer = require("nodemailer");

const sendmail = async (email , text) => {
    try{
        let transporter  = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service:'gmail',
            secure:false,
            port: 587,
            auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAILPASSWORD,
            },
        });
        let info = await transporter.sendMail({
        from: 'books4connect@gmail.com',
        to: email,
        subject: 'Regarding your book request',
        text: text,
        });
        console.log(info);
        console.log('email sent');
    }catch(err){
        console.log(err);
    }
}

exports.disable =(req, res) => {
    const book_id = req.params.book_id;
    const r_mail = req.params.r_mail;
    const agree = (req.params.agree === "true")?1:0;
    
    const query = `update book set down = ${agree} where id = ${book_id}`;

    db.query(query ,async (err,result)=>{
       if(err)
       {
         console.log(err);
        return res.status(500).json({message:'server error'})
       }
       
       const text1 = 'we are happy to inform you that donor decided to lend you their book. you can collect it on or before the date mentioned by you.'
       const text2 = 'we are sad to inform you that donor rejected your request at this time, try some other time or find a new book.remember some time cold email works :).'
       const text = (agree)?text1:text2;
       await sendmail(r_mail , text);
       return res.status(200).json({message :'updated successfully'});
    })
  
};
