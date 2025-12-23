import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { AppLayout } from "./components/Layout/AppLayout";
import { RewardsHub } from "./pages/RewardsHub/RewardsHub";
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <AppProvider>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route
              index
              element={<Navigate to="/dashboard/earn-reward" replace />}
            />
            <Route path="/dashboard/earn-reward" element={<RewardsHub />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
