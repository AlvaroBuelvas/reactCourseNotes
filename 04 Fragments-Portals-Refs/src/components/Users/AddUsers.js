import React, { useState, useRef } from "react";
import Card from '../UI/Card'
import Button from '../UI/Button'
import classes from './AddUser.module.css'
import ErrorModal from "../UI/ErrorModal";
import Wrapper from '../Helpers/Wrapper'

const AddUser = props => {
    const nameInputRef = useRef();
    const ageInputRef = useRef();
    
    const [error, setError] = useState()

    const closeModalHandler = () => {
        setError(undefined)
    }

    const AddUserHandler = (event) => {
        event.preventDefault();
        const enteredName = nameInputRef.current.value;
        const enteredUserAge = ageInputRef.current.value;
        if (enteredName.trim().length === 0 || enteredUserAge.trim().length === 0) {
            setError({ 
                title: 'Empty Field Warning',
                message: 'Username and Age fields cannot be empty. Please enter a value'
            })
            return
        }
        if (+enteredUserAge < 1) {
            setError({
                title: 'Invalid Age Value',
                message: 'Age cannot be less than 1. Please enter a valid age'
            })
            return
        }

        props.onAddUser({
            name: enteredName,
            age: enteredUserAge,
            key: Math.random().toString()
        })
        nameInputRef.current.value= '';
        ageInputRef.current.value= '';
    }

    return (
        <Wrapper>
            {error &&  <ErrorModal onCloseModal={closeModalHandler} title={error.title} message={error.message}/>}
           <Card className={classes.input}>
                <form onSubmit={AddUserHandler}>
                    <label htmlFor="username">Username</label>
                    <input 
                        id="username" 
                        type="text" 
                        ref={nameInputRef}
                    />
                    <label htmlFor="age">Age (Years)</label>
                    <input 
                        id="age" 
                        type="number" 
                        ref={ageInputRef}
                    />
                    <Button type="submit">Add User</Button>
                </form>
            </Card>            
        </Wrapper>
                
    )
};

export default AddUser;