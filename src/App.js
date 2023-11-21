import './App.css';
import NavBar from './components/NavBar/NavBar';
// import MainPage from './components/MainPage/MainPage';
import { Button, Card, CircularProgress, Container, CardMedia, Grid, useMediaQuery } from '@material-ui/core'

function App() {
  return (
    <>
      <NavBar></NavBar>
      <Container style={{ marginTop: '7%' }}>
        {/* <MainPage></MainPage> */}
        <Grid>
          <Card></Card>
          <CardMedia></CardMedia>
          <Button></Button>
        </Grid>
      </Container>
    </>
  );
}

export default App;
