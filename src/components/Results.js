import React from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown'

class Results extends React.Component{
    constructor(props){
        super(props);
        this.state = {
          payload: null
        }
    }

    componentDidMount = () =>{
        axios.get('https://demo.staging.energyhelpline-aws.com/api/results/e5cd18d9-dfe0-4dd2-b0d7-ab6d00fce188')
        .then(response =>{
            console.log(response);
            this.setState({ payload: response.data })
        })
    }

    sorting = () =>{
        let order = [];
        this.state.payload.elecResults.forEach((value) => {
            order = this.sort(order, value)
        })
        return order;
    }

    sort = (array, value) =>{
        let temp = array;
        temp.unshift(value);
        if(temp.length > 1){
            let iterationIndex = 0;
            while(iterationIndex < temp.length - 1){
                if(temp[iterationIndex].expectedAnnualSpend > temp[iterationIndex + 1].expectedAnnualSpend){
                    let placeholder = temp[iterationIndex];
                    temp[iterationIndex] = temp[iterationIndex + 1];
                    temp[iterationIndex + 1] = placeholder;
                }
                iterationIndex += 1;
            }
        }
        return temp
    }

    filterPaymentMethod = () =>{ 
        let paymentMethods = [];
        this.state.payload.elecResults.forEach((value) => {
            paymentMethods.push(value.paymentMethod)
        })
        let unique = [...new Set(paymentMethods)];
        return unique;
    }
    
    render(){
        if(this.state.payload === null){
            return(
                <h1>Loading...</h1>
            )
        }
        else{
            console.log(this.filterPaymentMethod());
            return(
                <div class = "resultsContainer">
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Dropdown Button
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            {/* { this.filterPaymentMethod().forEach((paymentMethod) =>{
                                return <Dropdown.Item href="">{paymentMethod}</Dropdown.Item>
                            })} */}
                            { this.filterPaymentMethod().map((paymentMethod) =>{
                                return <Dropdown.Item href="">{paymentMethod}</Dropdown.Item>
                            })}
                        </Dropdown.Menu>
                    </Dropdown>
                    <ul>{
                        this.sorting().map(item => <li>{ item.name }</li>)
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default Results