import React, { useEffect, useState ,useRef} from 'react';
import UserService from '../Services/UserService';

function UserWorkoutHistory() {
  const [userHistory, setUserHistory] = useState([]);
  // If history of user is not present then only dispaly msg for that below handles state of message
  const[NoData, setNoData]=useState(false);

let userid=localStorage.getItem("userid");

// usestate for storing file path
const[filepath,setFilepath]=useState("");

  useEffect(() => {
    let promise = UserService.viewuserworkouthistory(userid)
      .then((res) => {
        // console.log(res.data)
        const historydata = res.data.split("\n").filter((row)=>row.trim() !== "").map((row) => {
          const col = row.split("|");
          return {
            workout_type: col[0],
            intensity_type: col[1],
            duration: col[2],
            calories_burn: col[3]
          };
        });
        if(historydata.length===1&&historydata[0].workout_type.toLowerCase().includes("file not found for this userid need to fill workout form first")){
          setNoData(true);
        }
        else{
        setUserHistory(historydata);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userid]);

// getting csv file path for downloading to user
useEffect(()=>{
  let promise=UserService.viewfilepath(userid)
  .then((res)=>{
    // console.log(res.data)
    setFilepath(res.data);
  })
  .catch(error => {
    if (error.response && error.response.status === 400) {
      console.warn("File path not available. User might not have submitted workout.");
      // You can even show a message to the user
    } else {
      console.error("Unexpected error:", error);
    }
  })
},[userid]); 

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">User Workout History</h2>

      {/* download csv file button */}
      {
        filepath&&(
          <div className="text-end mb-3">
          <a href={filepath} className="btn btn-success"> ⬇️ Download CSV</a>
       </div>
        )
      }

      {
        !filepath||NoData?
        (
        <div>
         <h2 className='box'> file not found for you need to fill workout form first</h2>
        </div>):
      (
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>Sr.No.</th>
              <th>Workout Type</th>
              <th>Intensity Type</th>
              <th>Duration</th>
              <th>Calories Burned</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              userHistory.length > 0 ? userHistory.map((e, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{e.workout_type}</td>
                  <td>{e.intensity_type}</td>
                  <td>{e.duration}</td>
                  <td>{e.calories_burn}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No workout history found</td>
                </tr>
              )
            }
          </tbody>
        </table>
       
      </div>
       )}
    </div>
  );
}

export default UserWorkoutHistory;
