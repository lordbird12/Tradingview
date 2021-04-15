import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Side from './views/Side'
import Nav from './views/Nav'

import Home from './views/Home'
import Login from './views/Login'

import Permission from './views/Permission'
import EmployeeList from './views/EmployeeList'
import AddEmployee from './views/addEmployee'

import LogList from './views/LogList'


import Company from './views/Company'
import CompanyList from './views/CompanyList'

import DailyList from './views/DailyList'

import NotFoundPage from './views/NotFoundPage'




class App extends Component {
  render() {
    return (
      <div class="main-wrapper">
        <div style={{
          display: this.props.location.pathname == "/Home"
            || this.props.location.pathname == "/Permission"
            || this.props.location.pathname == "/EmployeeList"
            || this.props.location.pathname == "/addEmployee"

            || this.props.location.pathname == "/LogList"

            || this.props.location.pathname == "/Company"
            || this.props.location.pathname == "/CompanyList"

            || this.props.location.pathname == "/DailyList"


            ? "" : "none"
        }} >
          <Nav />
        </div>
        <div style={{
          display: this.props.location.pathname == "/Home"
            || this.props.location.pathname == "/Permission"
            || this.props.location.pathname == "/EmployeeList"
            || this.props.location.pathname == "/addEmployee"

            || this.props.location.pathname == "/LogList"

            || this.props.location.pathname == "/Company"
            || this.props.location.pathname == "/CompanyList"

            || this.props.location.pathname == "/DailyList"

            ? "" : "none"
        }} >
          <Side />
        </div>
        <Switch>

          <Route exact path="/" component={Login} />
          <Route path="/Home" component={Home} />
          <Route path="/Permission" component={Permission} />
          <Route path="/EmployeeList" component={EmployeeList} />
          <Route path="/addEmployee" component={AddEmployee} />


          {/* Log */}
          <Route path="/LogList" component={LogList} />


          {/* Company */}
          <Route path="/CompanyList" component={CompanyList} />
          <Route path="/Company" component={Company} />

          {/* Daily */}
          <Route path="/DailyList" component={DailyList} />

          <Route component={NotFoundPage} />
        </Switch>


      </div>
    )
  }
}

export default withRouter(App)