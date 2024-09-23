import { Route, Routes } from "react-router-dom";
import "./MainRoute.css";
import { Login } from "../../pages/Login/Login";
import { Page404 } from "../../pages/Page404/Page404";
import { Register } from "../../pages/Register/Register";
import { VacationList } from "../../pages/VacationList/VacationList";
import { AddVacation } from "../../pages/AddVacation/AddVacation";
import { VacationReport } from "../../pages/VacationReport/VacationReport";
import { UpdateVacation } from "../../pages/UpdateVacation/UpdateVacation";
import { About } from "../../pages/About/About";
import { Contact } from "../../pages/Contact/Contact";
import { LoadPic } from "../../pages/LoadPic/LoadPic";

export function MainRoute(): JSX.Element {
    return (
        <div className="MainRoute">
			<Routes>
                <Route path='/'  element={<Login/>}/>
                <Route path='/login'  element={<Login/>}/>
                <Route path='/register'  element={<Register/>}/>
                <Route path='/vacations'  element={<VacationList/>}/>
                <Route path='/addVacation'  element={<AddVacation/>}/>
                <Route path='/loadPicture'  element={<LoadPic/>}/>
                <Route path='/updateVacation/:id'  element={<UpdateVacation/>}/>
                <Route path='/reports'  element={<VacationReport/>}/>
                <Route path='/about'  element={<About/>}/>
                <Route path='/contact'  element={<Contact/>}/>
                <Route path='/*'  element={<Page404/>}/>
            </Routes>
        </div>
    );
}
