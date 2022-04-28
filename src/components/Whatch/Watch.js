import React from 'react';
import ReactDOM from 'react-dom';
import './Watch.css';
import {nanoid} from "nanoid";



class Watch extends React.Component{
/*
    componentDidMount() {

    }

    componentWillUnmount() {

    }

    resizeHandler = () => {

    }
*/

    constructor(props) {
        super(props);

        this.timerId = null;

        // Привязываем функции использующие контекст
        this.onAdd = this.onAdd.bind(this);
        this.changeName = this.changeName.bind(this);
        this.changeZone = this.changeZone.bind(this);

        this.changeTime = this.changeTime.bind(this);
    }

    state = {
        data: [],
        time_name: 'фф',
        time_zone: 1,
        time: new Date()
    };

    // Отрисовываем время в указанной зоне
    GetTime(today, zone) {

//        console.log('GetTime', today, zone);

        // Текущее время
//        let today  = new Date();
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

//        console.log('GetTime result', result);

        return result;
    }

    onAdd(evt) {
        evt.preventDefault();      // Отключаем перезагрузку страницы

        let v = {
            id: nanoid(),
            name: this.state.time_name,
            zone: this.state.time_zone
        };
        console.log(v);

//        this.setState( prev => ({data: prev.data.push(v)}));     // не работает
        this.setState( prev => ({data: [...prev.data, v]}));

        this.setState( prev => ({time_name: '', time_zone: 0}));

    }

    onDelete = (id) => {
        console.log('onDelete id = ' + id);

        let arr = this.state.data.filter(item => item.id != id);
        this.setState( prev => ({data: arr}));
    }

    // changeName = (evt) => {
    //     this.setState( prev => ({time_name: evt.target.value}));
    // }

    changeName(evt) {
        this.setState( prev => ({time_name: evt.target.value}));
    }

    changeZone(evt) {
        this.setState( prev => ({time_zone: parseInt(evt.target.value)}));
    }

    changeTime() {
        console.log('changeTime');
        this.setState( prev => ({time: new Date()}));
    }

    // После отображения элемента
    componentDidMount() {
        this.timerId = setInterval(this.changeTime, 1000);
        console.log('componentDidMount timerId = ' + this.timerId);
    }

    // Перед удалением
    componentWillUnmount() {
        clearInterval(this.timerId);
        console.log('componentWillUnmount timerId = ' + this.timerId);
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
                <div id="data">
                    <table>
                        <tbody>
                        {this.state.data.map(item =>
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>{this.GetTime(this.state.time, item.zone)}</td>
                                <td><span className="material-icons"
                                          onClick={(evt) => this.onDelete(item.id)}>
                                    highlight_off</span>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </form>
        );
    }
}

export default Watch;
