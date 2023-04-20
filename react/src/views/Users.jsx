import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import axios from "axios";

export default function Users() {

  const [user, setUser] = useState([]);

  useState(() => {
    axiosClient.get('/user')
      .then(({data}) => {
        const userData = data;
        setUser(userData);
        console.log(userData);
      })
  });


  /*useEffect(() => {
    axiosClient.get('/user')
      .then((response) => setUser(response.data))
  }, []);

  console.log(user);*/

  return (
    <div>
      <table class="ms:table-fixed border-separate border-spacing-2 border border-slate-500">
      <caption class="caption-top">
        The data that our website stores of you.
      </caption>
        <thead>
          <tr>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Goal</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{user.name}</td>
            <td>{user.height} cm</td>
            <td>{user.weight} kg</td>
            <td>{user.age}</td>
            <td>{user.sex}</td>
            <td>{user.gain_or_lose} weight</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
