'use strict';

var Glyphicon = ReactBootstrap.Glyphicon;

var Button = ReactBootstrap.Button;
var ButtonGroup = ReactBootstrap.ButtonGroup;

var Panel = ReactBootstrap.Panel;
var Media = ReactBootstrap.Media;

var Col = ReactBootstrap.Col;
var Grid = ReactBootstrap.Grid;
var Row = ReactBootstrap.Row;

var FormControl = ReactBootstrap.FormControl;
var FormGroup = ReactBootstrap.FormGroup;
var InputGroup = ReactBootstrap.InputGroup;

var Nav = ReactBootstrap.Nav;
var Navbar = ReactBootstrap.Navbar;
var NavItem = ReactBootstrap.NavItem;

var WeatherSearchForm = React.createClass({
    getInitialState: function() {
        return {data: {}, weatherSearchInput: '', searchComplete: false};
    },
    convertCtoF: function (celsius) {
        return (celsius * 9 / 5) + 32;
    },
    setTemps: function (data) {
        data.tempScale = 'C';

        data.main.tempF = this.convertCtoF(data.main.temp).toFixed(1);
        data.main.temp = data.main.temp.toFixed(1);
        data.main.tempC = data.main.temp;

        data.main.temp_maxF = this.convertCtoF(data.main.temp_max).toFixed(1);
        data.main.temp_max = data.main.temp_max.toFixed(1);
        data.main.temp_maxC = data.main.temp_max;

        data.main.temp_minF = this.convertCtoF(data.main.temp_min).toFixed(1);
        data.main.temp_min = data.main.temp_min.toFixed(1);
        data.main.temp_minC = data.main.temp_min;
        return data;
    },
    switchTemps: function (data) {
        if (data.tempScale === 'C') {
            data.main.temp = data.main.tempF
            data.main.temp_max = data.main.temp_maxF
            data.main.temp_min = data.main.temp_minF
        } else {
            data.main.temp = data.main.tempC
            data.main.temp_max = data.main.temp_maxC
            data.main.temp_min = data.main.temp_minC
        }

        data.tempScale = data.tempScale === 'C' ? 'F' : 'C';

        this.setState({data: data});
    },
    handleInputChange: function (e) {
        this.setState({weatherSearchInput: e.target.value});
    },
    handleWeatherSearch: function (e) {
        e.preventDefault();
        var apiKey = "b99262b5b1737f211728756202b3a21d";
        var searchInput = this.state.weatherSearchInput.trim();
        var callString = 'http://api.openweathermap.org/data/2.5/weather?q=' + searchInput + '&APPID=' + apiKey + '&units=metric';

        fetch(callString, {method: 'GET'})
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                console.log('CALL RESPONSE', json);
                json = this.setTemps(json);
                json.timeStamp = moment().format('LLL');
                json.wind.deg = json.wind.deg ? json.wind.deg.toFixed(0) : 0;
                this.setState({data: json, searchComplete: true});
            }.bind(this));
    },
    render: function () {
        return (
            <div className="weatherSearchForm">
                <Row className="text-center">
                    <Col xs={12} md={6} mdOffset={3}>
                        <form name="searchForm" onSubmit={this.handleWeatherSearch}>
                            <FormGroup>
                              <InputGroup>
                                  <FormControl
                                    value={this.state.weatherSearchInput}
                                    onChange={this.handleInputChange}
                                    placeholder="City Name" />
                                  <InputGroup.Button>
                                      <Button type="submit" bsStyle="info">
                                          Weather Search
                                      </Button>
                                  </InputGroup.Button>
                              </InputGroup>
                            </FormGroup>
                        </form>
                        <br />
                    </Col>
                </Row>
                <Row>
                    {this.state.searchComplete ? <WeatherPanel data={this.state.data} switchTemps={this.switchTemps} /> : null}
                </Row>
            </div>
        );
    }
});

var WeatherPanel = React.createClass({
    panelHeader: function () {
        return (
            <Row>
                <Col sm={8}>
                    <Media>
                        <Media.Left>
                            <img src={'http://openweathermap.org/img/w/' + this.props.data.weather[0].icon + '.png'} responsive={true} />
                        </Media.Left>
                        <Media.Body>
                            <h2>{this.props.data.name}</h2>
                        </Media.Body>
                    </Media>
                </Col>
                <Col sm={4}>
                    <h3>{this.props.data.weather[0].description}</h3>
                </Col>
            </Row>
        );
    },
    panelFooter: function () {
        return (
            <Row>
                <Col sm={10}>
                    <h4>Weather data as of {this.props.data.timeStamp}</h4>
                </Col>
                <Col sm={2}>
                    <ButtonGroup>
                        <Button onClick={this.props.switchTemps.bind(null, this.props.data)} disabled={this.props.data.tempScale === 'C'}>C</Button>
                        <Button onClick={this.props.switchTemps.bind(null, this.props.data)} disabled={this.props.data.tempScale === 'F'}>F</Button>
                    </ButtonGroup>
                </Col>
            </Row>
        );
    },
    render: function () {
        return (
            <Panel header={this.panelHeader()} footer={this.panelFooter()}>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Current Temp:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.main.temp}&#176;{this.props.data.tempScale}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">High Temp:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.main.temp_max}&#176;{this.props.data.tempScale}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Low Temp:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.main.temp_min}&#176;{this.props.data.tempScale}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Coord:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3><a href={'https://www.google.com/maps/preview/@' + this.props.data.coord.lat + ',' + this.props.data.coord.lon + ',12z'} target="_blank">{this.props.data.coord.lat}, {this.props.data.coord.lon}</a></h3>
                        </Col>
                    </Row>
                </Col>
                <Col sm={6}>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Humidity:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.main.humidity}%</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Clouds:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.clouds.all}%</h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Wind Direction:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>
                                <Glyphicon glyph="arrow-up" style={{transform: 'rotate(' + this.props.data.wind.deg + 'deg)'}} />{this.props.data.wind.deg}&#176;
                            </h3>
                        </Col>
                    </Row>
                    <Row>
                        <Col sm={6}>
                            <h3 className="pull-right">Wind Speed:</h3>
                        </Col>
                        <Col sm={6}>
                            <h3>{this.props.data.wind.speed} m/s</h3>
                        </Col>
                    </Row>
                </Col>
            </Panel>
        );
    }
});

var WeatherPageHeader = React.createClass({
    render: function () {
        return (
            <Navbar className="weatherPageHeader">
                <Navbar.Header>
                    <h2>Empty Datacube</h2>
                </Navbar.Header>
                <Nav>
                    <NavItem href="https://github.com/Caldwerl" target="_blank">
                        <h4>Github</h4>
                    </NavItem>
                </Nav>
            </Navbar>
        );
    }
});

var WeatherPageFooter = React.createClass({
    render: function () {
        return (
            <Row className="weatherPageFooter">
                <Col className="text-center">
                    Using <a href="http://openweathermap.org">openweathermap.org</a>
                </Col>
            </Row>
        );
    }
});

var WeatherPage = React.createClass({
  render: function () {
    return (
        <Grid className="weatherPage">
            <WeatherPageHeader />

            <WeatherSearchForm />

            <WeatherPageFooter />
        </Grid>
    );
  }
});

ReactDOM.render(
    <WeatherPage />,
    document.getElementById('content')
);
