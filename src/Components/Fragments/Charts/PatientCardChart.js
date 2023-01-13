import React, {useEffect, useRef} from "react";
import Highcharts from 'highcharts';
import Exporting from 'highcharts/modules/exporting';
import PatientCatdChartHeader from "../../Dashboard/Patient/Tabs/OverviewItems/PatientCatdChartHeader";
Exporting(Highcharts);
function PatientCardChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)



    useEffect(() => {
        Highcharts.chart('container', {
            chart: {
                type: "scatter",
                // inverted: true,
            },

            legend: {
                enabled: false,
            },

            title: {
                text: "",
            },

            tooltip: {
                shared: true,
            },

            xAxis: {
                categories: ["Jun 20", "Jun 21", "Jun 22", "Jun 23", "Jun 24"],
                gridLineColor: "#D9D9D9",
                gridLineWidth: 1,
                style: {fontSize: 35}
            },

            yAxis: {
                title: {
                    text: "",
                },
            },

            series: [
                {
                    lineWidth: 3,
                    lineColor: "#D9D9D9",
                    data: [
                        [0, 80],
                        [0, 150],
                        [0, null],
                        [1, 110],
                        [1, 60],
                        [1, null],
                        [2, 90],
                        [2, 60],
                        [2, null],
                        [3, 100],
                        [3, 70],
                        [3, null],
                        [4, 95],
                        [4, 55],
                    ],
                },
            ],
        });
    }, [])




    return(

        <div style={{padding: 50, border: "1px solid #dedddc", borderRadius: 15}}>
            <PatientCatdChartHeader />
            <div ref={canvasRef} id="container"></div>
        </div>
    )
}
export default PatientCardChart;
