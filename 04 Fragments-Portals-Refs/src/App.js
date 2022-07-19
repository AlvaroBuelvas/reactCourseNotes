import React, { useState, Fragment } from 'react';
import AddUser from './components/Users/AddUsers'
import UsersList from './components/Users/UsersList';

const initialUsers = [
  {name: 'Tania', age: 34, key: '1'},
  {name: 'Daniel', age: 2, key: '2'}
]

function App() {
  const [usersList, setUsersList] = useState(initialUsers)

  const addNewUser = (user) => {
    setUsersList(prevUsers => [...prevUsers, user])
  }

  return (
    <Fragment>
      <AddUser onAddUser={addNewUser}/>
      <UsersList users={usersList}/>
    </Fragment>
  );
}

export default App;
