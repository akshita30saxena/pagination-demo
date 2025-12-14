import { useEffect, useState } from "react";
import { APP_CONST } from "./constants/app.constant";
import { ENDPOINTS } from "./constants/endpoints.constant";

//nextpage = limit * page_number.

console.log(`${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS(10, 0)}`);

async function getProducts(limit = 30, skip = 0) {
  const response = await fetch(
    `${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS(limit, skip)}`
  );
  const data = await response.json();
  return data;
}

function App() {
  const [isLoading, setisLoading] = useState(false);

  const [products, setProducts] = useState();
  const [limit, setLimit] = useState(50);
  const [skip, setSkip] = useState();
  const [total, setTotal] = useState();

  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    getProducts(limit, limit * pageNo).then((data) => {
      setProducts(data.products);
      setSkip(Number(data.skip));
      setTotal(Number(data.total));
    });
  }, [limit, pageNo]);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* <div>{JSON.stringify(products)}</div> */}

      <div>
        <ol>
          {products.map((product) => (
            <li value={product.id} key={product.id}>
              {product.title}
            </li>
          ))}
        </ol>
        <div>
          Showing {skip + 1} - {limit + skip > total ? total : limit + skip} of{" "}
          {total}
        </div>
        <div>
          <button
            onClick={() => setPageNo((prev) => prev - 1)}
            disabled={pageNo < 1 && isLoading}
          >
            Prev
          </button>
          <button
            onClick={() => setPageNo((prev) => prev + 1)}
            disabled={limit + skip > total && isLoading}
          >
            Next
          </button>
          <div>
            Page no. <strong>{pageNo + 1}</strong>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
