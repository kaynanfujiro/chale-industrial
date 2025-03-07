import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "../Components/Layout";
import { ChaletList } from "../Components/Body/ChaletList";
import { ChaletDetails } from "../Components/Body/ChaletDetails";

export const AppRoutes = () => {
    return (
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<ChaletList/>} />
                    <Route path="/chalet/:id" element={<ChaletDetails/>} />
                </Routes>
            </Layout>
        </Router>
    );
};