// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './index.css'

import VaccinationByAge from '../VaccinationByAge'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationCoverage from '../VaccinationCoverage'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    status: apiStatusConstants.initial,
    last7DaysVaccination: [],
    vaccinationByAge: [],
    vaccinationByGender: [],
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({status: apiStatusConstants.inProgress})
    const vaccinationDataApiUrl = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(vaccinationDataApiUrl)

    if (response.ok) {
      const data = await response.json()

      this.setState({
        status: apiStatusConstants.success,
        last7DaysVaccination: data.last_7_days_vaccination,
        vaccinationByGender: data.vaccination_by_gender,
        vaccinationByAge: data.vaccination_by_age,
      })
    } else {
      this.setState({status: apiStatusConstants.failure})
    }
  }

  loading = () => (
    <div className="load" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  failure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
      <h1>Something went wrong</h1>
    </div>
  )

  success = () => {
    const {
      last7DaysVaccination,
      vaccinationByAge,
      vaccinationByGender,
    } = this.state
    const updateLast7DaysVaccination = last7DaysVaccination.map(each => ({
      'Dose 1': each.dose_1,
      'Dose 2': each.dose_2,
      vaccineDate: each.vaccine_date,
    }))

    return (
      <>
        <VaccinationCoverage vaccination={updateLast7DaysVaccination} />
        <VaccinationByGender genderData={vaccinationByGender} />
        <VaccinationByAge ageData={vaccinationByAge} />
      </>
    )
  }

  renderState = () => {
    const {status} = this.state
    switch (status) {
      case apiStatusConstants.success:
        return this.success()
      case apiStatusConstants.inProgress:
        return this.loading()
      case apiStatusConstants.failure:
        return this.failure()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-cont">
        <div className="card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            alt="website logo"
            className="image"
          />
          <h1 className="head">co-WIN</h1>
        </div>
        <h1 className="para">CoWIN Vaccination in India</h1>
        {this.renderState()}
      </div>
    )
  }
}

export default CowinDashboard
