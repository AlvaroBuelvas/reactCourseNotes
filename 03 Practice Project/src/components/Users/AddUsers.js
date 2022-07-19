import React, { useState } from "react";
import Card from "../UI/Card";
import Button from "../UI/Button";
import classes from "./AddUser.module.css";
import ErrorModal from "../UI/ErrorModal";
import Wrapper from "../Helper/Wrapper"

const AddUser = (props) => {
  const [enteredUsername, setEnteredUsername] = useState("");
  const [enteredAge, setEnteredAge] = useState("");
  const [error, setError] = useState();

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value);
  };

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value);
  };

  const closeModalHandler = () => {
    setError(undefined);
  };

  const AddUserHandler = (event) => {
    event.preventDefault();
    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: "Empty Field Warning",
        message:
          "Username and Age fields cannot be empty. Please enter a value",
      });
      return;
    }
    if (+enteredAge < 1) {
      setError({
        title: "Invalid Age Value",
        message: "Age cannot be less than 1. Please enter a valid age",
      });
      return;
    }

    props.onAddUser({
      name: enteredUsername,
      age: enteredAge,
      key: Math.random().toString(),
    });
    setEnteredUsername("");
    setEnteredAge("");
  };

  return (
    <div>
      {error && (
        <ErrorModal
          onCloseModal={closeModalHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={AddUserHandler}>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={enteredUsername}
            onChange={usernameChangeHandler}
          />
          <label htmlFor="age">Age (Years)</label>
          <input
            id="age"
            type="number"
            value={enteredAge}
            onChange={ageChangeHandler}
          />
          <Button type="submit">Add User</Button>
        </form>
      </Card>
    </div>
  );
};

export default AddUser;
