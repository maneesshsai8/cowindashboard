// Write your code here
import {PureComponent} from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

class VaccinationCoverage extends PureComponent {
  render() {
    const {vaccination} = this.props

    console.log(vaccination)

    return (
      <div className="bg-vac">
        <h1 className="head1">Vaccination Coverage</h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <BarChart
            width={1000}
            height={300}
            data={vaccination}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="vaccineDate" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="Dose 1" fill="#2cc6c6" />
            <Bar dataKey="Dose 2" fill="#f54394" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }
}

export default VaccinationCoverage
