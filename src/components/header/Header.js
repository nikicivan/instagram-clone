import React, { useState } from 'react'
import './header.css';

import { auth } from '../../firebase';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';


function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
}));

const Header = ({signUp, signin, open, setOpen, username, setUsername, email, setEmail, password, setPassword, openSignin, setOpenSignin, user}) => {
    
    const classes = useStyles();
    const [modalStyle] = useState(getModalStyle); 
   

    return (
        <div className="header">
            <img className="header__image" src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="logo"/>
        
        <Modal
            open={open}
            onClose={() => setOpen(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <form className="header__signUp">
                    <center>
                        <img 
                            className="header__signUpImage"
                            src="https://i.pinimg.com/originals/76/00/8b/76008bb9685d410d47fe1fa01dc54f15.jpg"
                            alt="instagram_logo"
                        />
                    </center>
                    <Input 
                        placeholder="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input 
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signUp}>Signup</Button>
                </form>
                               
            </div>
        </Modal>
        <Modal
            open={openSignin}
            onClose={() => setOpenSignin(false)}
        >
            <div style={modalStyle} className={classes.paper}>
                <form className="header__signUp">
                    <center>
                        <img 
                            className="header__signUpImage"
                            src="https://i.pinimg.com/originals/76/00/8b/76008bb9685d410d47fe1fa01dc54f15.jpg"
                            alt="instagram_logo"
                        />
                    </center>                    
                    <Input 
                        placeholder="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input 
                        placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button type="submit" onClick={signin}>Sign In</Button>
                </form>
                               
            </div>
        </Modal>
        {user ? (
            <Button onClick={() => auth.signOut()}>Log out</Button>
        ): (
            <div className="header__loginContainer">
            <Button onClick={() => setOpenSignin(true)}>Sign In</Button>
            <Button onClick={() => setOpen(true)}>Sign up</Button>
            </div>
        )}
        
        </div>
    )
}

export default Header;
