import React, { useState } from 'react'
import Videos from './Videos'
import Category from './Category'

const list = [
    {type: '其它',cnt: '2'},
    {type: '积水点',cnt: '20'},
]
const lists = [
    {  "sbbh": "31010521001181005008" }, 
    {  "sbbh": "31010514001181054057" }, 
    {  "sbbh": "31010511001181053019" },
    {  "sbbh": "31010512001181052028" }
]
const nlist = [
    {  "sbbh": "31010518001181050100" }, 
    {  "sbbh": "31010521001181050010" }, 
    {  "sbbh": "31010511001181053020" },
    {  "sbbh": "31010511001181053016" }
  ]
function PVideos(){

    const [arr, setArr] = useState(list)
    return (
        <div
            style={{
                backgroundColor: "rgba(50,50,184,.5)",
                height: 800
            }}
        >
            <Category 
                dataProvider={arr} 
                style={{}}
            />
            {/* <Videos dataProvider={arr} style={{
                    direction: 'col',
                    marginNum: '5px', 
                    scale: 1, 
                    text: '不可用'
                }}/> */}
            <button
                onClick={() => setArr(list)}
            >变变变变</button>
        </div>
    )
}

export default PVideos