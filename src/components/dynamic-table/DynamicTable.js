import React from 'react';
import PropTypes from 'prop-types';
import styles from './dynamic-table.css';
import { render } from '@testing-library/react';

/* This is a class I made to try and make resuable tables that could be sorted and hopefully searched.
 * I tried to use as little styling as possible so that it can be altered later when imported to another page.
 * Still a WIP but if anyone wants to use this feel free!
 * 
 * @Component DynamicTable
 * # Props # 
 * # tableTitle - The tables title #
 * # sortFields - The header fields that you would like to be sortable #
 * # data - The data to be displayed in the table #
 */
export default class DynamicTable extends React.Component {
    // assigns props values to scope and binds functions for retrieving row data and keys. 
    constructor(props) {
        super(props);
        this.getHeader = this.getHeader.bind(this);
        this.getRowsData = this.getRowsData.bind(this);
        this.getKeys = this.getKeys.bind(this);
    }
    
    // Uses one of the objects in our data to get the keys, assuming all objects are the same.
    getKeys = function() {
        return Object.keys(this.props.data[0]);
    }
    
    // Maps the headers and applies the sortable class to headers we wish to sort the table with.
    getHeader = function() {
        var keys = this.getKeys();
        // Loops through each key and returns a th element for every key.
        return keys.map((key, index)=>{
            if (this.props.sortFields.includes(key.toUpperCase())) {
                return <th className="sortable" key={key}>{key.toUpperCase()}</th>
            } else {
                return <th key={key}>{key.toUpperCase()}</th>
            }
        });
    }
    
    // Retrieves the data and then creates rows for each entry
    getRowsData = function() {
        var items = this.props.data;
        var keys = this.getKeys();
        // Once keys are retrieved, map/loop through each item, then pass the keys and data for each entry to '<RenderRow>'. 
        // See '<RenderRow>' for more details.
        return items.map((row, index)=>{
            return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        });
    }
    
    // Renders the table when the component is imported and called.
    render() {
        return (   
        <div>
            <div>
                <h1 className="fixTitle">{this.props.tableTitle}</h1>
            </div>
            <div className={`${syles['tableDiv']} ${styles['tableFixHead']}`}>
                <table className={styles.table}>
                    <thead className={styles.thead}>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody className={styles.tbody}>
                        {this.getRowsData()}
                    </tbody>
                </table>
            </div>
        </div>
        );
    }
}

// Renders the row for each entry in the data
const RenderRow = (props) =>{
    // Loop through each key field in an entity and create a 'td' element for each.
    return props.keys.map((key, index)=>{
        if (key === 'report') { 
            // This could maybe be done better but if we have a 'report' key
            // then we will add an anchor to open the patient report.
            return <td key={props.data[key]}><a href="/">{props.data[key]}</a></td>
        }
        else {
            return <td key={props.data[key]}>{props.data[key]}</td>
        }
    });
}
