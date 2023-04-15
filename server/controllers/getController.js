

exports.getBooks = (req, res) => {

    let category = req.params.category;
    let subcategory = req.params.subcategory;
    let field = req.params.field;
    let subject = req.params.subject;
    let filter = req.params.filter;
    let order = req.params.order;

    let query ="";

    if(filter === "no")
    {
        if(field === "no" &&  subject === "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and userdetails.email = book.email` ;
        else if(field === "no" && subject !== "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and subject = '${subject}' and userdetails.email = book.email`;
        else if(field !== "no" && subject === "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and field = '${field}' and userdetails.email = book.email`;
        else
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and field = '${field}' and subject = '${subject}' and userdetails.email = book.email`;
    }else{
        if(field === "no" &&  subject === "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and userdetails.email = book.email  order by book.${filter} ${order}` ;
        else if(field === "no" && subject !== "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and subject = '${subject}' and userdetails.email = book.email  order by book.${filter} ${order}`;
        else if(field !== "no" && subject === "no")
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and field = '${field}' and userdetails.email = book.email order by book.${filter} ${order}`;
        else
            query = `SELECT *  from book , userdetails where category = '${category}' and subcategory = '${subcategory}' and field = '${field}' and subject = '${subject}' and userdetails.email = book.email   order by book.${filter} ${order}`;

    }


    db.query(query , (err , result) => {
        if(err)
        {   console.log(err);
            return res.status(500).json({message:'server error'})
        }
       return res.status(200).json({message:"success" , record:result});
    })
}

exports.verifyemail = (req , res) => {
    const email = req.params.email;
    const token = req.params.token
    const query1 = "select * from `userdetails` where email = '" + email + "'";
    const query2 = `update userdetails set verified = 1 where email = '${email}' and token = '${token}'`;
    db.query(query1 , (err,result)=>{
        if(err)
        {
         console.log(err);
         return res.status(500).json({message:'server error'})
        }
        if(result.length == 0)
        {
         console.log('email exists');
         return res.status(400).json({message:'Invalid link'});
        }
        db.query(query2 , (err,result) => {
         if(err)
         {
             console.log(err);
             return res.status(500).json({message:'server error'})
         }
         return res.status(200).json({message:'Email verified successfully'});
        })
        
     })
}
