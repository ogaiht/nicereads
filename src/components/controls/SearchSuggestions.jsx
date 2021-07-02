import React from 'react';

export default class SearchSuggestions extends React.Component {

    constructor(props) {
        super(props);
        this.onSelect = this.onSelect.bind(this);
    }

    onSelect(item) {
        this.props.onSelect(item);
    }

    render() {
        return (
            <ul>
                {
                    this.props.items.map(i => (
                        <li key={i.key} onClick={this.onSelect(i)}>
                            {i.value}
                        </li>
                    ))
                }
            </ul>
        )
    }
}