import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';
import { useNavigate } from 'react-router-dom';

function ViewWorkoutCalories() {
  const [workoutcalories, setWorkoutCalories] = useState([]);
  const [search, setSearch] = useState(''); // State for search term
  const [page, setPages] = useState(1);
  let recordsPerPage = 7;

  const lastrecord = page * recordsPerPage;
  const startrecord = lastrecord - recordsPerPage;

  // Function to fetch workout calories based on search term
  const fetchWorkoutCalories = () => {
    // console.log("Fetching workout calories with search:", search);
    if (search.trim() === '') {
      // Fetch all workout calories if search is empty
      AdminService.viewworkoutcalories()
        .then((res) => {
          // console.log('All workout calories:', res.data);
          setWorkoutCalories(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      // Fetch filtered workout calories based on search term
      AdminService.searchworkoutcalories(search)
        .then((res) => {
          console.log('Filtered workout calories:', res.data);
          setWorkoutCalories(res.data);
        })
        .catch((err) => console.log(err));
    }
  };

  // Fetch workout calories whenever search term or page changes
  useEffect(() => {
    fetchWorkoutCalories();
  }, [search, page]);

  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Workout Intensity duration Calories Relation</h2>
      <div className="d-flex  mb-3 justify-content-end">
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search workout calories"
          value={search}
          onChange={(e) => setSearch(e.target.value)} // Update search state
        />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>Sr.No.</th>
              <th>Workoutname</th>
              <th>Intensity Type</th>
              <th>Duration </th>
              <th>Calories Burn</th>
              <th>Update</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {workoutcalories.length > 0 ? (
              workoutcalories.slice(startrecord, lastrecord).map((e, index) => (
                <tr key={index}>
                  <td>{startrecord + index + 1}</td>
                  <td>{e.workout_type_id}</td>
                  <td>{e.intensityid}</td>
                  <td>{e.duration}</td>
                  <td>{e.calories_burn}</td>
                  <td>
                    <a
                      href="#"
                      onClick={(ele) => {
                        ele.preventDefault();
                        navigate(`/account/admin/admin-dashboard/workoutcalories/update/${e.recordid}`, { state: { record: e } });
                      }}
                    >
                      update
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center text-muted">No records found</td>
              </tr>
            )}
          </tbody>
        </table>
        <div className="d-flex justify-content-end mt-3">
          {Array.from({ length: Math.ceil(workoutcalories.length / recordsPerPage) }, (e, i) => (
            <button
              key={i}
              onClick={() => setPages(i + 1)}
              className={`btn btn-sm mx-1 ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ViewWorkoutCalories;
