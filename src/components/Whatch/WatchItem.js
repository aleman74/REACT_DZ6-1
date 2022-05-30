import React from 'react';
import {getTime} from "../../lib/myTime";


class WatchItem extends React.Component{

    constructor(props) {
        super(props);

        this.timerId = null;

        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }


    onDeleteHandler = (id) => {
        this.props.onDelete(id);
    }


    render() {

        return (
                <tr key={this.props.item.id}>
                    <td>{this.props.item.name}</td>
                    <td>{getTime(this.props.time, this.props.item.zone)}</td>
                    <td><span className="material-icons"
                              onClick={(evt) => this.onDeleteHandler(this.props.item.id)}>
                        highlight_off</span>
                    </td>
                </tr>
        );
    }
}

export default WatchItem;
