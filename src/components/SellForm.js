import React, { Component } from 'react'
import tokenLogo from '../logoC.png'
import ethLogo from '../Ethereum_logo_2014.svg.png'


class SellForm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <form className="mb-3" onSubmit={(event) => {
        event.preventDefault()
        let etherAmount
        etherAmount = this.input.value.toString()
        etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
        this.props.sellTokens(etherAmount)
      }}>
      <div>
        <label className="float-left mr-1"><b>Input</b></label>
          <span className="floot-right text-muted">
             Balance: {this.props.tokenBalance}
          </span>
      </div>
      <div className="input-group mb-4">
        <input
          type="text"
          onChange={(event) => {
            const tokenAmount = this.input.value.toString()
            this.setState({
              output: tokenAmount / 100
            })
          }}
          ref={(input) => { this.input = input }}
          className="form-control form-control-lg"
          placeholder="0"
          required />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={tokenLogo} height='32' alt=""/>
            &nbsp;&nbsp;&nbsp; WoB
          </div>
        </div>
      </div>
      <div>
        <label className="float-left"><b>Output</b></label>
  <span className="float-right text-muted">
    Balance: {this.props.ethBalance}
  </span>



      </div>
      <div className="input-group mb-2">
        <input
          type="text"
          className="form-control form-control-lg"
          placeholder="0"
          value={this.state.output}
          disabled
        />
        <div className="input-group-append">
          <div className="input-group-text">
            <img src={ethLogo} height='32' alt=""/>
            &nbsp; ETH
          </div>
        </div>
      </div>
      <div className="mb-5">
        <span className="float-left text-muted">Exchange Rate</span>
        <span className="float-right text-muted">1 Wob = 100 ETH</span>
      </div>
      <button type="submit" className="btn btn-info btn-block btn-lg">EXCHANGE!!</button>
    </form>
    );
  }
}


export default SellForm;
