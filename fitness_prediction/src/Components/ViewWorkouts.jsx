import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDumbbell } from '@fortawesome/free-solid-svg-icons';

function ViewWorkouts() {
  const [workout, setWorkout] = useState([]);
  const [search, setSearch] = useState('');

  // Fetch all workouts initially (or only on search if you prefer)
  useEffect(() => {
    AdminService.viewworkouts()
      .then((res) => {
        setWorkout(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Search whenever the search input changes
  useEffect(() => {
    if (search.trim() === '') {
      // if search is empty, load all workouts again
      AdminService.viewworkouts()
        .then((res) => {
          setWorkout(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      AdminService.searchworkouts(search)
        .then((res) => {
          // console.log(res.data);
          setWorkout(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [search]);

  return (
    <>
      <div className="container d-flex justify-content-between align-items-center my-4">
        <h3 className="mb-0">Available Workouts</h3>
        <input
          type="text"
          className="form-control w-25"
          placeholder="Search workouts"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="container d-flex flex-wrap justify-content-center">
       
        {
        Array.isArray(workout)&& workout.length>0?(workout.map((e, index) => (
          <div key={index} className="card m-3" style={{ width: '18rem' }}>
            <div className="card-body text-center">
              <FontAwesomeIcon icon={faDumbbell} size="2x" className="text-primary mb-3" />
              <h2 className="card-title">{e.workout_type_name}</h2>
              <p className="card-text">
                Push your limits and transform your fitness with this workout
              </p>
            </div>
          </div>
        ))
        ):(<h3 className='text-muted'>No workuts are available</h3>)
      }
      </div>
    </>
  );
}

export default ViewWorkouts;
