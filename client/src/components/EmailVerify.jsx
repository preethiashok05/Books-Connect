import React , { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import success from "../utils/pics/success.webp";
import styles from './styles/verify.css'
import { clienthosthost } from "../utils/apiRoutes";

export default function EmailVerify() {
    const [validUrl, setValidUrl] = useState(false);
	const param = useParams();

	useEffect(() => {
		var mount = true;
		if(mount === true){
			const verifyEmailUrl = async () => {
				try {
					const url = `${host}/get/users/${param.email}/verify/${param.token}`;
					const { data } = await axios.get(url);
					console.log(data);
					setValidUrl(true);
				} catch (error) {
					console.log(error);
					setValidUrl(false);
				}
			};
			verifyEmailUrl();
		}
		return () => {
			mount = false;
		}
	}, []);
    return (
    <>
    {validUrl ? (
				<div className='v_container'>
					<img src={success} alt="success_img" className='success_img' />
					<h2 className="center_text">Email verified successfully</h2>
					<Link to="/signin">
						<button className='green_btn'>Login</button>
					</Link>
				</div>
			) : (
				<h1>404 Not Found</h1>
	)}
    </>
  )
}
