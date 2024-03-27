import calcDate from "./routerfuntion"

export default function AddDTO_Division_function (tempChangeRef,TL_DTO) { //추가가 가능하면 true 안되면 false 반환
    // console.log(calcDate(tempChangeRef.current.class_time))
    
    // const Tempindex = calcDate(tempChangeRef.current.class_time)
    const limit = (tempChangeRef.current.class_time == []) ? false : true
    console.log(limit)
    const Forbidden = []
    if(limit === false){
      return Forbidden
    }else{
    const Tempindex = calcDate(tempChangeRef.current.class_time)
    // console.log(Tempindex)
    // console.log(TL_DTO)
    TL_DTO.map((item,index)=>{ //저장된 리스트 확인차

      const DTO_Index = calcDate(item.class_time) //배열로 바꿔서 확인

      for(let i=0; i<DTO_Index.length; i++){

        if(Tempindex.length === 1){ //내가 선택한 과목이 단일 과목일 때
          // console.log(DTO_Index[i],Tempindex[0])
          // console.log(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[0]))
          if(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[0])){ //날이 같으면 forbidden에 추가
            Forbidden.push(index)
          }
        }else{ //내가 선택한 과목이 연강이나 격일 단위일 때
          // console.log(DTO_Index[i],Tempindex[0])
          // console.log(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[0]))
          // console.log(DTO_Index[i],Tempindex[1])
          // console.log(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[1]))

          if(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[0])){  //날이 같으면 forbidden에 추가
            Forbidden.push(index)
          }
          if(JSON.stringify(DTO_Index[i]) === JSON.stringify(Tempindex[1])){ //날이 같으면 forbidden에 추가
            Forbidden.push(index)
          }
          
        }
      }
    })
    console.log(Forbidden)
    
    const Forbidden_ = [...new Set(Forbidden)]; //중복 숫자 제거 강의가 둘 다 겹치면 같은값이 두개가 되버림
    console.log(Forbidden_)
    return Forbidden_
    }
  }