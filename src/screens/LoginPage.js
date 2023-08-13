import React from 'react';
import noUserPic from '../resources/profile-user.png';
import '../styles/MyLibraryPage.css';

function LoginPage() {
  return (
    <>
    <section id="loginPage">
        <div id="noUserContainer">
            <div id="noUserPicContainer">
                <img id="noUserPic" src={noUserPic} />
            </div>
            <div id="noUserTextContainer">
                Login now to access your library
            </div>
            <div id="buttonContainer">
                <button id="loginLibraryButton">Log in</button>
                <button id="createLibraryButton">Create account</button>
            </div>
        </div>
    </section>
    </>
  )
}

export default LoginPage;