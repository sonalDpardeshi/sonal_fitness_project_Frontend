import axios from "axios";

// admin login
let adminlogin="http://localhost:8080/admin/login";

class AdminService{

    // admin login method
    login(admin){//this alogin object is sent to login api in java as json format
        return axios.post(adminlogin,admin);
    }
}

export default new AdminService();