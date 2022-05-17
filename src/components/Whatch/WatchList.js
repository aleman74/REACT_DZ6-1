import React from 'react';
import ReactDOM from 'react-dom';
import WatchItem from "./WatchItem";



class WatchList extends React.Component{

    constructor(props) {
        super(props);

        this.timerId = null;

        this.data = props.data;
        this.onDelete = props.onDelete;

//        this.onDeleteHandler = this.onDeleteHandler.bind(this);

        this.changeTime = this.changeTime.bind(this);
    }

    state = {
        time: new Date()
    };

    changeTime() {
        this.setState( prev => ({time: new Date()}));
    }

    // После отображения элемента
    componentDidMount() {
        this.timerId = setInterval(this.changeTime, 1000);
        console.log('componentDidMount timerId = ' + this.timerId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.data = this.props.data;
    }

    // Перед удалением
    componentWillUnmount() {
        clearInterval(this.timerId);
        console.log('componentWillUnmount timerId = ' + this.timerId);
    }

    onDeleteHandler = (id) => {
        this.onDelete(id);
    }


    render() {

        return (
            <div id="data">
                <table>
                    <tbody>
                    {this.data.map(item =>
                        <WatchItem key={item.id} item={item} time={this.state.time} onDelete={this.onDeleteHandler} />
                    )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default WatchList;
