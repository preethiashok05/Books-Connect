

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

    console.log(query);

    db.query(query , (err , result) => {
        if(err)
        {   console.log(err);
            return res.status(500).json({message:'server error'})
        }
        console.log(result);
       return res.status(200).json({message:"success" , record:result});
    })
}

