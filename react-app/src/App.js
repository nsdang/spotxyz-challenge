import "./App.css";
import { Circle } from "./components/circle";
import {useState, useEffect} from "react";
//import { gql } from 'apollo-boost';

// import ApolloClient from 'apollo-boost';
// import { ApolloProvider } from '@apollo/react-hooks';

function App() {
  const [userList, setUserList] = useState([]);

  // const GET_USERS = gql`
  // `;

  useEffect(() => {

  });

  return (
    <div className="App">
      <div class="flex-container">
        <Circle />
        <Circle />
        <Circle />
      </div>
    </div>
  );
}

export default App;
