import logo from '../../assets/authlogo.png'
const AuthNavbar = () => {
  return (
    <div className="">
       
            <div className="flex justify-center items-center 2xl:h-[100px] lg:h-[70px] h-[80px]">
               <img className='w-[184px] h-[40px] object-contain' src={logo} alt="" />
            </div>
      
    </div>
  )
}

export default AuthNavbar