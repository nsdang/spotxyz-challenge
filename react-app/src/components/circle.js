import React from "react";
import "../App.css";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";


const GET_USERS = gql`
  query {
    users {
      userId
      status
    }
  }
`;

export function Circle(userInfo) {
  return (
    <div>
      <h2>Client {userInfo.user.userId}</h2>
      <p>{userInfo.user.status}</p>
    </div>
  );
}
