import React from 'react';
import { Link ,Router, Routes, Route } from'react-router-dom';

function Login (){
    return(
        <div>
            <h1>Login</h1>
            <form>
                <label for="email">Email:</label>
                <input type="email" id="email" name="email" required />
                <label for="pwd">Password:</label>
                <input type="password" id="pwd" name="pwd" required />
                <input type="submit" value="Login" />
            </form>
        </div>
    )
}

export default Login;