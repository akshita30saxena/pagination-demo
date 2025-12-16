import { useState } from "react";
import { APP_CONST } from "./constants/app.constant";
import { ENDPOINTS } from "./constants/endpoints.constant";
import { useProducts } from "./hooks/use-products";

//nextpage = limit * page_number.

console.log(`${APP_CONST.API_URL()}${ENDPOINTS.GET_PRODUCTS(10, 0)}`);

function App() {
  // const [products, setProducts] = useState();
  const [limit, setLimit] = useState(10);
  const [pageNo, setPageNo] = useState(0);

  const { products, total, isPending, error } = useProducts(
    limit,
    limit * pageNo
  );

  if (isPending) return <div>Loaidng...</div>;
  if (error)
    return (
      <div>
        Error: <pre>{JSON.stringify(error)}</pre>
      </div>
    );
  if (!products) return <div>No products found</div>;

  return (
    <>
      <div>
        <ol>
          {products?.map((product) => (
            <li value={product.id} key={product.id}>
              {product.title}
            </li>
          ))}
        </ol>
        <div>
          Showing {limit * pageNo + 1} -{" "}
          {limit + limit * pageNo > total ? total : limit + limit * pageNo} of{" "}
          {total}
        </div>
        <div>
          <button
            onClick={() => setPageNo((prev) => prev - 1)}
            disabled={pageNo < 1 || isPending}
          >
            Prev
          </button>
          <button
            onClick={() => setPageNo((prev) => prev + 1)}
            disabled={limit + limit * pageNo > total || isPending}
          >
            Next
          </button>
          <div>
            Page no. <strong>{pageNo + 1}</strong>
          </div>
          {isPending && <div>loading..</div>}
        </div>
        <div>
          <button onClick={() => setLimit(10)}>10</button>
          <button onClick={() => setLimit(25)}>25</button>
          <button onClick={() => setLimit(50)}>50</button>
        </div>
      </div>
    </>
  );
}

export default App;
