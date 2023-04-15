import React from 'react'
import './styles/footer.css'

export default function Footer() {
  return (
    <>
        <footer className="footer_">
            <div className="footer__bg">
                <div className="footer__container">
                    <div>
                        <h1 className="footer__title">Books Connect</h1>
                        <span className="footer__subtitle">site built to make books available for free , which are donated by people.</span>
                    </div>

                    <ul className="footer__links">
                        <li>
                            <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=books4connect@gmail.com" target="_blank" rel='noreferrer' className="footer__link">Contact Us</a>
                        </li>
                        <li>
                            <a href="/about" className="footer__link">About</a>
                        </li>
                        <li>
                            <a href="/donate" className="footer__link">Donate Books</a>
                        </li>
                    </ul>
                </div>
            </div>           
        </footer>
    </>
  )
}
