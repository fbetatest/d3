import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {getInterview} from '../interviews/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field, FieldArray} from 'formik'
import {deleteInterviewData, getInterviewData, saveInterviewData} from './_requests'
import * as XLSX from 'xlsx';
import * as fs from 'fs';

import { useAuth } from '../../modules/auth'





const InterviewReport: FC = () => {
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId
  const {currentUser} = useAuth()
  const [interviewData, setInterviewData] = useState({
    id: 0,
    interviewName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
  })



  const [interviewData2, setInterviewData2] = useState([{
    _id: '',
    interviewName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
    answers: [{
      question: '',
      fieldValue:'',
      fieldOptions: []
    }]
  }])

  const handleOnExport = () => {

    const exportAnswers = [{
      Question: "",
      Answer: ""
    }]

    interviewData2.map((val1, id)=>{
      exportAnswers.push({Question: `#${id+1}`,
      Answer: ""})
      val1.answers.map((val)=>{

        const a1 = (val.fieldValue)? val.fieldValue : val.fieldOptions.toString()
        exportAnswers.push( {Question: val.question, Answer:a1} )
      })
     
    })

    var wb = XLSX.utils.book_new(),
    ws = XLSX.utils.json_to_sheet(exportAnswers)

    XLSX.utils.book_append_sheet(wb, ws, "sheet1" )

    XLSX.writeFile(wb, `${interviewData.interviewName} ${Date.now()}.xlsx` )
  }


 

 

  useEffect(() => {
    console.log('useEffect')

    getInterviewData(vid).then((val) => {
      const {data} = val

      if(data.length){

        setInterviewData2(data)
        console.log(interviewData2)

      console.log(data)
      setInterviewData(data[0])
     


    }

    else{

      setInterviewData({
        id: 0,
        interviewName: 'No data found..',
        projectName: '[]',
        created: 0,
        vid: 0,

      })

    }
    })
  }, [])

  return (
    <>
      <PageTitle breadcrumbs={[]}>Report</PageTitle>
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-1200px'>
        <div className='card-body py-3 pt-3 pb-3 report'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>

            <div className='border-0 pt-5'>
              
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 me-3 '>{interviewData.interviewName}</span>
          <span>  
          {(currentUser?.first_name == "Admin Odc")?
          <button className="btn btn-sm fw-bold btn-primary" onClick={handleOnExport}>Download Data</button>:
          <></>}
            
          </span>
          <div className='card-label fw-bold fs-6 mb-3 pt-2'>Project: {interviewData.projectName}</div>
        </h3>
        
        <div className='card-toolbar'>
          
        </div>
      </div>

      {interviewData2.map((val1, id)=>{
        return (
          <>
          <div key={id} className='fw-semibold fs-5 my-0 py-2 border border-gray-300 p-4 my-2 rounded '>
            <div className='flex-stack d-flex'>
              <div className='text-muted'>#{id+1}</div>
              <div className='d-flex flex-stack'>
              <div className='text-muted pe-3'>{new Date(val1.created).toLocaleString()} </div>
           
            <button 
            onClick = { () => {  deleteInterviewData(val1._id);  setInterviewData2(interviewData2.filter(item => item._id !== val1._id))} }
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm align-self-end' >
              <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
            </button>
            </div>
            </div>
          {val1.answers.map((val, i)=>{ 
            return (
            <div key={i} className="pb-2">
              
              {(val.question)?<span>{`${val.question} `}</span>:''}
              {(val.fieldValue)?<span className="fw-bold text-primary">{val.fieldValue}</span>:''}
              {(val.fieldOptions)?<span className="fw-bold text-primary">{val.fieldOptions.toString()}</span>:''}
          
            </div>
            
          )})}
          </div>
          </>
        )
      })}
              
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const InterviewReportWrapper: FC = () => {
  return (
    <>
      <InterviewReport />
    </>
  )
}

export {InterviewReportWrapper}

