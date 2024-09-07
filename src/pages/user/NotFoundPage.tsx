import { FaFacebookF, FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import logo from '../../assets/shape.png'
import notfound from '../../assets/notfoundimage.png'
import { Link } from 'react-router-dom'
import '../../custom-css/NotFound.css'
const NotFoundPage = () => {
  return (
     <div className='notfound-page'>
      <div className="wrapper">
        <div className="circle circle1"><span></span></div>
        <div className="circle circle2"><span></span></div>
        <div className="circle circle3"><span></span></div>
        <div className="circle circle4"><span></span></div>
        <div className="main-wrapper">
            <header className="header-area">
                <div className="brand-logo">
                     <a>
                        {/* <img src="assets/images/logo.png" alt="Tailorfit"> */}
                        <img src={logo} alt="Tailorfit" />
                        </a>
                </div>
            </header>
            <section className="main-content">
                <div className="content-box">
                    {/* <h1>404</h1> */}
                     <div className='flex justify-center items-center !mt-[60px]'>
                     <img className="md:w-full md:h-[120px] w-[200px] h-[150px] object-contain" src={notfound} alt="404 not found" />
                     </div>
                    <p>Oops! Something went wrong</p>
                     
                      <div className='main-btn'>
                      <button>
                        <Link to="/admin/dashboard">Go Back to Home</Link>
                     </button>
                      </div>
                    
                    <div className="socail-icon">
                        <a href="#"><FaFacebookF /></a>
                        <a href="#"><FaYoutube /> </a>
                        <a href="#"><FaLinkedinIn />  </a>
                    </div>
                </div>
            </section>
        </div>
    </div>
     </div>
  )
}

export default NotFoundPage