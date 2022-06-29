import React from 'react'
import {Container, Row, Col, Card} from 'react-bootstrap';
import {Link} from "react-router-dom"

import img from '../image/main-img.jpg';


function Home() {
  return (

  <Container>
        <Row className='navbar'>
            <Col sm={8}>
                <h1 className="text-center mt-4 mb-4">Home Page</h1>
            </Col>
            <Col sm={4} className="column">
                <ul>
                    <li>
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
            <Card className='img'>
                <Card.Img variant="top" src={img} />
            </Card>
            </Col>
        
        </Row>
    </Container>
  )
}

export default Home