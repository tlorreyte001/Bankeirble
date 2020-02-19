// Test React
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
};

// Test Drizzle
var App = {
  web3Provider: null,
  contracts: {},

  init : async function() {
    return await App.initWeb3();
  },

  initWeb3 : async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.enable();
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
    }

    const domContainer = document.getElementById('result');
    ReactDOM.render(e(LikeButton), domContainer);
    var web3 = new Web3(App.web3Provider);
  },
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
