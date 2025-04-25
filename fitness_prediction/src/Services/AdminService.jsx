import axios from "axios";

// admin login
let adminlogin="http://localhost:8080/admin/login";

// view workouts
let viewworkouts="http://localhost:8080/admin/workout/view";

// add workouts
let addworkout="http://localhost:8080/admin/workout/add";

// view users
let viewusers="http://localhost:8080/admin/viewusers";

// view intensities
let viewintensities="http://localhost:8080/admin/intensities";

// Add workoutcalories 
let addworkoutcalories="http://localhost:8080/admin/addWorkoutCalories";

// view workoutcalories
let viewworkoutcalories="http://localhost:8080/admin/viewWorkoutCalories";

class AdminService {

    // // admin login method
    //  login(admin) {
    //     try {
    //         const response =  axios.post(adminlogin, admin);
    //         return response;
    //     } catch (error) {
    //         console.error("Error during admin login:", error);
    //         throw error;  // Re-throw the error to be handled by the caller
    //     }
    // }

    // admin login method
    login(admin) {
        return axios.post(adminlogin, admin)
     .catch(error => {
        // console.error("Admin login error:", error);
        return Promise.reject(error.response || error.message || error);
      });
    }
  

    // view workouts
     viewworkouts() {
        try {
            const response =  axios.get(viewworkouts);
            return response;
        } catch (error) {
            console.error("Error fetching workouts:", error);
            throw error;
        }
    }

    // add workout
     addworkout(workout) {
        try {
            const response =  axios.post(addworkout, workout);
            return response;
        } catch (error) {
            console.error("Error adding workout:", error);
            throw error;
        }
    }

    // view users
    viewusers() {
        try {
            const response = axios.get(viewusers);
            return response;
        } catch (error) {
            console.error("Error fetching users:", error);
            throw error;
        }
    }

    // view intensities
     viewintensities() {
        try {
            const response = axios.get(viewintensities);
            return response;
        } catch (error) {
            console.error("Error fetching intensities:", error);
            throw error;
        }
    }

    // add workoutcalories
    async addworkoutcalories(workoutcalories) {
        try {
            const response =  axios.post(addworkoutcalories, workoutcalories);
            return response;
        } catch (error) {
            console.error("Error adding workout calories:", error);
            throw error;
        }
    }

    // view workoutcalories
     viewworkoutcalories() {
        try {
            const response =  axios.get(viewworkoutcalories);
            return response;
        } catch (error) {
            console.error("Error fetching workout calories:", error);
            throw error;
        }
    }

    // update workoutcalories
     updateworkoutcalories(wcr, recordid) {
        let updatecalories = `http://localhost:8080/admin/updateWorkoutCalories/${recordid}`;
        try {
            const response =  axios.put(updatecalories, wcr);
            return response;
        } catch (error) {
            console.error("Error updating workout calories:", error);
            throw error;
        }
    }

    // search workouts
     searchworkouts(pattern) {
        try {
            const response =  axios.get(`http://localhost:8080/admin/searchworkout/${pattern}`);
            return response;
        } catch (error) {
            console.error("Error searching workouts:", error);
            throw error;
        }
    }

    // search users
     searchusers(pattern) {
        try {
            const response = axios.get(`http://localhost:8080/admin/searchuser/${pattern}`);
            return response;
        } catch (error) {
            console.error("Error searching users:", error);
            throw error;
        }
    }

    // search workoutcaloriesrelation
     searchworkoutcalories(pattern) {
        try {
            const response =  axios.get(`http://localhost:8080/admin/searchWorkoutCalories/${pattern}`);
            return response;
        } catch (error) {
            console.error("Error searching workout calories relation:", error);
            throw error;
        }
    }
}

export default new AdminService();
