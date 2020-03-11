import React from 'react';

const GlobalState = React.createContext();

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      selectedList: 'confirmed',
      listData: null,
      center: [18.4861, -69.98857]
    };
    this.selectList = this.selectList.bind(this);
    this.loadData = this.loadData.bind(this);
    this.setCenter = this.setCenter.bind(this);
  }

  setCenter(coords) {
    this.setState({ center: coords });
  }

  selectList(listName) {
    if ( listName !== this.state.selectedList ) {
      this.setState({ selectedList: listName, loaded: false });
    }
  }

  loadData(data) {
    this.setState({
      listData: data,
      loaded: true
    });
  }

  render() {
    return (
      <GlobalState.Provider value={{
        ...this.state,
        selectList: this.selectList,
        loadData: this.loadData,
        setCenter: this.setCenter
      }}> 
        { this.props.children }
      </GlobalState.Provider>
    );
  }
}

export { GlobalStateProvider, GlobalState };
