import {useEffect, useRef} from "react";
import {Chart,registerables} from "chart.js";

function CounterOrangeChart() {
    let canvasRef = useRef();
    let appointmentChartRef = useRef(null)

    console.log(canvasRef)
    const doughnutChartOrangeData = [1.1, 3.9];

    const counterforOrangeDoughnut = {
        id: "counter",
        beforeDraw(chart, args, opions) {
            const {
                ctx,
                chartArea: { top, right, bottom, left, width, height },
            } = chart;
            ctx.save();
            ctx.font = "700 22px Roboto Bold";
            ctx.textAlign = "center";
            ctx.fillStyle = "rgba(245, 163, 72, 1)";
            ctx.fillText(doughnutChartOrangeData[1], width / 2, top + height / 2);
        },
    };



    useEffect(()=>{
        Chart.register(...registerables)
        appointmentChartRef.current = new Chart(canvasRef.current.getContext("2d"), {
            type: "doughnut",
            data: {
                datasets: [
                    {
                        backgroundColor: ["#F5F6FA", "#F5A348"],
                        weight: 0.5,
                        data: doughnutChartOrangeData,
                        spacing: 0,
                        borderWidth: 0,
                    },
                ],
            },
            options: {
                cutout: "75%",
            },
            plugins: [counterforOrangeDoughnut],
        });
        return () => {
            appointmentChartRef.current.destroy()
        }
    },[])
    return(
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div  style={{height:92,width:92}}>
                <canvas ref={canvasRef}></canvas>
            </div>
            <div>
                <div>
                    Clinic name
                </div>
                <div> Avg. monthly </div>
                <div>clinic rating </div>
            </div>
        </div>
    )
}
export default CounterOrangeChart;