import React, { Component } from 'react'
import tokenLogo from '../logoC.png'
import ethLogo from '../Ethereum_logo_2014.svg.png'


class Main extends Component {

  constructor(props) {
    super(props)
    this.state = {
      output: '0'
    }
  }

  render() {
    return (
      <div id="content">

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
              event.preventDefault()
              let etherAmount
              etherAmount = this.input.value.toString()
              etherAmount = window.web3.utils.toWei(etherAmount, 'Ether')
              this.props.buyTokens(etherAmount)
            }}>
            <div>
              <label className="float-left mr-1"><b>Input</b></label>
                <span className="floot-right text-muted">
                   Balance: {this.props.ehtBalance}
                </span>
            </div>
            <div className="input-group mb-4">
              <input
                type="text"
                onChange={(event) => {
                  const etherAmount = this.input.value.toString()
                  this.setState({
                    output: etherAmount * 100
                  })
                }}
                ref={(input) => { this.input = input }}
                className="form-control form-control-lg"
                placeholder="0"
                required />
              <div className="input-group-append">
                <div className="input-group-text">
                  <img src={ethLogo} height='32' alt=""/>
                  &nbsp;&nbsp;&nbsp; ETH
                </div>
              </div>
            </div>
            <div>
              <label className="float-left"><b>Output</b></label>




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
                  <img src={tokenLogo} height='32' alt=""/>
                  &nbsp; WoB
                </div>
              </div>
            </div>
            <div className="mb-5">
              <span className="float-left text-muted">Exchange Rate</span>
              <span className="float-right text-muted">1 ETH = 100 Wob</span>
            </div>
            <button type="submit" className="btn btn-info btn-block btn-lg">EXCHANGE!!</button>
          </form>

          </div>

        </div>

      </div>
    );
  }
}


export default Main;
