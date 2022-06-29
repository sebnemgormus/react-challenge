import React from "react";
import {Container, Row, Col} from 'react-bootstrap';
import  {useLocation, Link} from "react-router-dom";
import unitsJSON from '../data/age-of-empires-units.json';


function UnitDetail(){
    const location = useLocation();
    console.log(location.pathname)
    let n = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
    let unit = unitsJSON.units.filter(item => item.id === parseInt(n));
    console.log(unit)

    

    let generateTableData = (data) => {
        var val = [];
        val.push(['ID:', data.id]);
        val.push(['Name:', data.name]);
        val.push(['Description:', data.description]);
        val.push(['Min. Required Age:', data.age]);
        val.push(['Wood Cost:', data.cost === null? '' : data.cost.Wood === undefined ? '' : data.cost.Wood]);
        val.push(['Food Cost', data.cost === null? '' : data.cost.Food === undefined ? '' : data.cost.Food]);
        val.push(['Gold Cost', data.cost === null? '' : data.cost.Gold === undefined ? '' : data.cost.Gold]);
        val.push(['Build time:', data.build_time]);
        val.push(['Reload time:', data.reload_time]);
        val.push(['Hit Points:', data.hit_points]);
        val.push(['Attack', data.attack]);
        val.push(['Accuracy', data.accuracy]);


        return val;
    }

    console.log(generateTableData(unit[0]))

        return(
        <Container>
        <Row>
            <Col sm={8}>
                <h1 className="text-center mt-4 mb-4">Unit Details</h1>
            </Col>
            <Col sm={4} className="">
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
        <table className="table table-bordered mt-4">
            <tbody>
            {generateTableData(unit[0]).map((item, index) => {
                return (
                    <tr key={index}>
                        <td style={{ width: "150px" }}>{item[0]}</td>
                        <td>{item[1]}</td>
                </tr>)
                })
            }
        </tbody>
        </table>
        </Container>
        )
   

}

export default UnitDetail