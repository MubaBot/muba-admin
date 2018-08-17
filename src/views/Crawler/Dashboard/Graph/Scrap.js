import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";

import React, { Component } from "react";
import { Line } from "react-chartjs-2";
import { Card, CardBody, CardFooter, CardTitle, Col, Row } from "reactstrap";
import { CustomTooltips } from "@coreui/coreui-plugin-chartjs-custom-tooltips";
import { getStyle } from "@coreui/coreui/dist/js/coreui-utilities";
import { SingleDatePicker } from "react-dates";
import moment from "moment";

const brandPrimary = getStyle("--primary");
const brandSuccess = getStyle("--success");

var elements = 30;
var data1 = [];
var data2 = [];

for (var i = 0; i <= elements; i++) {
  data1.push(i);
  data2.push(elements - i);
}

const mainChart = {
  labels: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  datasets: [
    {
      label: "Working Link",
      backgroundColor: "transparent",
      borderColor: brandPrimary,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      data: data1
    },
    {
      label: "Temporary Data",
      backgroundColor: "transparent",
      borderColor: brandSuccess,
      pointHoverBackgroundColor: "#fff",
      borderWidth: 2,
      borderDash: [8, 5],
      data: data2
    }
  ]
};

const mainChartOpts = {
  tooltips: {
    enabled: false,
    custom: CustomTooltips,
    intersect: true,
    mode: "index",
    position: "nearest",
    callbacks: {
      labelColor: function(tooltipItem, chart) {
        return { backgroundColor: chart.data.datasets[tooltipItem.datasetIndex].borderColor };
      }
    }
  },
  maintainAspectRatio: false,
  legend: { display: false },
  scales: {
    xAxes: [{ gridLines: { drawOnChartArea: false } }],
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
          maxTicksLimit: 5
        }
      }
    ]
  },
  elements: {
    point: {
      radius: 0,
      hitRadius: 10,
      hoverRadius: 4,
      hoverBorderWidth: 3
    }
  }
};

class Scrap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: moment(),
      focused: false,

      mainChart: mainChart
    };
  }

  onDateChange = date => {
    return this.setState({ date });
  };

  render() {
    return (
      <div className="animated fadeIn">
        <Row>
          <Col>
            <Card>
              <CardBody>
                <Row>
                  <Col sm="5">
                    <CardTitle className="mb-0">Crawler Status</CardTitle>
                  </Col>
                  <Col sm="7" className="d-none d-sm-inline-block">
                    <div className="float-right">
                      <SingleDatePicker
                        id="showDate"
                        date={this.state.date}
                        anchorDirection="right"
                        inputIconPosition="after"
                        displayFormat="YYYY. MM. DD."
                        onDateChange={this.onDateChange}
                        isOutsideRange={() => false}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) => this.setState({ focused })}
                        numberOfMonths={1}
                        showDefaultInputIcon
                        small
                      />
                    </div>
                  </Col>
                </Row>
                <div className="chart-wrapper" style={{ height: 300 + "px", marginTop: 40 + "px" }}>
                  <Line data={this.state.mainChart} options={mainChartOpts} height={300} />
                </div>
              </CardBody>
              <CardFooter>
                <Row className="text-center">
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Keyword</div>
                    <strong>2</strong>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0 d-md-down-none">
                    <div className="text-muted">Working</div>
                    <strong>100 Link</strong>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Temporary Data</div>
                    <strong>100 Content</strong>
                  </Col>
                  <Col sm={12} md className="mb-sm-2 mb-0">
                    <div className="text-muted">Extracted</div>
                    <strong>100 Content</strong>
                  </Col>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Scrap;
