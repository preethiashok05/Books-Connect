import React ,{useState , useEffect} from 'react'
import { medMajor , engSubjects } from '../../utils/booksData';
import { ParaClinical , PreClinical , Clinical , Dentistry  , schoolSubjects} from '../../utils/booksData';
import { host } from '../../utils/apiRoutes'
import axios from 'axios';
import BookCard from '../../components/BookCard';
import useGeolocation from "../../hooks/useGeolocation";

import './styles.css'

export default function FindBooks() {
    const [items, setitems] = useState([]);
    const [nearest, setnearest] = useState(false);
    const [order, setorder] = useState("Select Order");
    const [filter, setfilter] = useState('Sort By');
    const [points, setpoints] = useState({
        lat:'',
        lng:''
    });
    const [field, setfield] = useState("Select Field");
    const [subject, setsubject] = useState("Select Subject");
    const location = useGeolocation();
    const path = window.location.pathname.split('/');
    const category = (path[2] === "school" ?"school (grade 5th to 12th)":"college (degree)");
    const subcategory = path[3];

    function relativeHaversineDistance(lattitude1, longittude1,lattitude2,longittude2) {
        console.log('hello')
        const toRadian = n => (n * Math.PI) / 180
        
            let lat2 = lattitude2
            let lon2 = longittude2
            let lat1 = lattitude1
            let lon1 = longittude1
        
            console.log(lat1, lon1+"==="+lat2, lon2)
            let R = 6371  // km
            let x1 = lat2 - lat1
            let dLat = toRadian(x1)
            let x2 = lon2 - lon1
            let dLon = toRadian(x2)
            let a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadian(lat1)) * Math.cos(toRadian(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
            let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
            let d = R * c
            console.log("distance==?",d)
            return d 
    
       
        }

    let field_options = null;
    let subject_options = null;

    if (subcategory === "Medical") { 
        field_options = medMajor.map((el) => <option key={el}>{el}</option>); 
    }else if(subcategory === "Engineering"){
        subject_options =engSubjects.map((el) => <option key={el}>{el}</option>); 
    }else if(path[2]=== "school"){
        subject_options = schoolSubjects.map((el) => <option key={el}>{el}</option>); 
    }

    if(field === "PreClinical"){
        subject_options = PreClinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field === "ParaClinical"){
        subject_options = ParaClinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field === "Clinical"){
        subject_options = Clinical.map((el) => <option key={el}>{el}</option>); 
    }else if(field === "Dentistry"){
        subject_options = Dentistry.map((el) => <option key={el}>{el}</option>); 
    }

    useEffect( () => {
        var mount = true;
        if(mount === true)
        { 
            setpoints({lat: location?.coordinates.lat , lng: location?.coordinates.lng});
            let flag1 = (filter === 'Sort By')?"no":filter;
            let flag2 = (flag1 === "no")?"no":((order === "Select Order" || order === "ASC")?"ASC":"DESC");   
            let flag3 = (field === "Select Field")?"no":field;
            let flag4 = (subject === "Select Subject")?"no":subject;

            axios.get(`${host}/get/book/${category}/${subcategory}/${flag3}/${flag4}/${flag1}/${flag2}`)
            .then(response => {
              console.log(response.data.record);
              setitems(response.data.record);
            })
            .catch(error => {
                console.log(error);
            })
        }
        return () => {mount = false};
    }, [field , subject,filter ,order ]);

    useEffect(() => {
        if(nearest && items ){
            const sorted = items.sort((a, b) => relativeHaversineDistance(a.lat, a.lng, points.lat,points.lng ) > relativeHaversineDistance(b.lat, b.lng, points.lat , points.lng)?1:-1)
            setitems(sorted);
        }else if(!nearest && items){
            const sorted = items.sort((a, b) =>  relativeHaversineDistance(a.lat, a.lng, points.lat,points.lng ) > relativeHaversineDistance(b.lat, b.lng, points.lat , points.lng)?-1:1)
            setitems(sorted);
        }
    }, [nearest]);
    
  return (
   <>
   <div className="college_books">
        <div className="filter_section">
                <div className="dropdown">
                    <button className="dropbtn">{filter}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <select name="field" className="dropdown-content"  onChange={(e) => setfilter(e.target.value)}> 
                    <option>Sort By</option>
                    <option>author</option>
                    <option>bookname</option>
                    </select>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">{order}
                        <i className="fa fa-caret-down"></i>
                    </button>
                    <select name="order" className="dropdown-content"  onChange={(e) => setorder(e.target.value)}> 
                    <option>Select Order</option>
                    <option>ASC</option>
                    <option>DESC</option>
                    </select>
                </div>      
                <div className="dropdown">
                <div className="nearby">
                <button className={`nearbtn_${nearest}`}  onClick={() => { setnearest(!nearest); }} >Nearest Donor  </button>
                </div>
                </div>
                <div className="college_menu">
                    <div className="dropdown">
                    {(subcategory === "Engineering" || category === "school (grade 5th to 12th)") &&  
                    <div className="options">
                        <button className="dropbtn">{subject}
                        <i className="fa fa-caret-down"></i>
                        </button> 
                        <select name="option" className="dropdown-content"  onChange={(e) => {setsubject(e.target.value);} }> 
                           <option>select subject</option>
                            { subject_options }
                        </select>
                    </div>}
            </div>
            <div className="dropdown">
                {(subcategory === "Medical" ) &&  
                <div className="options">
                    <button className="dropbtn">{field}
                    <i className="fa fa-caret-down"></i>
                    </button>  
                    <select name="option" className="dropdown-content"  onChange={(e) => {setfield(e.target.value);} }> 
                        { field_options }
                    </select>
                </div>}
            </div>
            <div className="dropdown">
            { (subcategory === "Medical") && (field !== "Other") &&  (field !== "Select Field") &&
            <div className="options">
                <button className="dropbtn">{subject}
                    <i className="fa fa-caret-down"></i>
                </button>
                <select name="option" className="dropdown-content"  onChange={(e) => setsubject(e.target.value)}> 
                    { subject_options }
                </select>
            </div>}
            </div>

                </div>
        </div>

        <div className="gallery">
        {items && items.map((book) => {
                return( <BookCard key={book.id} book = {book} /> )
        })}
        {items.length === 0 && <div>No books found</div>}
        </div>
   </div>
   </>
  )
}
