import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {getChecklist} from '../checklists/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field, FieldArray} from 'formik'
import { getChecklistData, saveChecklistData } from './_requests'

const ChecklistReport: FC = () => {
  const {id} = useParams()
  console.log(id)

  let tempId = '0'
  if (id) tempId = id
  console.log(id)
  const vid: number = +tempId

  const [checklistData, setChecklistData] = useState({
    id: 0,
    checklistName: 'Loading..',
    projectName: '',
    created: 0,
    vid: 0,
  })

  const [answersData, setAnswersData]= useState([{ 
    question: "",
    fieldValue:"",
    fieldOptions:[]
  }]);

  const [datalength, setDatalength]= useState(0);

  useEffect(() => {
    console.log('useEffect')
    

    getChecklistData(vid).then((val)=> {
        const {data} = val

        console.log(data)
        setChecklistData(data[0])
        console.log(checklistData)
        let tempAnswersData = [{ 
            question: "",
            fieldValue:"",
            fieldOptions:[]
          }]
        let i=0;
        data.map((v: any)=>{

      
            tempAnswersData.push(...v.answers)
       

        })

        tempAnswersData.shift();
        

        console.log(tempAnswersData)
       
        setAnswersData(tempAnswersData)
      
const dl= data[0].answers.length;
console.log(dl)
       setDatalength(dl)
        
     
      });
  }, [])

  

  return (
    <>
      <PageTitle breadcrumbs={[]}>{checklistData.checklistName}</PageTitle>
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>

     { answersData.map((val1,id)=>{
           return <>
          
           <div key={id} className="fw-semibold fs-5 my-0 py-2 ">
           {(id % datalength== 0)?<div className='border border-gray-100  my-2 rounded'>


           </div>:"" }
            {val1.question?<>
            {val1.question} :{" "}
            {(val1.fieldValue) ?(val1.fieldValue):""}
            {(val1.fieldOptions) ?(val1.fieldOptions.map((val)=>val)):""}
           
           </>:""
}
            </div>

            </>

            })}

</div>
</div>
</div>
</div>

      
      
    </>
  )
}

const ChecklistReportWrapper: FC = () => {
  return (
    <>
      <ChecklistReport />
    </>
  )
}

export {ChecklistReportWrapper}
