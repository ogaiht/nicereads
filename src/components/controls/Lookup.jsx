import React from 'react';
import { KeyBoardEventType } from '../../lib/KeyBoardEventType';
import { KeyCodes } from '../../lib/KeyCodes';
import LookupItem from './LookupItem';

const FOCUS_STYLE = 'focused';

export default class Lookup extends React.Component {
    timeout = null;

    constructor(props) {
        super(props);
        this.getInitialState = this.getInitialState.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
    }

    getInitialState() {
        return {
            searchText: this.props.selection ? this.props.selection[this.props.nameProp] : '',
            searchCharacterCount: 0,
            keyedSelectionIndex: -1
        };
    }

    componentDidUpdate(prevProps) {

    }

    onSearchChange(e) {
        this.setState({searchText: e.target.value});
    }

    getLookuId() {
        return 'lookup-' + this.props.id;
    }

    getSearchResultId() {
        return 'search-results-lookup-' + this.props.id;
    }

    onSelection(searchResult) {
        this.removeFocusStyle();
        const searchText = searchResult[this.props.nameProp];
        this.setState({
            searchText,
            searchCharacterCount: searchText.length
        });
    }

    selectItem() {
        const searchResult = this.props.searchResults[this.state.keyedSelectionIndex];
        this.onSelection(searchResult);
    }

    onSearchKeyPress(e) {
        const keyPressed = e.which || e.keyCode;
        if (e.type === KeyBoardEventType.KEY_DOWN) {
            if (keyPressed === KeyCodes.TAB && this.state.keyedSelectionIndex > -1) {
                this.selectItem();
            }
            return;
        }

        if (keyPressed === KeyCodes.ESCAPE) {
            e.target.blur();
            return;
        }

        if (this.props.searchResults && this.props.searchResults.length > 0) {
            newKeyedSelection = this.state.keyedSelectionIndex;
            if (keyPressed === KeyCodes.DOWN_ARROR) {
                newKeyedSelection++;
                newKeyedSelection = Math.min(newKeyedSelection, this.props.keyedSelectionIndex - 1);
            } else if (keyPressed === KeyCodes.UP_ARROW) {
                newKeyedSelection--;
                newKeyedSelection = Math.max(newKeyedSelection, 0);
            }

            if (this.state.keyedSelectionIndex !== newKeyedSelection) {
                const searchResultId = this.getSearchResultId();
                const selectionOffset = 56 * newKeyedSelection;
                const searchResultsElement = document.getElementById(searchResultId);
                const resultsScroll = searchResultsElement.scrollTop;
                const resultsHeight = searchResultsElement.clientHeight;
                if (selectionOffset < resultsScroll) {
                    searchResultsElement.scrollTop = selectionOffset;
                } else if (selectionOffset > resultsScroll + resultsHeight - 56) {
                    searchResultsElement.scrollTop = selectionOffset - (resultsHeight - 56);
                }
            }

            this.setState({keyedSelectionIndex: newKeyedSelection});
        }

        if (this.isArrowKey(e)) {
            return;
        }

        if (keyPressed === KeyCodes.ENTER && this.state.keyedSelectionIndex > -1) {
            this.selectItem();
            return;
        }

        if (this.props.selection !== null) {
            this.setState({searchText: e.target.value.name});
            this.props.clearSelection();
        }

        this.setState({searchCharacterCount: e.target.value ? e.target.value.length : 0 });
        const { searchLength } = this.props;
        if (e.target.value && e.target.value.length >= searchLength) {
            const searchTerm = e.target.value;
            clearTimeout(this.timeout);
            this.timeout = setTimeout((() => {
                this.performSearch(searchTerm);
            }).bind(this), 300);
        } else if ((!e.target.value || e.target.value.length < searchLength)
                    && (this.props.searchResults && this.props.searchResults.length > 0)) {
            clearTimeout(this.timeout);
            this.resetResults();
        }
    }

    performSearch(searchTerm) {

    }

    resetResults() {

    }

    getLookupPosition() {
        return document.getElementById(this.getLookuId()).getBoundingClientRect();
    }

    getSearchResults() {
        return document.getElementById(this.getSearchResultId());
    }

    addFocusStyle() {
        document.getElementById(this.props.id).classList.add(FOCUS_STYLE);
    }

    removeFocusStyle() {
        this.setState({keyedSelectionIndex:-1});
        document.getElementById(this.props.id).classList.remove(FOCUS_STYLE);
    }

    getStyle() {
        const lookupPosition = this.getLookupPosition();
        return {
            top: (lookupPosition.top + 50) + 'px',
            left: lookupPosition.left + 'px',
            width: lookupPosition.width + 'px'
        };
    }

    getFailedMessage() {

    }

    getBody() {
        if (this.props.selection || this.state.searchCharacterCount === 0) {
            return '';
        }
        const searchClass = 'lookupt-results';
        const style = this.getStyle();
        return (
            <div className={searchClass} id={this.getSearchResultId()} style={style}>
                {(() => {
                    if (this.state.searchCharacterCount > 0 && this.state.searchCharacterCount < this.props.searchLength) {
                        const charactersToSearch = this.props.searchCharacterCount - this.state.searchCharacterCount;
                        return (
                            <div className="search-message">
                                <p>Enter {charactersToSearch} more character{charactersToSearch > 1 ? 's' : ''} to view search results.</p>
                            </div>
                        );
                    } else if (this.props.searchResultFailed) {
                        return (
                            <div className="search-message">
                                <p>{this.getFailedMessage()}</p>
                            </div>
                        );
                    } else if (this.props.searchResultsBusy) {
                        return (
                            <div className='spinner-side-by-side'>
                                <div className='spinner'>
                                    <span><i></i></span>
                                </div>
                                <div className='spinner-message'>
                                    <p>Searching...</p>
                                </div>
                            </div>
                        );
                    } else if (this.props.searchResults.length === 0) {
                        return (
                            <div className="search-message">
                                <p>{this.getNoResultFoundMessage()}</p>
                            </div>
                        );
                    } else {
                        return this.props.searchResults.map((searchResult, index) => {
                            return <LookupItem
                                        key={searchResult.key}
                                        searchResult={searchResult}
                                        timeout={searchResult.value}
                                        onSelection={this.onSelection}
                                        keySelected={index === this.state.keyedSelectionIndex}
                                    />
                        });
                    }
                    })()}
            </div>
        );
    }

    render() {
        return (
            <div className='lookup-form-filed-typehead' id={this.getLookuId()}>
                <input
                    id={this.props.id}
                    type='text'
                    placeholder={this.getPlaceHolder()}
                    value={this.state.searchText}
                    onFocus={this.addFocusStyle}
                    onBlur={this.removeFocusStyle}
                    onKeyUp={this.onSearchKeyPress}
                    onKeyDown={this.onSearchKeyPress}
                    onChange={this.onChange}/>
                    <span className='icon-magnifying-glass-thin'></span>
                    <div className='search-background'>
                        {this.getBody()}
                    </div>
            </div>
        )
    }

}