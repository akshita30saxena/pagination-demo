import { useEffect, useState } from "react";
import { APP_CONST } from "./constants/app.constant";
import { ENDPOINTS } from "./constants/endpoints.constant";

console.log(`${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS()}`);
async function getProducts() {
  const response = await fetch(
    `${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS()}`
  );
  const data = await response.json();
  return data;
}
function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  return (
    <>
      <div>Hello</div>
      <div>{}</div>
    </>
  );
}

export default App;
