import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [page, setPage] = useState(1);
  const [numberOfPage, setNumberOfPage] = useState(0);
  const [allData, setAllData] = useState<AppProps[]>([]);
  const [showModel, setShowModel] = useState(false);

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  const url = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`/api/posts?page=${page}`);
      setNumberOfPage(data.numberOfPages);
      setAllData(data.data);
    };
    fetchData();
  }, [page, url]);

  const addMessage = async () => {
    try {
      const oneItem = {
        title,
        message,
        createdAt: `${new Date()}`,
      };
      setAllData([oneItem, ...allData]);

      await axios.post(`/api/post/create`, oneItem);
      setShowModel(false);
      setMessage("");
      setTitle("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      {showModel && (
        <div
          style={{
            width: "600px",

            background: "#444",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px",
            padding: "50px",
          }}
        >
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
            style={{
              width: "50%",
              padding: "10px",
              border: "none",
              outline: "none",
              fontSize: "18px",
            }}
          />
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            placeholder="Message"
            style={{
              width: "50%",
              padding: "10px",
              border: "none",
              outline: "none",
              fontSize: "18px",
            }}
          />
          <button onClick={addMessage}>Submit</button>
        </div>
      )}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <button onClick={() => setShowModel((prev) => !prev)}>Add</button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          {allData.length &&
            allData.map((item: AppProps, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  margin: "10px",
                  alignItems: "center",
                  width: "200px",
                  padding: "20px",
                  border: "1px solid #ccc",
                  borderRadius: "10px",
                }}
              >
                <div>{item.title}</div>
                <span>{item.message}</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            ))}
        </div>

        <div
          style={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <button
            onClick={() => {
              if (page > 1) {
                setPage((prev) => prev - 1);
              }
            }}
          >
            Prev
          </button>
          <span>{page}</span>
          <button
            onClick={() => {
              if (numberOfPage > page) {
                setPage((prev) => prev + 1);
              }
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

interface AppProps {
  createdAt: string;
  creator?: string;
  id?: string;
  message: string;
  title: string;
}
