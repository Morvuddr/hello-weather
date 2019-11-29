import React, { Component } from 'react';
import { connect } from 'react-redux';
import '../styles/App.css';
import MainContainer from './MainContainer';
import Header from '../components/Header';
import FavoritesContainer from './FavoritesContainer';
import { initCities, handleModal } from '../redux/favorites/actions';
import { initWeather } from '../redux/city/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';


class App extends Component {

    handleUpdateWeather = () => {
        this.props.initWeather();
    };

    handleClose = () => {
        this.props.handleModal();
    };

    componentDidMount() {
        this.props.initWeather();
        this.props.initCities();
    };

    render() {
        const { isLoading, weather, error } = this.props;
        return (
            <div className='App'>
                <Modal show={this.props.showModal.status} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Ошибка</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{this.props.showModal.text}</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Закрыть
                        </Button>
                    </Modal.Footer>
                </Modal>
                <Header onUpdate={this.handleUpdateWeather}/>
                <MainContainer weather={weather} isLoading={isLoading} error={error}/>
                <FavoritesContainer/>
            </div>
        );
    }
}

const mapStateToProps = ({ city: { isLoading, error, weather } , favorites: { showModal } }) => {
    return {
        isLoading,
        error,
        weather,
        showModal
    };
};
const mapDispatchToProps = {
    initCities: initCities,
    initWeather: initWeather,
    handleModal: handleModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

