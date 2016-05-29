const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store')

class GrudgeBin extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all(),
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render() {
    const activeGrudge = this.state.grudges.find(grudge => grudge.active);

    return (
      <div className="GrungeBin">
        <header>
          <h1>{this.props.title}</h1>
        </header>
      </div>
    );
  }

  class GrudgeBin extends React.Compononent {
    constructor() {
      super();
      this.state = {
        jackalName: '';
        offense: '';
      };
    }

    updateProperties(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    createGrudge(e) {
      e.preventDefault();
      store.create(this.state);
      this.setState({ jackalName: '', offense: '' });
    }

    render() {
      return (
        
      )
    }
  }


}

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
