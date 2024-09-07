// import '../../custom-css/Loader.css'
import loader from '../../assets/V5.gif'

const Loader = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center'>
       
        <img className=' md:w-[100px] md:h-[100px] w-[64px] h-[64px]' src={loader} alt="loader" />
        {/* <div className="spinner"></div> */}
        
      {/* <div className="loader"></div> */}
        </div>
  )
}

export default Loader