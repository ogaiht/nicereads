import React from 'react';

export default class LookupItem extends React.Component {

    getClassName() {
        let className = this.props.keySelected ? 'keyboard-selected' : '';
        if (this.props.selected) {
            className += ' selected';
        }
        return className;
    }

    render() {
        const { searchResult } = this.props;
        const className = this.getClassName();
        return (
            <button
            className={className}
            type='button'
            id={this.props.key}
            onMouseDown={() => this.props.onSelection(searchResult)}>
                {this.props.icon || ''}
                <div className='main'>
                    <p className='title'>{this.props.title}</p>
                    {this.props.details || <div className='detail-list' />}
                </div>
            </button>
        );
    }
}