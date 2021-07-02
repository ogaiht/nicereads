import React from 'react';
import TextField from './TextField';
import SearchSuggestions from './SearchSuggestions';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            results: [],
            selected: null
        };
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSelect = this.onSelect.bind(this);
    }

    async getData() {
        const { lookup } = this.props;
        if (lookup) {
            const results = await lookup(this.state.query);
            this.setState({ results });
        }
    }

    async onSearchChange(e) {
        this.setState({query: e.target.value},
           () => {
                if (this.state.query && this.state.query.length >= 3) {
                    this.getData();
                } else {
                    this.setState({results:[]});
                }
        });
    }

    onSelect(item) {
        this.setState({
            query: item ? item.value : '',
            results:[],
            selected:item
        });
        //this.props.onChange({name: this.props.name, value: item ? item.key : null });
    }

    render() {
        const { selected, query } = this.state;
        const { label, name, submitted } = this.props;
        const value = selected ? selected.value : query;
        return (
            <div>
                <TextField value={value} label={label} name={name} onChange={async e => await this.onSearchChange(e)} submitted={submitted} />
                <SearchSuggestions items={this.state.results} onSelect={this.onSelect} />
            </div>
        )
    }
}