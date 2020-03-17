import React from 'react';

const GlobalState = React.createContext();

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      selectedList: 'confirmed',
      listData: { 
        confirmed: [],
        deaths: [],
        recovered: []
      },
      center: [37.767554, -99.861025],
      zoomLevel: 5,
    };

    this.selectList = this.selectList.bind(this);
    this.loadConfirmed = this.loadConfirmed.bind(this);
    this.loadRecovered = this.loadRecovered.bind(this);
    this.loadDeath = this.loadDeath.bind(this);
    this.hasLoaded = this.hasLoaded.bind(this);
    this.setCenter = this.setCenter.bind(this);
    this.setZoomLevel = this.setZoomLevel.bind(this);

  }

  setCenter(coords) {
    this.setState({ center: coords });
  }

  selectList(listName) {
    if ( listName !== this.state.selectedList ) {
      this.setState({ selectedList: listName });
    }
  }

  loadConfirmed(confirmed) {
    this.setState((prevState) => ({
      listData: { ...prevState.listData, confirmed }
    }));
  }

  loadDeath(deaths) {
    this.setState((prevState) => ({
      listData: { ...prevState.listData, deaths }
    }));
  }

  loadRecovered(recovered) {
    this.setState((prevState) => ({
      listData: { ...prevState.listData, recovered }
    }));
  }

  hasLoaded() {
    this.setState({loaded: true});
  }

  setZoomLevel(value) {
    this.setState({
      zoomLevel: value
    });
  }

  render() {
    return (
      <GlobalState.Provider value={{
        ...this.state,
        selectList: this.selectList,
        loadConfirmed: this.loadConfirmed,
        loadDeath: this.loadDeath,
        loadRecovered: this.loadRecovered,
        hasLoaded: this.hasLoaded,
        setCenter: this.setCenter,
        setZoomLevel: this.setZoomLevel,
      }}> 
        { this.props.children }
      </GlobalState.Provider>
    );
  }
}

export { GlobalStateProvider, GlobalState };
