const EventEmitter = require('events');
let grudges = [];

const store = new EventEmitter();

const storedGrudges = localStorage.getItem('grudges');
if (storedGrudges) { grudges = JSON.parse(storedGrudges); }

store.all = () => grudges.concat([]);

// store.count = () => store.length();

store.create = ({ jackalName, offense }) => {
  grudges = grudges.concat({ jackalName, offense, forgiven: false, active: false, id: Date.now() });
  store.emit('change', grudges);
};

store.forgive = (id) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, { forgiven: grudge.id === id });
  });
  store.emit('change', grudges);
};

store.update = (id, data) => {
  grudges = grudges.map(grudge => {
    if (grudge.id !== id) { return grudge; }
    return Object.assign(grudge, data);
  });
  store.emit('change', grudges);
};

store.select = (id) => {
  grudges = grudges.map(grudge => Object.assign(grudge, { active: grudge.id === id }));
  store.emit('change', grudges);
};

store.deselect = () => {
  grudges = grudges.map(grudge => Object.assign(grudge, { active: grudge.id === false }));
};

store.forgiven = () => grudges.filter(grudge => grudge.forgiven === true).length;

store.unforgiven = () => grudges.filter(grudge => grudge.forgiven === false).length;


store.on('change', () => {
  localStorage.setItem('grudges', JSON.stringify(grudges));
});

module.exports = store;
