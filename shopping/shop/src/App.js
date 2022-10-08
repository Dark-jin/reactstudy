import './App.css';
import {Navbar,Container,Nav} from 'react-bootstrap';
import { useState } from 'react';
import data from './data.js';
import { Routes, Route , Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './routes/Detail';
import axios from 'axios';

function App() {

  let [items,setitems] = useState(data);
  let navigate = useNavigate();

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Choi Mart</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => {navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={() => {navigate('/detail')}}>Items</Nav.Link>
            <Nav.Link href="#cart">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path = "/" element={
          <>
            <div className='main-bg'></div>
            <div className='container'>
              <div className='row'>
                {
                  items.map((a,i)=>{
                    return(
                      <Card items={items[i]} i={i}></Card>
                    )
                  })
                }
              </div>
            </div>
            <button onClick={()=> {
              axios.get('http://192.168.0.10:8080/main/lecture') //https://codingapple1.github.io/shop/data2.json
              .then((결과)=>{
                let copy = [...items, ...결과.data];
                setitems(copy);
                console.log(결과.data)
              })
            }}>더보기</button>
          </>
        }/>
        <Route path = "/detail/:id" element={<Detail items={items}/>}/>
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className='col-md-4'>
        <img src= {'https://codingapple1.github.io/shop/shoes'+(props.i+1)+'.jpg'} width="80%"/>
        <h4>{props.items.title}</h4>
        <p>{props.items.price}원</p>
      </div>
  );
}

export default App;
