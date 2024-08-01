import {BrowserRouter, Routes, Route} from "react-router-dom";
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Service} from "./pages/Service";
import {Register} from "./pages/Register";
import {Login} from "./pages/Login";
import {Logout} from "./pages/Logout";
import {Error} from "./pages/Error";
import {Navbar} from "./Components/Navbar";
import {Footer} from "./Components/Footer";
import { AdminLayout } from "./Components/layouts/Admin-Layout";
import { AdminUsers } from "./Components/layouts/Admin-Users";
import { AdminContacts } from "./Components/layouts/AdminContacts";

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="*" element={<Error />} />
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
        </Route>
      </Routes>
    <Footer />
    </BrowserRouter>
  )
}

export default App;