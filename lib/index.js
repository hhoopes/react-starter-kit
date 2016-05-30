const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

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
          <CreateGrudge/>
          <GrudgesList grudges={this.state.grudges}/>
        </header>
        <section className="main-content">
          <ActiveGrudge grudge={activeGrudge}/>
        </section>
      </div>
    );
  }
}

class CreateGrudge extends React.Component {
  constructor() {
    super();
    this.state = {
      jackalName: '',
      offense: '',
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
      <div className="CreateGrudge">
      <input className="CreateGrudge-jackalName"
              name="jackalName"
              placeholder="The Jackal's Name"
              value={this.state.jackalName}
              onChange={(e) => this.updateProperties(e)}
      />
      <textarea className="CreateGrudge-offense"
              name="offense"
              placeholder="Their Offense"
              value={this.state.offense}
              onChange={(e) => this.updateProperties(e)}
      />
      <input className="CreateGrudge-submit"
              type="submit"
              onClick={(e) => this.createGrudge(e)}
      />
      </div>
    );
  };
};

const GrudgesList = ({ grudges }) => {
  return (
    <div className="GrudgesList">
      {grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

const GrudgesListItem = ({ id, jackalName, offense, active, forgiven }) => {
  return (
    <div className={active ? 'GrudgesListItem is-active' : 'GrudgesListItem'}>
      <h3 className="GrudgesListItem-jackalName">{jackalName}</h3>
      <div className="GrudgesListItem-offense">{offense}</div>
      <div className="GrudgesListItem-buttons">
        <button onClick={() => store.select(id)}>Select</button>
        <button onClick={() => store.forgive(id)}>Forgive</button>
      </div>
    </div>
  );
};

const ActiveGrudge = ({ grudge}) => {
  if (!grudge) { return <p className="ActiveGrudge">Please select a grudge.</p>; }

  const updateGrudge = (e) => {
    const { name, value } = e.target;
    store.update(grudge.id, Object.assign(grudge, { [name]: value }));
  };
  return (
    <div className="ActiveGrudge">
      <input className="ActiveGrudge-jackalName"
            name="jackalName"
            value={grudge.jackalName}
            onChange={updateGrudge}
      />
      <input className="ActiveGrudge-offense"
            name="offense"
            value={grudge.offense}
            onChange={updateGrudge}
      />
    </div>
  );
};

ReactDOM.render(<GrudgeBin title="Grudge Bin"/>, document.querySelector('.application'));
