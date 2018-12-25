import React, { Component } from 'react'
import './App.css'
import ReactTable from 'react-table'
import 'react-table/react-table.css'

class InputDate extends React.Component {
  handleChange = event => {
    this.props.handleChange({
      'target': {
        'name': 'day',
        'value': parseInt(event.target.value)
      }
    })
  }

  getOptionDays = () => {
    let days = 31
    let options = new Array()
    for (let i = 1; i <= days; i++) {
      options.push(<option key={i} value={i}>{i}</option>)
    }
    return options
  }

  render() {
    const { day } = this.props

    return (
      <select 
        name="day"
        value={day}
        onChange={this.handleChange} >
        {this.getOptionDays()}
      </select>
    )
  }
}

class InputButton extends React.Component {
  render() {
    return (
      <button onClick={this.props.addInput}>입력</button>
    )
  }
}

class InputLine extends React.Component {
  constructor(props) {
      super(props)

      this.initialState = {
        day: new Date().getDate(),
        amount: 0,
        ioType: 'o'
      }

      this.state = this.initialState
  }

  handleChange = event => {
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    let validate = this.ValidateInputs();
    
    if (validate) {
      this.props.handleSubmit(this.state)
    }
  }

  ValidateInputs() {
    let validate = true;
    const state = this.state
    
    // each keys
    state['amount'] = state['amount'] === '' ? 0 : state['amount']
    state['day'] = state['day'] < 1 ? 1 : 
                  state['day'] > 31 ? 31 : state['day']
    state['ioType'] = state['ioType'] === 'i' ? 'i' :
                      state['ioType'] === 'o' ? 'o' : 'E'

    // else
    Object.keys(state).map((key, index) => {
      console.log(key, state[key]);
      if (state[key] === '' || typeof(state[key]) === "undefined") {
        alert("값을 입력해주세요.");
        validate = false;
      }
    });

    return validate;
  }

  render() {
    const { day, amount, ioType } = this.state

    return (
      <div className="InputLine">
        <InputDate 
          day={day}
          handleChange={this.handleChange}
        />
        <input 
          type="number" 
          name="amount" 
          value={amount}
          min="0" 
          placeholder="금액을 입력하세요." 
          onChange={this.handleChange} />
        <select 
          name="ioType"
          value={ioType}
          onChange={this.handleChange}>
          <option value="i">수입</option>
          <option value="o">지출</option>
        </select>
        <InputButton addInput={this.handleSubmit} />
      </div>
    )
  }
}

class ViewTable extends React.Component {
  render() {
    const { data, columns } = this.props

    return (
      <div className="TableWrapper">
        <ReactTable
          data={data}
          columns={columns}
        />
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [{
        day: 1,
        amount: 20000,
        ioType: 'o'
      }, {
        day: 3,
        amount: 13000,
        ioType: 'o'
      }],
      columns: [{
        Header: '며칠',
        accessor: 'day'
      }, {
        Header: '금액',
        accessor: 'amount'
      }, {
        Header: '타입',
        accessor: 'ioType'
      }]
    }
  }

  handleSubmit = datum => {
    const {data} = this.state;
    this.setState({ data: [...data, datum] })
  }

  render() {

    const {data} = this.state;
    const {columns} = this.state;

    return (
      <div className="App">
        <InputLine 
          handleSubmit={this.handleSubmit}
        />
        <ViewTable 
          data={data}
          columns={columns}
        />
      </div>
    );
  }
}

export default App
