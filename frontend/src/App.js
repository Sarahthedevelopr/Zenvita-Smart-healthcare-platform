import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Symptom from "./pages/Symptom";
import Emergency from "./pages/Emergency";
import Blood from "./pages/Blood";
import Reminder from "./pages/Reminder";
import Tips from "./pages/Tips";
import BMI from "./pages/BMI";
import Appointment from "./pages/Appointment";
import Mental from "./pages/Mental";
import Home from "./pages/Home";
import Hospitals from "./pages/Hospitals";
import Doctors from "./pages/Doctors";
import AI from "./pages/AI";
import Footer from "./pages/Footer";
import TrackingViewer from "./components/TrackingViewer";
import HospitalDashboard from "./components/HospitalDashboard";



function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hospitals" element={<Hospitals />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/blood" element={<Blood />} />
         <Route path="/ai" element={<AI />} />
          <Route path="/symptoms" element={<Symptom />} />
         <Route path="/emergency" element={<Emergency />} />
         <Route path="/blood" element={<Blood />} />
         <Route path="/reminder" element={<Reminder />} />
         <Route path="/tips" element={<Tips />} />
         <Route path="/bmi" element={<BMI />} />
         <Route path="/appointment" element={<Appointment />} />
         <Route path="/mental" element={<Mental />} />
         <Route path="/hospital" element={<HospitalDashboard />} />
        <Route path="/track/:id" element={<TrackingViewer />} />
      </Routes>
       <Footer /> 
    </BrowserRouter>
  );
}

export default App;