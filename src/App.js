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
    console.log('inputline', event)
    const {name, value} = event.target

    this.setState({
      [name]: value
    })
  }

  handleSubmit = () => {
    console.log("submit clicked")
    this.props.handleSubmit(this.state)

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
    console.log(datum, data)
    console.log([...data, datum])
    this.setState({data: [...data, datum]}, () => {
      console.log(this.state)
    })
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
