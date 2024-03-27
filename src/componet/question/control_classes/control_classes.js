import { useEffect, useState } from 'react'
import myClasses from '../classes_json/classes.json'

export default function Control_classes(info,quest){

    const Day = ['mon','tue','wed','thi','fri']

    const day = [
        [
           "월(09:30~10:45)수(11:00~12:15)",
           "월(11:00~12:15)수(09:30~10:45)",
           "월(13:00~14:15)",
           "월(13:00~14:15)수(13:00~14:15)",
           "월(13:00~14:40)",
           "월(14:30~15:45)수(14:30~15:45)",
           "월(14:30~15:45)수(14:30~15:45)",
           "월(16:00~17:15)수(17:30~18:45)",
       ],[
           "화(09:30~10:45)목(11:00~12:15)",
           "화(11:00~12:15)목(09:30~10:45)",
           "화(11:00~12:40)",
           "화(13:00~14:15)목(13:00~14:15)",
           "화(13:00~14:15)화(14:30~15:45)",
           "화(13:00~14:40)",
           "화(16:00~17:15)화(17:30~18:45)",
       ],[
           "수(14:30~15:45)",
           "수(13:00~14:15)수(14:30~15:45)",
           "수(16:00~17:15)수(17:30~18:45)"
       ],[
           "목(09:30~10:45)목(11:00~12:15)",
           "목(13:00~14:15)목(14:30~15:45)",
           "목(16:00~17:15)목(17:30~18:45)"
       ],[
           "금(09:30~10:45)금(11:00~12:15)",
           "금(13:00~14:15)금(14:30~15:45)",
           "금(17:30~19:10)"
       ]

   ]
    const info_ = [...info]

    quest.map(item=>{
        
        if(item.type === "score"){
            // console.log(item.value)
            const score = item.value
            item.properties.map(item_=>{
                // console.log(item_)
                info_.forEach(item__=>{
                    if(item__.properties.includes(item_)) {
                        item__.value = item.value+score
                        // console.log(item__.value+score)
                        // console.log(item__)
                    }
                })
            })
        }
    }) // 점수 매김

    // console.log(info_)
    info_.sort((a, b) => a.value - b.value);
    const Item = info_.find(item => item.class_time === "월(09:30~10:45)수(11:00~12:15)");
    // console.log(Item)
    info_.includes(item=>{item.class_time="-" })
    // info_.includes(info__=>{info__.class_time="-"})
    const timeline = {
      
    }

    day.forEach((item,index)=>{
        const obj = {}

        item.forEach(item_=>{
            // console.log(item_)
            const dayinfo = info_.find(item => item.class_time === item_);
            // console.log(dayinfo)
            // arr.push({item_:dayinfo})
            obj[item_] = dayinfo.course_code; // 객체에 키-값 쌍 추가
        })
        timeline[Day[index]] = obj
        // timeline.Day[index]=obj
    })

    // console.log(timeline)



    return timeline
}