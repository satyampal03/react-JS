import { useNavigate } from "react-router-dom"; 
 
 function Footer() {

  const navigate = useNavigate();
    function homeTriggered(){
       navigate(`/`);
    }
  return (
<footer className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-white border-t border-gray-200 text-gray-600 text-sm">
  <div 
    onClick={homeTriggered} 
    className="font-bold text-xl text-white cursor-pointer hover:opacity-70 transition-opacity mb-4 md:mb-0"
  >
    LOGO
  </div>

  <div className="mb-4 md:mb-0 italic">
    All Rights Reserved &copy; 2020
  </div>

  <div className="flex gap-4 font-medium hover:text-indigo-600 cursor-pointer">
    Follow us
  </div>
</footer>

  );
}

export default Footer