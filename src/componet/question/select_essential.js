


export default function Select_essential(quest_info,studentNum){
    // console.log("quest_info")
    // console.log(quest_info)
    // console.log("studentNum")
    // console.log(studentNum)

    const getCustomclass = ()=>{
        const st_studentNum = studentNum.toString();
        const first = parseInt(st_studentNum.slice(0, 4));
        const last = parseInt(st_studentNum[st_studentNum.length - 1]);
        if(first < 2023){
            if(last === 0 || last === 1){
                return ["KY410-R1"]
            }else if(last === 2 || last === 3){
                return ["KY410-R2"]
            }else if(last === 4 || last === 5){
                return ["KY410-R6"]
            }else if(last === 6 || last === 7){
                return ["KY410-R7"]
            }else if(last === 8 || last === 9){
                return ["KY410-R8"]
            }else{
                return []
            }
        }else{
            return ["KY410-AA",
            "KY410-AB",
            "KY410-AC",
            "KY410-AD",
            "KY410-AE",
            "KY410-AF",
            "KY410-AG"]
        }

    }

    const essential_classes = []
    quest_info.forEach(item => {
        // console.log(item.type)
        if(item.type === "yn" && item.value === 2){
        if(item.title === "진로와 상담"){
            const arr = getCustomclass()
            essential_classes.push(
                {
                    title:item.title,
                    code_list:arr,
                    name:item.name
                }
            )
        }else{
            essential_classes.push(
                {
                    title:item.title,
                    code_list:item.list,
                    name:item.name
                }
            )
        }
        }
    });
    
    return essential_classes
}  


// 채플 : chapel
// 글쓰기의 기초 : writing
// 성서 관련 교양 :bible
// 컴퓨터사고와 sw코딩 : coding
// 영어 2 : english :
// 사회생활길잡이 : guide 
//  진로와 상담 : counseling 