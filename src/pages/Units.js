import React, { useState } from "react";
import {Container, Row, Col} from 'react-bootstrap';
import {Link} from "react-router-dom"
import { useHistory} from "react-router-dom";

import unitsJSON from '../data/age-of-empires-units.json';


function Units() {

    const [age, setAge] = useState("All");
    const [checkCosts, setCheckCosts] = useState([false, false, false]);
    const [costs, setCosts] = useState([0,0,0]);
    const [units, setUnits] = useState(unitsJSON.units)
    let history = useHistory(); 

    let AgesFilter = (data) => {
        setAge(data);
        let filteredUnits;
        if(data === "All"){
            filteredUnits = unitsJSON.units;
        }else{
            filteredUnits = unitsJSON.units.filter(item => item.age === data);
        } 
        /*setUnits(filteredUnits);*/
        setUnits(CostsFilter(filteredUnits))

    }

    let CostsFilter = (data) => {
        let filteredUnits = data.filter((unit) => {
            if(!unit.cost){
                return unit;
            }else{
                let filter = true;
                if(checkCosts[0]){
                    filter = filter && (unit.cost.Wood === undefined || unit.cost.Wood <= costs[0]);
                }

                if(checkCosts[1]){
                    filter = filter && (unit.cost.Food === undefined || unit.cost.Food <= costs[1]);
                }

                if(checkCosts[2]){
                    filter = filter && (unit.cost.Gold === undefined || unit.cost.Gold <= costs[2]);
                }

                if(filter){
                    return unit;                    
                }else{
                    return null;
                }
            }
        } )
        return filteredUnits;
    }

    let checkedResource = (index) => {
        let checks = checkCosts;
        checks[index] = !checks[index];
        setCheckCosts(checks);
        AgesFilter(age);
     }

    let changeResource = (e, index) => {
        let c = costs;
        c[index] = e.target.value;
        setCosts(c);
        AgesFilter(age);
    }

    let costRender = (item) => {
        let str = '';

        if(item === null){
            return str;
        }

        if(item.Wood){
            str += `Wood: ${item.Wood} `;
        }

        if(item.Food){
            str += `Food: ${item.Food} `;
        }

        if(item.Gold){
            str += `Gold: ${item.Gold}`;
        }

        return str;
    }

    const RangeInput = ({ check, value, name, checkedResource, changeResource }) => {
        return (
            <div className="row mt-5">
                <div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                    <input id={`checked${name}`} type="checkbox"  defaultChecked={check} onChange={checkedResource} />
                    <label className="px-4" htmlFor={`checked${name}`}><b>{name}</b></label>
                    <input type="range" disabled={!check} onChange={changeResource} value={value} className="w-50" min="0" max="200" />
                    <span>{value}</span>
                </div>
            </div>
        )
    }
    

    const UnitRow = ({ item, c }) => {
        return (
            <tr onClick={(e) => routeChange(item.id)}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.age}</td>
                <td>{c}</td>
            </tr>
        )
    }
    
    const routeChange = (id) =>{ 
        history.push(`/unitdetail/${id}`);
    }

  return (
    <Container>
        <Row>
            <Col sm={8}>
                <h1 className="text-center mt-4 mb-4">Units</h1>
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
        <Row>
            <Col sm>
            <h2 className="sub-header">Ages</h2>
            <div className="unit-row mt-4">
                {
                    ['All', 'Dark', 'Feudal', 'Castle', 'Imperial'].map((item, index) => {
                        return (
                            <button
                                key={index}
                                className={item === {age} ? "active" : null}
                                onClick={() => AgesFilter(item)}>
                                {item}
                            </button>
                        )
                    })
                }

            </div>

       
            </Col>
        </Row>
        <Row>
            <Col sm>
                <h2>Costs</h2>
                <RangeInput 
                    name={'Wood'}
                    checkedResource={(e) => checkedResource(0)}
                    changeResource={(e) => changeResource(e, 0)}
                    value={costs[0]}
                    check={checkCosts[0]}
                    />
                <RangeInput 
                    name={'Food'}
                    checkedResource={(e) => checkedResource(1)}
                    changeResource={(e) => changeResource(e, 1)}
                    value={costs[1]}
                    check={checkCosts[1]}
                    />
                <RangeInput 
                    name={'Gold'}
                    checkedResource={(e) => checkedResource(2)}
                    changeResource={(e) => changeResource(e, 2)}
                    value={costs[2]}
                    check={checkCosts[2]}
                    />    
            </Col>
        </Row>

        <Row>
            <Col sm>
                <h2>Table</h2>
                <table className="mt-4 table table-bordered text-center table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Costs</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            units.map((item, index) => {
                                return (
                                    <UnitRow
                                        key={item.id}
                                        item={item}
                                        index={index}
                                        c={costRender(item.cost)}
                                    />
                                )

                            })
                        }
                    </tbody>
                </table>
            </Col>
        </Row>
    </Container>
  )
}

export default Units