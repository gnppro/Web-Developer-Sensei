import { useEffect, useState, useRef } from "react";
import useIntersectionObserver from "../hooks/useIntersectionObserver";
import Items from "../containers/Items";
import Loader from "../components/Loader/Loader";
import status from "../constants/status";
import "./App.css";

const { IDLE, SUCCESS, FAILURE, LOADING } = status;

const API_URL = "https://api.fbi.gov/wanted/v1/list";

function App() {
  const ref = useRef();
  const onScreen = useIntersectionObserver(ref);
  const [data, setData] = useState({});
  const [allItems, setAllItems] = useState([]);
  const [status, setStatus] = useState(IDLE);
  const { total, page } = data || {};
  const hasMore = page < total;

  const cleanup = () => {};

  useEffect(() => {
    getData(page + 1);
    return cleanup();
  }, []);

  useEffect(() => {
    if (hasMore && onScreen) getData(page + 1);
  }, [onScreen]);

  const getData = (page) => {
    setStatus(LOADING);
    fetch(`${API_URL}?page=${page}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setAllItems((prevItems) => [...prevItems, ...data.items]);
        setStatus(SUCCESS);
      })
      .catch((error) => {
        setStatus(FAILURE);
      });
  };

  const renderData = () => {
    switch (status) {
      case IDLE:
        return;
      case LOADING:
        return (
          <div className="Loader-Container">
            <Loader />
          </div>
        );
      case SUCCESS:
        return <Items items={allItems} />;
      case FAILURE:
        return <p>Error</p>;
      default:
        return null;
    }
  };

  return (
    <div className="App">
      <h1 style={{ textAlign: "center" }}>FBI - MOST WANTED</h1>
      {renderData()}
      <div ref={ref} style={{ display: "flex", justifyContent: "center" }}>
        {/* {status === LOADING && allItems.length > 0 && <Loader />} */}
      </div>
    </div>
  );
}

export default App;
