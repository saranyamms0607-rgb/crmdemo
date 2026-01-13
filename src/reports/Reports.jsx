
import { useNavigate } from "react-router-dom";

import { FiFile , FiTrendingUp} from "react-icons/fi";

export const Reports = () => {
     const navigate = useNavigate();
  return (
    <div  className="settings-wrapper">
        <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="settings-container">
        <div className="settings-card" id="settings-card" onClick={()=>navigate("/leadreports")}>
            <h3> Leads Report</h3>
            <FiTrendingUp size={100}/>
        </div>
        <div className="settings-card"></div>
        <div className="settings-card"></div>

      </div>
      
      </div>
  )
}
