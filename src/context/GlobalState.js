import React from 'react';

const GlobalState = React.createContext();

class GlobalStateProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
      selectedList: 'confirmed',
      listData: null
    };
    this.selectList = this.selectList.bind(this);
    this.loadData = this.loadData.bind(this);
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
        loadData: this.loadData
      }}> 
        { this.props.children }
      </GlobalState.Provider>
    );
  }
}

export { GlobalStateProvider, GlobalState };
