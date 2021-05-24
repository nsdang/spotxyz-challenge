import React from "react";
import "../App.css";
import { Circle } from "./circle";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import { useState, useEffect } from "react";

const NEW_USER = gql`
  mutation CreateUser($type: String!) {
    createUser(input: $type) {
      userId
      status
    }
  }
`;

const GET_USERS = gql`
  query {
    users {
      userId
      status
    }
  }
`;

export function CircleFlex({ useFirstRender, counter, setCounter }) {
  const [userList, setUserList] = useState([]);
  const [addUser] = useMutation(NEW_USER);

  //   const openerWindow = window;
  //   console.log(openerWindow);

  //   var timer = setInterval(function () {
  //     if (window.closed) {
  //       clearInterval(timer);
  //       alert("closed");
  //     }
  //   }, 1000);

  const isFirstRender = useFirstRender();
  if (isFirstRender) {
    let newCounter = (parseInt(counter) + 1).toString();
    setCounter(newCounter);
    addUser({ variables: { type: newCounter } });
  }



  const { data, loading, error } = useQuery(GET_USERS);
  if (loading) return <p>Loading ...</p>;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="flex-container">
      {data.users.map((u) => (
        <Circle user={u} />
      ))}
    </div>
  );
}
