import './App.css';
import {useAuthState} from 'react-firebase-hooks/auth'
import SignIn from './signIn';
import Chat from './chat';
import auth from './firebase';

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
      {
        user ? <Chat /> : <SignIn />
      }
    </>
  );
}

export default App;
