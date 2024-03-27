export default function calcDate(classtime){    
    const len = classtime.length
    const index = []

    function getIndexFromClassDay(classtime) {
        const DAY = ['월요일', '화요일', '수요일', '목요일', '금요일'];
        const dayPart = classtime.slice(0, 4);
        const dayIndex = DAY.indexOf(dayPart);
        return dayIndex;
    }
    function getIndexFromClassTime(classtime) {
        const TIME = ['09:30~10:45','11:00~12:15','13:00~14:15','14:30~15:45','16:00~17:15','17:30~18:45']
        const timePart = classtime.slice(0, 11);
        const timeIndex = TIME.indexOf(timePart);
        return timeIndex;
    }

    if(len>18){

        const day1 = classtime.slice(0,3)
        const time1 = classtime.slice(4,15)
        const day2 = classtime.slice(18,21)
        const time2 = classtime.slice(22,33)

        index.push([getIndexFromClassDay(day1),getIndexFromClassTime(time1)])
        index.push([getIndexFromClassDay(day2),getIndexFromClassTime(time2)])
    } else if(len == 0){
        console.log('0')
    }else{

        const day1 = classtime.slice(0,3)
        const time1 = classtime.slice(4,15)

        index.push([getIndexFromClassDay(day1),getIndexFromClassTime(time1)])
    }

    return index
}

