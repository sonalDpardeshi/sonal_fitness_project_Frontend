import React, { useEffect, useState } from 'react';
import AdminService from '../Services/AdminService';

function ViewUsers() {
  const [users, setUsers] = useState([]);
  const[search,setSearch]=useState('');
const[page,setPages]=useState(1);
  let recordsPerPage=6;

  const totalPages = Math.ceil(users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase())).length / recordsPerPage);
  const lastrecord=page*recordsPerPage;
const startrecord=lastrecord-recordsPerPage;

  const fetchusers=() => {
    if(search.trim()===''){
    AdminService.viewusers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.log(err));
    }
    else{
      AdminService.searchusers(search)
      .then((res)=>{
        setUsers(res.data);
      })
    }
  }
  useEffect(()=>{
    fetchusers();

  },[search,page])

  return (
     <div className="container my-4">
    <div className="container my-4 d-flex justify-content-between align-items-center">
      <h2 className="text-center mb-4">Registered Users</h2>
      <input type="text" className='form-control w-25' 
      placeholder='search users'
      value={search}
      onChange={(e)=>setSearch(e.target.value)}
      />
      </div>
      <div className="table-responsive">
        <table className="table table-striped table-hover table-bordered shadow">
          <thead className="table-dark text-center">
            <tr>
              <th>Sr.No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Height (cm)</th>
              <th>Weight (kg)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {
              users.length > 0 ? users.slice(startrecord,lastrecord).map((e, index) => (
                <tr key={index}>
                  <td>{startrecord+index+1}</td> 
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.height}</td>
                  <td>{e.weight}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="5" className="text-center text-muted">No users found</td>
                </tr>
              )
            }
          </tbody>
        </table>
        {/* <div className="d-flex justify-content-end mt-3"> */}
        {users.length > recordsPerPage && (
          <div className="d-flex justify-content-end mt-3">
        {
          Array.from({length:totalPages},(e,i)=>(<button key={i}
             onClick={()=>setPages(i+1)}
            className={`btn btn-sm mx-1 ${page === i + 1 ? 'btn-primary' : 'btn-outline-primary'}`}
            // onClick={i+1}
            >{i+1}
            </button>
            ))
        }
        </div>
        )}
      </div>
    </div>
  );
}

export default ViewUsers;
