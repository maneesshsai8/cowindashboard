// Write your code here
import {PureComponent} from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Bar,
  Tooltip,
  Legend,
} from 'recharts'

const dataColor = [{color: '#ff0000'}, {color: '#00ff00'}, {color: '#0000ff'}]

const RADIAN = Math.PI / 180
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5
  const x = cx + radius * Math.cos(-midAngle * RADIAN)
  const y = cy + radius * Math.sin(-midAngle * RADIAN)

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? 'start' : 'end'}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  )
}

export default class VaccinationByAge extends PureComponent {
  static demoUrl =
    'https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj'

  render() {
    const {ageData} = this.props
    const data = ageData.map((each, index) => ({
      ...each,
      ...dataColor[index],
    }))
    console.log(data)
    return (
      <div className="bg-vac">
        <h1 className="head1">Vaccination by Age</h1>
        <ResponsiveContainer width="100%" aspect={3}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
            >
              {data.map(entry => (
                <Cell key={entry.count} fill={entry.color} />
              ))}
            </Pie>
            <Bar dataKey="18-44" fill="#ff0000" />
            <Bar dataKey="45-60" fill="#00ff00" />
            <Bar dataKey="Above 60" fill="#0000ff" />
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
}
