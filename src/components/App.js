import React, { Component } from 'react'
import Web3 from 'web3'
import './App.css'
import Token from '../abis/Token.json'
import EhtSwap from '../abis/EhtSwap.json'
import Navbar from './Navbar'
import Main from './Main'


class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    const ehtBalance = await web3.eth.getBalance(this.state.account)
    this.setState({ ehtBalance })


    const networkId = await web3.eth.net.getId()
    const tokenData = Token.networks[networkId]
    if(tokenData) {
      const token = new web3.eth.Contract(Token.abi, tokenData.address)
      this.setState({ token })
      let tokenBalance = await token.methods.balanceOf(this.state.account).call()
      this.setState({ tokenBalance: tokenBalance.toString() })

    } else {
      window.alert('Token contract not depoloyed to detected network')
    }



    const ehtSwapData = EhtSwap.networks[networkId]
    if(ehtSwapData) {
      const ehtSwap = new web3.eth.Contract(EhtSwap.abi, ehtSwapData.address)
      this.setState({ ehtSwap })
      // this.setState({ ehtBalance: ehtBalance.toString() })

    } else {
      window.alert('EthSwap contract not depoloyed to detected network')
    }

  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }

    this.setState({loading: false})

  }

   constructor(props) {
    super(props)
    this.state = {
      account: '',
      token: {},
      ehtSwap: {},
      ehtBalance: '0',
      tokenBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    }
    else {
      content = <Main
        ehtBalance={this.state.ehtBalance}
        tokenBalance={this.state.tokenBalance}/>
    }

    return (
      <div>
        <Navbar account={this.state.account}/>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px'}}>
              <div className="content mr-auto ml-auto">
              <Main />
              {content}
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}


export default App;
