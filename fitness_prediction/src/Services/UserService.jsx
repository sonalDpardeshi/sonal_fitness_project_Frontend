import axios from "axios";

// user register
let userregister = "http://localhost:8080/user/register";

// user login
let userlogin = "http://localhost:8080/user/login";

// submit workout
let userworkout = "http://localhost:8080/user/workoutdetails";

const userid = localStorage.getItem("userid");

class UserService {

  // user register method
  register(user) {
    return axios.post(userregister, user)
      .catch(error => {
        // Log or process the error
        console.error("Registration error:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // user login method
  login(user) {
    return axios.post(userlogin, user)
      .catch(error => {
        // Log or process the error
        console.error("Login error:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // user submits workout
  submitworkout(workout) {
    return axios.post(userworkout, workout)
      .catch(error => {
        // Log or process the error
        console.error("Workout submission error:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // view total calories of user uptill now
  viewcaloriesburn(userid) {
    let usertotalcaloriesburn = `http://localhost:8080/user/getcaloriesuptillnow/${userid}`;
    return axios.get(usertotalcaloriesburn)
      .catch(error => {
        // Log or process the error
        console.error("Error fetching calories:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // view user workout history
  viewuserworkouthistory(userid) {
    let userworkouthistory = `http://localhost:8080/user/read/${userid}`;
    return axios.get(userworkouthistory)
      .catch(error => {
        // Log or process the error
        console.error("Error fetching workout history:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // view user workout history CSV file path
  viewfilepath(userid) {
    let userfilepath = `http://localhost:8080/user/getfilepath/${userid}`;
    return axios.get(userfilepath)
      .catch(error => {
        // Log or process the error
        console.error("Error fetching file path:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // view user profile
  viewprofile(userid) {
    let userprofile = `http://localhost:8080/user/viewprofile/${userid}`;
    return axios.get(userprofile)
      .catch(error => {
        // Log or process the error
        console.error("Error fetching profile:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // update user profile
  updateprofile(user, userid) {
    let updateprofile = `http://localhost:8080/user/updateprofile/${userid}`;
    return axios.put(updateprofile, user)
      .catch(error => {
        // Log or process the error
        console.error("Error updating profile:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

  // recommend plan
  recommendplan(userid) {
    let userplan = `http://localhost:8080/admin/suggest/${userid}`;
    return axios.get(userplan)
      .catch(error => {
        // Log or process the error
        console.error("Error fetching plan:", error);
        return Promise.reject(error.response || error.message || error);
      });
  }

}

export default new UserService();
