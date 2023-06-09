import React ,{useState} from 'react'
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import success from '../utils/pics/book.jpeg'
import { host } from '../utils/apiRoutes';

export default function RecievedInfo() {
    const [collected, setcollected] = useState('COLLECTED ? YES/NO');
    const param = useParams();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        const flag = (e.target.value === "YES")?true:false;
        setcollected(flag);

        try {
            const url = `${host}/delete/recieved/${param.book_id}/${collected}/${param.r_mail}`;
            const { data } = await axios.delete(url);
            if(collected === "YES"){
                alert('Great job.Keep donating and inspiring your fellow learners.')
                navigate('/');
                return;
            }else{
                alert('Sad to hear that, we will make sure the book will be available to others.');
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
    <img src={success} height= '150px' width = '300px' alt="success_img" className='book_img' />
        <h3 className='center_text'>Thankyou for your time , we hope the book reached the reciever safely . Let us know !!</h3>
        <div className="dropdown">
            <button className="dropbtn">{collected}
                <i className="fa fa-caret-down"></i>
            </button>
            <select name="field" className="dropdown-content"  onChange={(e) => { setcollected(e.target.value);} }> 
            <option>Select</option>
            <option>YES</option>
            <option>NO</option>
            </select>
        </div>
        <button  onClick={handleChange} className='green_btn'>Submit</button>
	</div>

   </>
  )
}
