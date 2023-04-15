import React ,{useState} from 'react'
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import success from '../utils/pics/book.jpeg'
import { host } from '../utils/apiRoutes';

export default function Opinion() {
    const [agree, setagree] = useState('APPROVE / REJECT');
    const [req, setreq] = useState(false);
    const param = useParams();
    const navigate = useNavigate();
    const handleChange = async (e) => {
        e.preventDefault();
        try {
            setreq(true);
            const flag = (agree === "Approve")?"true":"false";
            const url = `${host}/put/opinion/${param.book_id}/${flag}/${param.r_mail}`;
            const { data } = await axios.put(url);
            setreq(false);
            if(agree === "Approve"){
                alert('We respect your decision. Reciever will contact you sooner ,kindly follow the RECIEVED INFO LINK sent to your mail once the book is collected .Thank you .')
                navigate('/');
                return;
            }else{
                alert('We respect your decision.Thank you .');
                navigate('/');
                return;
            }
        } catch (error) {
            
            alert('Network Error ! try again');
            console.log(error);
        }
    }
  return (
   <>
    <div className='v_container'>
        {req && <div style={{width:'200px' , height:'50px' , backgroundColor:'yellowgreen'}} >Loading ...</div>}
        <img src={success} height= '150px' width = '300px' alt="success_img" className='book_img' />
        <h2 className='center_text'>Select your opinion </h2>
        <div className="dropdown">
            <button className="dropbtn">{agree}
                <i className="fa fa-caret-down"></i>
            </button>
            <select name="field" className="dropdown-content"  onChange={(e) => { setagree(e.target.value);} }> 
            <option>Select</option>
            <option>Approve</option>
            <option>Reject</option>
            </select>
        </div>
        <button  onClick={handleChange} className='green_btn'>Submit</button>

	</div>
   </>
  )
}
