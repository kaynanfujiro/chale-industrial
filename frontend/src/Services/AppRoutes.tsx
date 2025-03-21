import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { ChaletList } from "../Components/Body/ChaletList";
import { ChaletDetails } from "../Components/Body/ChaletDetails";
import { Login } from "../Components/Login/Login";
import { RegisterChale } from "../Components/RegisterChale/RegisterChale";
import { ProtectedRoute } from "./ProtectedRoute";
import { AdminPainel } from "../Components/Body/AdminPainel/AdminPainel";

export const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<ChaletList/>} />
                    <Route path="/chalet/:id" element={<ChaletDetails/>} />
                    <Route path="/Login" element={<Login/>} />
                    <Route path="/RegisterChale" 
                    element={<ProtectedRoute>
                                <RegisterChale/>
                            </ProtectedRoute>
                            }
                        />  
                    <Route path="/AdminPainel" 
                    element={<ProtectedRoute>
                                <AdminPainel/>
                            </ProtectedRoute>
                            }
                        />  
                </Routes>
            </Layout>
        </Router>
    );
};