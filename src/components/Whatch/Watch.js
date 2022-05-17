import React from 'react';
import ReactDOM from 'react-dom';
import './Watch.css';
import {nanoid} from "nanoid";
import WatchList from "./WatchList";



class Watch extends React.Component{

    constructor(props) {
        super(props);

        // Привязываем функции использующие контекст
        this.onAdd = this.onAdd.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeZone = this.changeZone.bind(this);
    }

    state = {
        data: [],
        time_name: 'Гринвич',
        time_zone: 0,
        time: new Date()
    };

    onAdd(evt) {
        evt.preventDefault();      // Отключаем перезагрузку страницы

        let v = {
            id: nanoid(),
            name: this.state.time_name,
            zone: this.state.time_zone
        };
        console.log(v, 'WatchList render  length = ' + this.state.data.length);

        this.setState( prev => ({data: [...prev.data, v], time_name: '', time_zone: 0}));
    }

    onDelete = (id) => {
        console.log('onDelete id = ' + id);

        let arr = this.state.data.filter(item => item.id != id);
        this.setState( prev => ({data: arr}));
    }

    changeName(evt) {
        this.setState( prev => ({time_name: evt.target.value}));
    }

    changeZone(evt) {
        this.setState( prev => ({time_zone: parseInt(evt.target.value)}));
    }

    render() {

        return (
            <form id="item">
                <div id="param">
                    <div id="param_title">
                        <span>Название</span>
                        <span>Временная зона</span>
                    </div>
                    <div>
                        <input id="time_name" name="time_name" type="text" value={this.state.time_name}
                                onChange={this.changeName} />
                        <input id="time_zone" name="time_zone" type="number" value={this.state.time_zone}
                               onChange={this.changeZone} />
                        <button onClick={this.onAdd}>Добавить</button>
                    </div>
                </div>
                <WatchList data={this.state.data} onDelete={this.onDelete} />
            </form>
        );
    }
}

export default Watch;
