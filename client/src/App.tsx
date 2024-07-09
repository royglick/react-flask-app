import "./App.css";
import axios from "axios";
import P5LiquidWords from "./p5js/P5LiquidWords/P5LiquidWords";
import P5Paragraph from "./p5js/P5Paragraph/P5Paragraph";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from "./components/Portfolio";
import Contact from "./components/Contact";

switch (process.env.NODE_ENV) {
  case "production":
    axios.defaults.baseURL = "https://roy-glick.com";
    break;
  case "development":
    axios.defaults.baseURL = "http://localhost:5001";
    break;
}

const Home: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <div id="p5liquidiv">
        <P5LiquidWords width={window.innerWidth} height={740} />
      </div>
      <div id="p5sentencediv">
        <P5Paragraph width={window.innerWidth} height={300} />
      </div>
      <Portfolio />
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  );
}

/* <Routes>
<Route path="/" element={<App />}>
  <Route index element={<Home />} />
  <Route path="portfolio" element={<Portfolio />} />
  <Route path="detail/:id" element={<Detail />} />
  <Route path="contact" element={<Contact />} />
</Route>
<Route path="*" element={<NotFound />} />
</Routes> */
export default App;
