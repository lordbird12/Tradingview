import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";
import API from "../api/API";

class Side extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: localStorage.getItem("username"),

      total: [],

      menu_view_1: [],
      menu_view_2: [],
      menu_view_3: [],
      menu_view_4: [],
      menu_view_5: [],
      menu_view_6: [],
      // menu_view_7: [],
      // menu_view_7: [],
      // menu_view_8: [],
      // menu_view_9: [],
      // menu_view_10: [],
    };
  }

  componentDidMount() {
    if (this.props.location.pathname == "/") {
    } else {
      //get employee page
      const params = {
        username: this.state.username,
      };

      axios
        .post(API.GET_EMPLOYEE_GANT_MENU, params, {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          console.log(res.data.data);
          this.setState({
            menu_view_1: res.data.data[0].view,
            menu_view_2: res.data.data[1].view,
            menu_view_3: res.data.data[2].view,
            menu_view_4: res.data.data[3].view,
            menu_view_5: res.data.data[4].view,
            menu_view_6: res.data.data[5].view,
            // menu_view_7: res.data.data[6].view,
            // menu_view_8: res.data.data[7].view,
            // menu_view_9: res.data.data[8].view,
            // menu_view_10: res.data.data[9].view,
          });

          // axios
          //     .get(API.TOTAL, {
          //         headers: {
          //             "Content-Type": "application/json",
          //             Authorization: "Bearer " + localStorage.getItem("token")
          //         }
          //     })
          //     .then(res => {
          //         // console.log(res.data.data);

          //         this.setState({
          //             total: res.data.data
          //         });

          //     })
          //     .catch(err => {
          //         this.setState({
          //             total: []
          //         });
          //     })
          // //
        })
        .catch((err) => {
          this.setState({
            menu_view_1: [],
            menu_view_2: [],
            menu_view_3: [],
            menu_view_4: [],
            menu_view_5: [],
            menu_view_6: [],
          });
          // window.localStorage.clear();
          // this.props.history.push("/");
          // window.location.reload(false);
        });
      //
    }
  }

  render() {
    return (
      <div>
        <div className="sidebar" id="sidebar">
          <div className="sidebar-inner slimscroll">
            <div id="sidebar-menu" className="sidebar-menu">
              <ul>
                <li className="menu-title">
                  <span>Main Menu</span>
                </li>
                <li
                  id="index"
                  className={
                    this.props.location.pathname == "/Home" ? "active" : ""
                  }
                  style={{ display: this.state.menu_view_1 == 1 ? "" : "none" }}
                >
                  <Link to="Home">
                    <i className="la la-dashboard"></i> <span>Dashboard</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/Graphview" ? "active" : ""
                  }
                >
                  <Link to="Graphview" target="_blank">
                    <i
                      className="la la-area-chart
                                    "
                    ></i>{" "}
                    <span>Graph View</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/DailyList" ? "active" : ""
                  }
                  style={{ display: this.state.menu_view_2 == 1 ? "" : "none" }}
                >
                  <Link to="DailyList">
                    <i className="la la-bell"></i> <span>Daily</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/CompanyList"
                      ? "active"
                      : ""
                  }
                  style={{ display: this.state.menu_view_3 == 1 ? "" : "none" }}
                >
                  <Link to="CompanyList">
                    <i className="la la-home"></i> <span>Company</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/EmployeeList"
                      ? "active"
                      : ""
                  }
                  style={{ display: this.state.menu_view_4 == 1 ? "" : "none" }}
                >
                  <Link to="EmployeeList">
                    <i className="la la-user"></i> <span>User</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/Permission"
                      ? "active"
                      : ""
                  }
                  style={{ display: this.state.menu_view_5 == 1 ? "" : "none" }}
                >
                  <Link to="Permission">
                    <i className="la la-key"></i> <span>Permission</span>
                  </Link>
                </li>

                <li
                  className={
                    this.props.location.pathname == "/LogList" ? "active" : ""
                  }
                  style={{ display: this.state.menu_view_6 == 1 ? "" : "none" }}
                >
                  <Link to="LogList">
                    <i className="la la-history"></i> <span>Log</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Side);
