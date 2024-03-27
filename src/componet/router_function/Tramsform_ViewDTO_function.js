import calcDate from "./routerfuntion"
export default function Transform_ViewDTO_function (data){

    let zero_dto = [['null','null','null','null','null','null',],
    ['null','null','null','null','null','null',],
    ['null','null','null','null','null','null',],
    ['null','null','null','null','null','null',],
    ['null','null','null','null','null','null',]
    ]

    data.map((item,index)=>{
      if(item.class_time !==''){
      const time = calcDate(item.class_time)
      if(time.length === 2){ //시간 두개 if 월,수 or 연강
       
        const x1 = time[0][0]
        const y1 = time[0][1]

        const x2 = time[1][0]
        const y2 = time[1][1]

        // zero_dto[x1][y1] = [item.subject_title,item.instruction,item.id]
        // zero_dto[x2][y2] = [item.subject_title,item.instruction,item.id]
        zero_dto[x1][y1] = item
        zero_dto[x2][y2] = item
        
      }else{ //시간 단일강의 오르간 같은거
        const x1 = time[0][0]
        const y1 = time[0][1]
        // console.log(x1,y1)
        // zero_dto[x1][y1] = [item.subject_title,item.instruction,item.id]
        zero_dto[x1][y1] = item
      }}
    })
    

    return(zero_dto)
  }