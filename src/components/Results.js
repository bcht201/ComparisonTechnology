import React from 'react';
import axios from 'axios';

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
        this.state.payload.elecResults.forEach( value => {
            order = this.sort(order, value)
        })
    }

    sort = (array, value) =>{
        
    }
    
    render(){
        if(this.state.payload === null){
            return(
                <h1>Loading...</h1>
            )
        }
        else{
            console.log("rendering:", this.state.payload.elecResults);
            return(
                <div class = "resultsContainer">
                    <ul>{
                        this.state.payload.elecResults.map(item => <li>{ item.name }</li>)
                        }
                    </ul>
                </div>
            )
        }
    }
}

export default Results