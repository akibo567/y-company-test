import React from "react";
import Graph from "./components/Graph"
import "./App.css";


const App = () => {
  return (
    <div className="App">

      <Graph
        graph_data={[3, 4, 5]}
      />
    </div>
  );
}

export default App;
