import { BrowserRouter as Router, Routes as PossibleRoutes, Route, Navigate } from 'react-router-dom';
import { Routes } from "../../core/routing/index";
import Movies from '../../components/Home';


const MainRouting = () => {
  return (
    <>
    <Router>
        <PossibleRoutes>
            <Route index path={Routes.Movies} element={<Movies />} />
            <Route path="*" element={<Navigate to={Routes.Movies} replace />} />
        </PossibleRoutes>
    </Router>
    </>
  )
}
export default MainRouting