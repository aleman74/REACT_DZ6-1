import React from 'react';
import ReactDOM from 'react-dom';



class WatchItem extends React.Component{

    constructor(props) {
        super(props);

        this.timerId = null;

        this.item     = props.item;
        this.onDelete = props.onDelete;
        this.time     = props.time;

//        this.onDeleteHandler = this.onDeleteHandler.bind(this);
    }

    // Отрисовываем время в указанной зоне
    GetTime(today, zone) {

        // Текущее время
        let zone_local = today.getTimezoneOffset() / -60;

        let zone_delta = zone - zone_local;

        // Время в другой зоне
        let d1 = new Date();
        d1.setTime(today.getTime() + (zone_delta * 60 * 60 * 1000));

        let options = {
            //	weekday: 'long',

            year: 'numeric',
            month: 'numeric',
            day: 'numeric',

            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        };

        let str1 = d1.toLocaleDateString("ru-RU", options);
        let pos = str1.indexOf(',');
        let result = str1.substring(pos + 1);

        return result;
    }

    onDeleteHandler = (id) => {
        this.onDelete(id);
    }


    render() {

        return (
                <tr key={this.item.id}>
                    <td>{this.item.name}</td>
                    <td>{this.GetTime(this.time, this.item.zone)}</td>
                    <td><span className="material-icons"
                              onClick={(evt) => this.onDeleteHandler(this.item.id)}>
                        highlight_off</span>
                    </td>
                </tr>
        );
    }
}

export default WatchItem;
