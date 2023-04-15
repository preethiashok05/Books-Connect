import React ,{useState} from 'react'
import axios from "axios";
import { useParams , useNavigate} from "react-router-dom";
import success from '../utils/pics/book.jpeg'
import { host } from '../utils/apiRoutes';

export default function Opinion() {
    const [agree, setagree] = useState(false);
    const param = useParams();
    const navigate = useNavigate();


    const handleChange = async (e) => {
        e.preventDefault();
        const flag = (e.target.value === 'Approve')?true:false;
        setagree(flag);
        try {
            const url = `${host}/put/opinion/${param.book_id}/${agree}/${param.r_mail}`;
            const { data } = await axios.put(url);
            if(agree){
                alert('We respect your decision. Reciever will contact you sooner ,kindly follow the Recieved info link sent to your mail once the book is collected .Thank you .')
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
    <img src={success} height= '150px' width = '300px' alt="success_img" className='book_img' />
        <h2 className='center_text'>Approve or Reject the Request</h2>
        <div className="flex">
            <button onClick={handleChange} className='green_btn'>Approve</button>
            <button onClick={handleChange} className='green_btn'>Reject</button>
        </div>
	</div>
   </>
  )
}
