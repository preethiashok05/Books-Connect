import React from 'react'
import { grades , fields , PreClinical , ParaClinical , Clinical , Dentistry , 
  engSubjects , schoolSubjects ,medMajor } from '../utils/booksData';



export default function BookDetails({ formData, setFormData }) {
  
    const [category_choice, setcategory_choice] = React.useState("Select Category"); 
    const [subcategory_choice, setsubcategory_choice] = React.useState("Select Sub-Category"); 
    const [field_choice, setfield_choice] = React.useState("Select Field");
    const [subject, setsubject] = React.useState("Select Subject");

    let subcategory_options = null; 
    let field_options = null;
    let subject_options = null;
  
    if (category_choice === "school (grade 5th to 12th)") { 
      subcategory_options = grades.map((el) => <option key={el}>{el}</option>); 
    } else if (category_choice === "college (degree)") { 
      subcategory_options = fields.map((el) => <option key={el}>{el}</option>); 
    }
  
    if (subcategory_choice === "Medical") { 
      field_options = medMajor.map((el) => <option key={el}>{el}</option>); 
    } 
    else if (subcategory_choice === "Engineering") { 
      subject_options = engSubjects.map((el) => <option key={el}>{el}</option>); 
    }else if (category_choice === "school (grade 5th to 12th)") { 
      subject_options = schoolSubjects.map((el) => <option key={el}>{el}</option>); 
    }

    if(field_choice === "PreClinical"){
      subject_options = PreClinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field_choice === "ParaClinical"){
      subject_options = ParaClinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field_choice === "Clinical"){
      subject_options = Clinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field_choice === "Dentistry"){
      subject_options = Dentistry.map((el) => <option key={el}>{el}</option>); 
    }

    const handleInputChange = (event) => {
      setFormData({ ...formData,  file:event.target.files[0],
        filepreview:URL.createObjectURL(event.target.files[0]), });
    }

    const categoryChoiceHandler = (event) => { 
      setFormData({ ...formData, category: event.target.value });
      setsubcategory_choice("Select Sub-Category");
      setfield_choice("Select Field");
      setsubject("Select Subject")
      setcategory_choice(event.target.value); 
    }; 
    const subCategoryChoiceHandler = (event) => { 
      setFormData({ ...formData, subcategory: event.target.value });
      setfield_choice("Select Field");
      setsubject("Select Subject");
      setsubcategory_choice(event.target.value); 
    }; 
    const fieldChoiceHandler = (event) => { 
      setFormData({ ...formData, field: event.target.value });
      setfield_choice(event.target.value); 
      setsubject("Select Subject")
    };
    const subjectChoiceHandler = (event) => {
      setsubject(event.target.value); 
      setFormData({ ...formData, subject: event.target.value }); 
      console.log("changed just now from " + subject + " to " + event.target.value)
      
    }; 
  
  return (
    <div>
    <form action="/addbook" method="post" >

    <div className='select_details'>
        
      <div class="dropdown">
            <button class="dropbtn">{category_choice}
              <i class="fa fa-caret-down"></i>
            </button>
            <select name="category" className="dropdown-content"  onChange={categoryChoiceHandler}> 
                 <option>select category</option> 
                  <option>school (grade 5th to 12th)</option> 
                  <option>college (degree)</option> 
            </select>
      </div> 

      {category_choice && <div class="dropdown">
            <button class="dropbtn">{subcategory_choice}
              <i class="fa fa-caret-down"></i>
            </button>
            <select name="subcategory" className="dropdown-content"  onChange={subCategoryChoiceHandler}> 
               <option>select sub-category</option>
                {subcategory_options}
            </select>
      </div> }

      {subcategory_choice && (subcategory_choice === "Medical") &&  <div class="dropdown">
            <button class="dropbtn">{field_choice}
              <i class="fa fa-caret-down"></i>
            </button>
            <select name="field" className="dropdown-content"  onChange={fieldChoiceHandler}> 
               <option>select field</option>
                {field_options}
            </select>
      </div> }

      {(subcategory_choice === "Medical" || subcategory_choice === "Engineering" || category_choice === "school (grade 5th to 12th)" ) && <div class="dropdown">
            <button class="dropbtn">{subject}
              <i class="fa fa-caret-down"></i>
            </button>
            <select name="field" className="dropdown-content"  onChange={subjectChoiceHandler}> 
              <option>select subject</option>
                {subject_options}
            </select>
      </div>}

    </div>
    <input
        type="text"
        placeholder="Book Name..."
        value={formData.bookname}
        onChange={(e) => {
          setFormData({ ...formData, bookname: e.target.value });
        }}
        required
        />
      <input
        type="text"
        placeholder="Author Name..."
        value={formData.author}
        onChange={(e) => {
          setFormData({ ...formData, author: e.target.value });
        }}
        required
      />
      <textarea
        placeholder="Other Details .."
        value={formData.other}
        onChange={(event) =>
          setFormData({ ...formData, other: event.target.value })
        }
        required
      />

      <div className="bookimage">
        <label htmlFor="bookimage">Upload Book Image :</label>
        <input type="file" id="bookimage" className="form-control" name="file"  onChange={handleInputChange} />
      </div>
      
    </form>
        
    </div>
  )
}
