import React, { Component } from "react";
import Autosuggest from "react-autosuggest";

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => <div>{suggestion.name}</div>;

class AutoSuggestComponent extends Component {
  // Autosuggest is a controlled component.
  // This means that you need to provide an input value
  // and an onChange handler that updates this value (see below).
  // Suggestions also need to be provided to the Autosuggest,
  // and they are initially empty because the Autosuggest is closed.
  state = {
    suggestions: this.props.suggestions || []
  };

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? []
      : this.props.suggestions &&
          this.props.suggestions.filter(el =>
            el.name
              .toLowerCase()
              // .slice(0, inputLength)
              .includes(inputValue)
          );
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: this.getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { method }) => {
    if (method === "enter") {
      event.preventDefault();
    }
  };

  handleEnter(event) {
    if (event.keyCode === 13) {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].focus();
      event.preventDefault();
    }
  }

  render() {
    const { suggestions } = this.state;
    const { value, placeholder, className } = this.props;
    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder,
      className,
      value: value ? (value.name ? value.name : value) : "",
      onChange: this.props.onChange,
      disabled: this.props.readOnly,
      onKeyDown: this.handleEnter
    };
    // Finally, render it!
    return (
      <Autosuggest
        suggestions={suggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    );
  }
}
export default AutoSuggestComponent;
