/* eslint-disable no-shadow */
import {PureComponent} from 'react'
import {PieChart, Pie, Cell, Bar, Tooltip, Legend} from 'recharts'

const dataColor = [{color: '#ff0000'}, {color: '#00ff00'}, {color: '#0000ff'}]
const cx = 150
const cy = 200
const iR = 50
const oR = 100

export default class VaccinationByGender extends PureComponent {
  render() {
    const {genderData} = this.props
    const data = genderData.map((each, index) => ({
      ...each,
      ...dataColor[index],
    }))
    console.log(data)
    return (
      <div className="bg-vac">
        <h1 className="head1">Vaccination by gender</h1>
        <PieChart width={400} height={500}>
          <Pie
            dataKey="count"
            startAngle={180}
            endAngle={0}
            data={data}
            cx={cx}
            cy={cy}
            innerRadius={iR}
            outerRadius={oR}
            fill="#8884d8"
            stroke="none"
          >
            {data.map(entry => (
              <Cell key={entry.color} fill={entry.color} />
            ))}
          </Pie>
          <Bar dataKey="Male" fill="#ff0000" />
          <Bar dataKey="Female" fill="#00ff00" />
          <Bar dataKey="Others" fill="#0000ff" />
          <Tooltip />
          <Legend />
        </PieChart>
      </div>
    )
  }
}
