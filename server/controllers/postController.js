const emailValidator = require('deep-email-validator');
const multer = require("multer");

exports.signup = async (req, res) => {
    
    const firstname = req.body.firstName;
    const lastname = req.body.lastName;
    const email = req.body.email;
    const password = req.body.password;
    const education = req.body.education;

    const query1 = `select * from userdetails where email = '${email}'`;
    const query2 = "insert into `userdetails` (firstname , lastname , email , password , education) values('"+firstname+"' , '"+lastname+"','"+email+"','"+password+"','"+education+"')";
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
       db.query(query2 , (err,result) => {
        if(err)
        {
            console.log(err);
            return res.status(500).json({message:'server error'})
        }
        return res.status(200).json({msg:'success'});
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
            var crt_pswrd = result[0].password;
            if(pswrd !== crt_pswrd)
            {
                console.log('incorrect passord');
                return res.status(400).json({message:'incorrect password'})
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
            console.log(result);
            return res.status(200).json({message:'success'})
            }) 

             })
        }catch (err) {console.log(err)}
    
};

