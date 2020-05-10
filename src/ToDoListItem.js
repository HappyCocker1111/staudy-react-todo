import React, { Component } from 'react';
import './ToDoListItem.css';

class ToDoListItem extends Component{
    render(){
        const{
            title,
            descreption
        } = this.props;

        return(
            <div className="ToDoListItem" {...this.props}>
                <div className="ToDoListItem-title">{title}</div>
                <div className="ToDoListItem-descreption">{descreption}</div>
            </div>
        );
    }
}

export default ToDoListItem;