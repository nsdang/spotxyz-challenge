import "./App.css";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { CircleFlex } from "./components/circleFlex";
import { useState, useEffect, useRef } from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
});

// function useCrossTabState(stateKey, defaultValue) {
//   const [state, setState] = useState(defaultValue);
//   const isNewSession = useRef(true);

//   useEffect(() => {
//     if (isNewSession.current) {
//       const currentState = localStorage.getItem(stateKey);
//       if (currentState) {
//         setState(JSON.parse(currentState));
//       } else {
//         setState(defaultValue);
//       }
//       isNewSession.current = false;
//       return;
//     }
//     try {
//       localStorage.setItem(stateKey, JSON.stringify(state));
//     } catch (error) {}
//   }, [state, stateKey, defaultValue]);

//   useEffect(() => {
//     const onReceieveMessage = (e) => {
//       const { key, newValue } = e;
//       if (key === stateKey) {
//         setState(JSON.parse(newValue));
//       }
//     };
//     window.addEventListener("storage", onReceieveMessage);
//     return () => window.removeEventListener("storage", onReceieveMessage);
//   }, [stateKey, setState]);
//   return [state, setState];
// }

function tabLoadEventHandler() {
  let hash = "tab_" + +new Date();
  sessionStorage.setItem("TabHash", hash);
  let tabs = JSON.parse(localStorage.getItem("TabsOpen") || "{}");
  tabs[hash] = true;
  localStorage.setItem("TabsOpen", JSON.stringify(tabs));
}
function tabUnloadEventHandler() {
  let hash = sessionStorage.getItem("TabHash");
  let tabs = JSON.parse(localStorage.getItem("TabsOpen") || "{}");
  delete tabs[hash];
  localStorage.setItem("TabsOpen", JSON.stringify(tabs));
}

function App() {
  const [users, setUsers] = useState();

  const useFirstRender = () => {
    const ref = useRef(true);
    const firstRender = ref.current;
    ref.current = false;
    return firstRender;
  };

  // const [counter, setCounter] = useCrossTabState("counter", "0");
  // const isFirstRender = useFirstRender();

  // if (isFirstRender) {
  //   const currentVal = localStorage.getItem("counter");
  //   if (currentVal) {
  //     var val = Number(currentVal);
  //     localStorage.setItem("counter", val + 1);
  //   } else {
  //     localStorage.setItem("counter", 0);
  //   }
  // }

  window.addEventListener(
    "load",
    function () {
      // const currentVal = localStorage.getItem("counter");
      // if (currentVal) {
      //   var val = Number(currentVal);
      //   localStorage.setItem("counter", val + 1/2);
      // } else {
      //   localStorage.setItem("counter", 0);
      // }
      tabLoadEventHandler();
      setUsers(Object.keys(
        JSON.parse(localStorage.getItem("TabsOpen") || "{}")
      ).length)
    },
    false
  );
  window.addEventListener(
    "unload",
    function () {
      tabUnloadEventHandler();
    },
    false
  );

  let tabsCount = Object.keys(
    JSON.parse(localStorage.getItem("TabsOpen") || "{}")
  ).length;

  // localStorage.clear()

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <CircleFlex useFirstRender={useFirstRender} />
        {/* <CircleFlex useFirstRender={useFirstRender} counter={counter} setCounter={setCounter}/> */}
      </div>
    </ApolloProvider>
  );
}

export default App;
