const nodemailer = require("nodemailer");

const sendmail = async (email , text) => {
    try{
        let transporter  = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service:'gmail',
            secure:false,
            port: 587,
            auth: {
            user: 'books4connect@gmail.com',
            pass:'tjouhguyvjijjuyb',
            },
        });
        let info = await transporter.sendMail({
        from: 'books4connect@gmail.com',
        to: email,
        subject: 'Collecting book by donor',
        text: text,
        });
        console.log(info);
        console.log('email sent');
    }catch(err){
        console.log(err);
    }
}

exports.removeBook = async (req, res) => {
   
    const book_id = req.params.book_id;
    const collected = (req.params.collected === "true")?1:0;
    const r_mail = (req.params.r_mail);
    
    const query1 = `delete from book  where id = ${book_id}`;
    const query2 = `update book set down = 0 where id = ${book_id}`;
    const query = (collected)?query1:query2;

    db.query(query ,async (err,result)=>{
       if(err)
       {
         console.log(err);
        return res.status(500).json({message:'server error'})
       }

       const text1 = 'we are happy you collected the book. keep reading and achieve your goals. Knowledge is power.'
       const text2 = 'we are sad , as you did not  collect the book you requested to ,you can still collect it if in need. keep reading and achieve your goals. Knowledge is power. ).'
       const text = (collected)?text1:text2;
       await sendmail(r_mail , text);
       
       return res.status(200).json({message : 'updated successfully'});
    })
  
  
};