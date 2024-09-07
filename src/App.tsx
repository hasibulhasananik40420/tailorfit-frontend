import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/layout/ProtectedRoute";

const App = () => {
  return (
    <div className="no-select">
      <ProtectedRoute>
        <MainLayout></MainLayout>
      </ProtectedRoute>
    </div>
  );
};

export default App;
