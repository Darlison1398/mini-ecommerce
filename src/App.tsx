import { AppRoutes } from "./routes/AppRoutes";
import { Navbar } from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
      <Toaster position="bottom-right" />
    </BrowserRouter>
  )
}

export default App;