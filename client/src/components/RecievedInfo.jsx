import React ,{useState} from 'react'
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import success from '../utils/pics/book.jpeg'
import { host } from '../utils/apiRoutes';

export default function RecievedInfo() {
    const [collected, setcollected] = useState(true);
    const param = useParams();
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault();
        const flag = (e.target.value === 'Reciever collected the book successfully')?true:false;
        setcollected(flag);

        try {
            const url = `${host}/delete/recieved/${param.book_id}/${collected}/${param.r_mail}`;
            const { data } = await axios.delete(url);
            if(collected){
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
        <div className="flex">
            <button id="yes" onClick={handleChange} className='green_btn'>Reciever collected the book successfully </button>
            <label htmlFor="yes">*We will delete the book from our database if book is collected</label>
            <button onClick={handleChange} className='green_btn'>Did not collect the book</button>
        </div>
	</div>
   </>
  )
}
