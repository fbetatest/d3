import {PageTitle} from '../../../_metronic/layout/core'
import {useParams} from 'react-router-dom'
import {FC} from 'react'
import {useFormik} from 'formik'
import {useState, useEffect} from 'react'
import {getChecklist} from '../checklists/_requests'
import {KTSVG} from '../../../_metronic/helpers'
import {useNavigate} from 'react-router-dom'
import {Formik, Form, Field, FieldArray} from 'formik'
import {getChecklistData, saveChecklistData} from './_requests'

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

  type Answers = {
    question?: string
    fieldValue?: string
    fieldOptions: string[]
  }

  const [answersData, setAnswersData] = useState<[Answers]>([
    {
      question: '',
      fieldValue: '',
      fieldOptions: [],
    },
  ])

  const [datalength, setDatalength] = useState(0)

  useEffect(() => {
    console.log('useEffect')

    getChecklistData(vid).then((val) => {
      const {data} = val
      if(data.length){
      console.log(data)
      setChecklistData(data[0])
      console.log(checklistData)
      let tempAnswersData: [Answers] = [
        {
          question: '',
          fieldValue: '',
          fieldOptions: [],
        },
      ]
      let i = 0

      data.map((v: any) => {
        tempAnswersData.push(v.answers)
      })

      tempAnswersData.shift()

      console.log(tempAnswersData)

      setAnswersData(tempAnswersData)

      const dl = data[0].answers.length
      console.log(dl)
      setDatalength(dl)
    }
    else{

      setChecklistData({
        id: 0,
        checklistName: 'No data found..',
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
      <div className='card card-xxl-stretch mb-5 mb-xxl-8 mw-800px'>
        <div className='card-body py-3 pt-3 pb-3'>
          <div className='row g-5 gx-xxl-12'>
            <div className='col-xxl-12'>

            <div className='border-0 pt-5'>
              
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1 '>{checklistData.checklistName}</span>
          <div className='card-label fw-bold fs-6 mb-3 pt-2'>Project: {checklistData.projectName}</div>
        </h3>
        
        <div className='card-toolbar'>
          
        </div>
      </div>
              {answersData.map((val1, id) => {
               
                return (
                  <>
                    <div key={id} className='fw-semibold fs-5 my-0 py-2 border border-gray-300 p-4 my-2 rounded '>
                      {Object.values(val1).map((value, index) => {
                  
                        return (
                          <div className="pb-2">
                            {}
                            <div>
                              {Object.values(value).map((val, index) => {
                                return (
                                  <>
                                    {val.length ? (
                                      <>
                                        {index == 0 ? <span>{val} : </span> : ''}
                                        {index == 1 ? <span>{val} </span> : ''}
                                        {index == 2 ? <span>{val.toString()} </span> : ''}
                                        {index == 3 ? '' : ''}
                                      </>
                                    ) : (
                                      ''
                                    )}
                                  </>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
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

const ChecklistReportWrapper: FC = () => {
  return (
    <>
      <ChecklistReport />
    </>
  )
}

export {ChecklistReportWrapper}

/*


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

  type Answers = {
    question?: string
    fieldValue?: string
    fieldOptions: string[]
  }

  const [answersData, setAnswersData]= useState<[Answers]>([{
    question: "",
    fieldValue: "",
    fieldOptions: []
}])

  const [datalength, setDatalength]= useState(0);

  useEffect(() => {
    console.log('useEffect')
    

    getChecklistData(vid).then((val)=> {
        const {data} = val

        console.log(data)
        setChecklistData(data[0])
        console.log(checklistData)
        let tempAnswersData: [Answers] = [{
            question: "",
            fieldValue: "",
            fieldOptions: []
        }]
        let i=0;

       
        data.map((v: any)=>{

      
            tempAnswersData.push(v.answers)
       

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
            {Object.values(val1).map((value, index) => {
 return <div>
{ }
  <div>
{Object.values(value).map((val, index) => {
return <>
{(val.length)?<>
{(index==0)?<span>{val} : </span>: ""}
{(index==1)?<span>{val}  </span>: ""}
{(index==2)?<span>{val.toString()}  </span>: ""}
{(index==3)?"" : ""}
</>:""}
</>

})}
</div>

            </div> })

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


*/
