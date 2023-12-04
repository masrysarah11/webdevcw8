import React, { Component } from 'react';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import List from './List';

class FilteredList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: "",
      type: "ALL"
    };
  }

  // Sets the state whenever the user types on the search bar
  onSearch = (event) => {
    this.setState({ search: event.target.value.trim().toLowerCase() });
  }

  onTypeSelect = (event) => {
    // Convert event key to uppercase for consistency
    const selectedType = event.toUpperCase();
    this.setState({ type: selectedType });
  }

  // Change filterItem to take into account the "type" state variable when filtering
  filterItem = (item) => {
    const { search, type } = this.state;

    if (type === "ALL" || type === "All") {
      return item.name.toLowerCase().search(search) !== -1;
    } else {
      return (
        item.name.toLowerCase().search(search) !== -1 &&
        item.type.toUpperCase() === type
      );
    }
  }

  render() {
    return (
      <div className="filter-list">
        <h1>Produce Search</h1>
        <DropdownButton id="typeDropdown" title={"Produce Type"} onSelect={this.onTypeSelect}>
          <Dropdown.Item eventKey="ALL">All</Dropdown.Item> <br></br>
          <Dropdown.Item eventKey="FRUIT">FRUIT</Dropdown.Item> <br></br>
          <Dropdown.Item eventKey="VEGETABLE">VEGETABLE</Dropdown.Item> 
        </DropdownButton>
        <input type="text" placeholder="Search" onChange={this.onSearch} />
        <List items={this.props.items.filter(this.filterItem)} />
      </div>
    );
  }
}

export default FilteredList;
