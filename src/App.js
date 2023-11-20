import './App.css';
import NavBar from './components/NavBar/NavBar';
import MainPage from './components/MainPage/MainPage';

function App() {
  return (
    <>
      <NavBar></NavBar>
      <container style={{ marginTop: '7%' }}>
        <MainPage></MainPage>
      </container>
    </>
  );
}

export default App;
