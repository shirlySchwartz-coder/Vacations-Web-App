class Vars{
    public LOGIN_URL = `http://localhost:8080/api/v1/login/loginUser`;
    public REGISTER_URL= `http://localhost:8080/api/v1/login/registerUser`;
    public FAVORITES_URL = `http://localhost:8080/api/v1/vacations/favorites/`;
    public VACATIONS_URL = `http://localhost:8080/api/v1/vacations/all`;
    //user
    public FOLLOW_URL = `http://localhost:8080/api/v1/vacations/follow/vacation/`;
    public UNFOLLOW_URL = `http://localhost:8080/api/v1/vacations/unfollow/vacation/`;
    //admin
    public ADD_VAC_URL = `http://localhost:8080/api/v1/dashBoard/addVacation`;
    public UPLOAD_PIC_URL= `http://localhost:8080/api/v1/dashBoard/uploadPicture`;
    public UPDATE_VAC_URL = `http://localhost:8080/api/v1/dashBoard/updateVacation/`;
}
const vars= new Vars();
export default vars;

//
