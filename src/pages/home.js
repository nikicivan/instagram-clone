import React, { useState, useEffect } from 'react';
import './home.css';
import Header from '../components/header/Header';
import Post from '../components/posts/Post';
import { auth } from '../firebase';
import { db } from '../firebase';
import ImageUpload from '../components/imageUpload/ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

const Home = () => {    
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [open, setOpen] = useState(false);
    const [openSignin, setOpenSignin] = useState(false);

    const signUp = (e) => {
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            return authUser.user.updateProfile({
                displayName: username
            });
        })
        .catch((error) => alert(error.message));
        setOpen(false);
    }; 

    const signin = (e) => {
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message))
        setOpenSignin(false);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if(authUser) {
                //user has logged in...
                //console.log(authUser);
                setUser(authUser);
            } else {
                // user has logged out...
                setUser(null);
            }
        });
        return () => {
            unsubscribe();
        }
    }, [user, username]);
    
    useEffect(() => {
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    return (
        <div className="home">                       
            <Header signUp={signUp} signin={signin} open={open} setOpen={setOpen} username={username} setUsername={setUsername} email={email} setEmail={setEmail} password={password} setPassword={setPassword} openSignin={openSignin} setOpenSignin={setOpenSignin} user={user}
            />    
            <div className="home__posts"> 
                <div className="home__postsLeft">
                    {posts.map(({id, post}) => (
                        <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} user={user}/> 
                    ))} 
                </div>
                <div className="home__postsRight">
                    <InstagramEmbed 
                        url='https://instagr.am/p/Zw9o4'
                        maxWidth={320}
                        hideCaption={false}
                        containerTagName='div'
                        protocol=''
                        injectScript
                        onLoading={() => {}}
                        onSuccess={() => {}}
                        onAfterRender={() => {}}
                        onFailure={() => {}}
                    />
                </div>                 
            </div>
            
            {user?.displayName ? (
                <ImageUpload username={user.displayName}/>
            ) : (
                <h3>Sorry, you need to login to upload.</h3>
            )}                                 
        </div>
    )
}

export default Home;
