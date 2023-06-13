const multer = require("multer");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const crypto = require("crypto");


const sendmail = async (email , text) => {
    try{
        let transporter  = nodemailer.createTransport({
            host: "smtp.gmail.com",
            service:'gmail',
            secure:false,
            port: 587,
            auth: {
            user: process.env.EMAIL,
            pass:process.env.EMAILPASSWORD,
            },
        });
        let info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: email,
        subject: 'Verify email',
        text: text,
        });
        console.log(info);
        console.log('email sent');
    }catch(err){
        return err;
    }
}
exports.signup = async (req, res) => {

    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const education = req.body.education;
    const token = crypto.randomBytes(32).toString("hex");
    const query1 = 'select * from `userdetails` where email = "'+firstname+'"';
    const query2 = "insert into `userdetails` (firstname , lastname , email , password , education , token ) values('"+firstname+"' , '"+lastname+"','"+email+"','"+password+"','"+education+"' , '"+ token +"')";


    db.query(query1 , (err,result)=>{
       if(err)
       {
        console.log(err);
        return res.status(500).json({message:'server error'})
       }
       if(result.length != 0)
       {
        console.log('email exists');
        return res.status(400).json({message:'email alredy in use'});
       }
       db.query(query2 , async (err,result) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({message:'server error'})
        }
       

        db.query(query1 , async (err,result3) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({message:'server error'})
        }
        console.log(result3);
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
        const url = `https://books-connect.netlify.app/users/${email}/verify/${token}`
        try{
             const result = await sendmail(email ,'follow the link to veryfy your account ' + url ); 
            console.log(result);
            console.log('sent')
           
        }catch(err){
            console.log(err);
            return res.status(400).json({message : 'server error , try again later'})
        }
       
        return res.status(200).json({message:'check your account to verify your email address.'});
        })
       })
       
    })
};

exports.signin =(req, res) => {
    const email = req.body.email;
    const pswrd = req.body.password;

    console.log(req.body);
    const query = "select * from `userdetails` where email = '"+email+"'";

    db.query(query , (err,result)=>{
       if(err)
       {
         console.log(err);
        return res.status(500).json({message:'server error'})
       }
       else if(result.length == 0)
       {
        console.log('email not found');
        return res.status(400).json({message:'Email not registered'})
       }else 
       {
            let crt_pswrd = result[0].password;
            let verified = result[0].verified;
            if(pswrd !== crt_pswrd)
            {
                console.log('incorrect passord');
                return res.status(400).json({message:'incorrect password'})
            }else if(!verified){
                console.log('email not verified');
                return res.status(400).json({message:'Email not verified , kindly check the mail sent to your registered email account'});
            }
            else{
                console.log('login successs!!');
                return res.status(200).json({message:'success'})
            }
       }
    })
};

const storage = multer.diskStorage({
    destination:('../client/src/images'),
    filename: function (req, file, cb) {   
        cb(null, Date.now() + '-' + file.originalname )  
    }
})

exports.addbook =(req, res) => {
   
    try {
        let upload = multer({ storage: storage}).single('avatar');

        upload(req, res, function(err) {
            if (!req.file) {
                return res.send('Please select an image to upload');
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
            const image = req.file.filename;
            const data = req.body;

            if(data.field === '')data.field = null;
            if(data.other === '')data.other = null;

            const query = `insert into book (category , subcategory , field , subject ,bookname , author , other , country , state , city , pincode ,detail, email , image , lat , lng ) values ('${data.category}' , '${data.subcategory}' ,'${data.field}' , '${data.subject}' ,'${data.bookname}', '${data.author}' ,'${data.other}', '${data.country}' ,'${data.state}','${data.city}' ,'${data.pincode}' ,'${data.detail}' ,'${data.email}' , '${image}' , '${data.lat}' , '${data.lng}' )`;        

                
            db.query(query , (err , result) => {
            if(err){
                console.log(err);
                return res.status(500).json({message:'server error'});
            }
            return res.status(200).json({message:'success'})
            }) 

             })
        }catch (err) {console.log(err)}
    
};

