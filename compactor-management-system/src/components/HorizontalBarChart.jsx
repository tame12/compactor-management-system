import { BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'


// create custom label for barchart
const CustomizedLabel = (props) => {
    return (
        <text 
        x={props.x}
        y={props.y}
        fontSize="16"
        fontFamily='sans-serif'
        fill={props.fill}
        textAnchor="start">
            {props.value}%
        </text>
    )
}

const HorizontalBarChart = (props) => {
    return (
        <Row>
            <Col></Col>
            <Col mx="auto">
                <div className="chart-container">
                    <h3 className="chart-header">{props.compactorID}</h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <BarChart width={730} height={250} data={props.data} layout="vertical">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis type="number" />
                            <YAxis type="category" dataKey="name" />
                            <Tooltip />
                            {/* <Legend /> */}
                            {/* <Bar dataKey="pv" fill="#8884d8" /> */}
                            <Bar dataKey="uv" fill="#82ca9d" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Col>
            <Col></Col>
        </Row>
    )
}

export default HorizontalBarChart