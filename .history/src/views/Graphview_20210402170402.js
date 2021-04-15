import React, { Component } from "react";
import axios from "axios";
import BootstrapTable from "react-bootstrap-table-next";
import filterFactory, { textFilter } from "react-bootstrap-table2-filter";
import paginationFactory from "react-bootstrap-table2-paginator";
import ToolkitProvider, {
  Search,
  CSVExport,
} from "react-bootstrap-table2-toolkit";
import API from "../api/API";
import Progressbar from "./progressbar";
import { Link } from "react-router-dom";

import ModalEditDaily from "./ModalEditDaily";
import DialogDeleteDaily from "./DialogDeleteDaily";

import ModalImportDaily from "./ModalImportDaily";
import DialogClearDaily from "./DialogClearDaily";

import Chart from "../components/TVChartContainer";

export default class DailyList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const params = {
      username: localStorage.getItem("username"),
      menu_id: 2,
    };

    axios
      .post(API.GET_EMPLOYEE_ONE_GANT_MENU, params, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          menu_save_2: res.data.data.save,
          menu_edit_2: res.data.data.edit,
          menu_delete_2: res.data.data.delete,
        });

        if (res.data.data.view == 1) {
          //get daily page
          axios
            .get(API.DAILY, {
              headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            })
            .then((res) => {
              console.log(res.data.data);
              this.setState({
                Daily: res.data.data,
                progressOpen: false,
              });
            })
            .catch((err) => {
              this.setState({
                Daily: [],
                progressOpen: false,
              });
            });
          //
        } else {
          // window.localStorage.clear();
          // this.props.history.push("/");
          // window.location.reload(false);
        }
      })
      .catch((err) => {
        this.setState({
          menu_save_2: [],
          menu_edit_2: [],
          menu_delete_2: [],
        });
        // window.localStorage.clear();
        // this.props.history.push("/");
        // window.location.reload(false);
      });

    const script = document.createElement("script");
    script.src = "assets/js/reload.js";
    script.async = true;
    document.body.appendChild(script);
    // window.location.reload(true);
  }

  render() {
    const { SearchBar } = Search;
    const { ExportCSVButton } = CSVExport;

    const customTotal = (from, to, size) => (
      <span className="react-bootstrap-table-pagination-total">
        &nbsp;&nbsp; Showing {from} to {to} of {size} Results
      </span>
    );

    const options = {
      paginationSize: 4,
      pageStartIndex: 1,
      firstPageText: "First",
      prePageText: "Back",
      nextPageText: "Next",
      lastPageText: "Last",
      nextPageTitle: "First page",
      prePageTitle: "Pre page",
      firstPageTitle: "Next page",
      lastPageTitle: "Last page",
      showTotal: true,
      paginationTotalRenderer: customTotal,
      sizePerPageList: false,
      hideSizePerPage: true,
      sizePerPage: 50,
    };

    return (
      <div class="account-page">
        <div class="main-wrapper">
          <Chart />
          {/* <div className="content container-fluid"> */}
          {/* //header */}
          {/* <div className="page-header">
              <div className="row align-items-center">
                <div className="col">
                  <h3 className="page-title">Graph View</h3>
                  <ul className="breadcrumb">
                    <li className="breadcrumb-item">Main Menu</li>
                    <li className="breadcrumb-item active">Graph</li>
                  </ul>
                </div>
              </div>
            </div> */}
          {/* //header */}

          {/* body */}
          {/* <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12 col-xl-12">
                <Chart />
              </div>
            </div> */}
          {/* body */}
          {/* </div> */}
        </div>
      </div>
    );
  }
}
