import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from "react-router-dom"

import img from '../image/main-img.jpg';


function Home() {
  return (

  <Container>
        <Row className='navbar'>
            <Col sm={8}>
                <h1 className="main">Home Page</h1>
            </Col>
            <Col sm={4}>
                <ul>
                    <li className='home'>
                        <Link to="/">
                            <h3>Home</h3> 
                        </Link>
                    </li>
                    <li>
                        <Link to="/units">
                            <h3>Units</h3>
                        </Link>
                    </li>
                </ul>
            </Col>
        </Row>
        <Row>
            <Col sm>
            <Card>
                <Card.Img variant="top" src={img} />
            </Card>
            </Col>
        
        </Row>
    </Container>
  )
}

export default Home