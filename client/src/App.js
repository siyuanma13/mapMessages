import React, { Component } from 'react';
import './App.css';

//import leaflet css
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

//import leaflet icon javascript
import L from 'leaflet';

//import reactstrap css
import { Card, Button, CardTitle, CardText, Row, Col, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

//import joi for input validation
import Joi from 'joi';
const schema = Joi.object().keys({
    name: Joi.string().min(1).max(100).required(),
    message: Joi.string().min(1).max(500).required(),
    
});

//popup icons:
const otherIcon = L.icon({
    
    iconUrl: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII=',
    iconSize: [25, 41],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -41],

});

const  myIcon = L.icon({
    iconUrl: 'https://www.freeiconspng.com/uploads/red-location-map-pin-icon-5.png',
    iconSize: [32, 47],
    iconAnchor: [16, 47],
    popupAnchor: [0, -47],

});
//API URL
const API_URL = window.location.hostname === 'localhost' ? 'http://localhost:5000/api/v1/messages' : 'production-url-here'

class App extends Component {
    constructor(props) {
        super();

        this.state = {

            location: {
                lat: 51.505,
                lng: -0.09
            },
            haveUsersLocation: false,
            zoom: 2, //zoom out before component is mounted
            userMessage: //handles users input
                {
                    name: "",
                    message: ""
                },

            //properties to handle loading screen
            sendingMessage: false,
            sentMessage: false,

            //messages array for handling messages retrieved from collections
            messages:[]

        }
        //no need to bind arrow functions, since arrow functions are used in the
        //context they are defined

    }
    
    
    componentDidMount() {
       

        //fetch all previous messages
        fetch(API_URL)
            .then(response => response.json())
            .then(messages => {

                //combine points with the same lat/long
                const haveSeenPosition = {};
                messages = messages.reduce((all, message) => {
                    const key = `${message.latitude} + ${message.longitude}`;
                    if (haveSeenPosition[key]) {
                        haveSeenPosition[key].otherMessages = haveSeenPosition[key].otherMessages || []
                        haveSeenPosition[key].otherMessages.push(message);
                  
                    } else {
                        //haveSeenPosition[key] is pointing to message. 
                        //all.push pushes the message object. And you can reference it
                        haveSeenPosition[key] = message;
                        all.push(message);
                    }
                    return all;
                }, []);


                this.setState({
                    messages
                });
            });

        setTimeout(() => { console.log(this.state.messages) }, 2000);

        //if user allows access to current location, use that location
        navigator.geolocation.getCurrentPosition((position) => {
            this.setState(
                {
                    location: { lat: position.coords.latitude, lng: position.coords.longitude },
                    haveUsersLocation: true,
                    zoom: 13
                });
        }, () => {

            //on failure, fetch the users latitude/longitude based based on the ip address.
            fetch('https://ipapi.co/json')
                .then(response => response.json())
                .then(location => {
                  
                    this.setState(
                        {
                            location: { lat: location.latitude, lng: location.longitude },
                            haveUsersLocation: true,
                            zoom: 13
                        });
                });

           
            }
        );        
    }

    //validation function 
    formIsValid = () => {
        const userMessage = {
            name: this.state.userMessage.name,
            message: this.state.userMessage.message
        }
        const result = Joi.validate(userMessage, schema);
       
        return !result.error && this.state.haveUsersLocation ? true : false;
    }

    //function to handle the submit
    formSubmitted = (event) => {
        event.preventDefault();
        //after validating input, fetch JSON of name and message using API
        if (this.formIsValid()) {
            //tell loader we are now sending message
            this.setState({
                sendingMessage: true
            });

            fetch(API_URL, {
                method: 'POST',
                body: JSON.stringify({
                    name: this.state.userMessage.name,
                    message: this.state.userMessage.message,
                    latitude: this.state.location.lat,
                    longitude: this.state.location.lng
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json())
                .then(response => {
                    console.log(response);
                });

            //tell the loader we are done loading
            setTimeout(() => {
                this.setState({
                    sendingMessage: false,
                    sentMessage: true
                });}, 3000);
            
        }
    }

    //function to handle change in user's name and message
    valueChanged = (event) => {
        //cannot use target in the 2nd call back function below
        const { name, value } = event.target;

        this.setState((prevState) => (
            {
                userMessage: {
                    ...prevState.userMessage,
                    [name]: value
                }
            }));
        
    }




    render() {

        const userPosition = [this.state.location.lat, this.state.location.lng];
        let newLocation = true;
    
        return (
        <div className="map">
            {/*Map of the user*/}
            <Map className = "map" center={userPosition} zoom={this.state.zoom}>
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    

                  
                    {/*mapping over messages like this, and setting newLocation to false will ensure
                     that the user will see previous messages users have left at the current location*/}  
                    {this.state.messages.map(message => {
                        
                        if (userPosition[0] === message.latitude && userPosition[1] === message.longitude) {
                            newLocation = false;
                            return (<Marker key={message._id}
                                position={[message.latitude, message.longitude]}
                                icon={myIcon}>
                                <Popup>
                                    Welcome! Other people have been here too!
                                <div>{message.name} says: {message.message}</div>
                                    <div>{message.otherMessages ? message.otherMessages.map(subMsg => (
                                        <div key={subMsg._id}>{subMsg.name} says: {subMsg.message}</div>
                                    )) : ''}
                                    </div>
                                </Popup>
                            </Marker>)
                        } else {
                            return (<Marker key={message._id}
                                position={[message.latitude, message.longitude]}
                                icon={otherIcon}>
                                <Popup>
                                    Messages
                                <div>{message.name} says: {message.message}</div>
                                    <div>{message.otherMessages ? message.otherMessages.map(subMsg => (
                                        <div key={subMsg._id}>{subMsg.name} says: {subMsg.message}</div>
                                    )) : ''}
                                    </div>
                                </Popup>
                            </Marker>)
                        }
                    })}

                    {this.state.haveUsersLocation && (this.state.messages.length === 0 || newLocation) ?
                        <Marker
                            position={userPosition}
                            icon={myIcon}>
                            <Popup>
                                You are here! Leave a message for the world to see!

                            </Popup>
                        </Marker> : ''
                    }
                    
        
            </Map>

            {/*Card prompting the user to enter name and message*/}
            <Card body className = "card">
                <CardTitle>Welcome to Guest Maps! </CardTitle>
                <CardText>Leave a message to mark that you've been here!</CardText>
                    {!this.state.sendingMessage && !this.state.sentMessage && this.state.haveUsersLocation ?
                        /*Form containing the user's input*/
                        /*use ternary to hide/show compass loader or form */
                        <Form onSubmit={this.formSubmitted}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input
                                    onChange={this.valueChanged}
                                    type="text"
                                    name="name"
                                    id="name"
                                    placeholder="Enter your name"
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="message">Message</Label>
                                <Input
                                    onChange={this.valueChanged}
                                    type="textarea"
                                    name="message"
                                    id="message"
                                    placeholder="Enter your message"
                                />
                            </FormGroup>
                            <Button className="button" type="submit" disabled={!this.formIsValid()} color="info">submit</Button>
                        </Form> :
                        this.state.sendingMessage || !this.state.haveUsersLocation ? 
                            <iframe src="https://giphy.com/embed/xkC0zz2GObJfy" width="100%" height="100%" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>
                            : <CardText>Thank you for leaving a message!</CardText>
                    }
            </Card>
        </div>
    );
  }
}

export default App;
