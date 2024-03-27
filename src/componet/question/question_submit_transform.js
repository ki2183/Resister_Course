export default function Submit_transform(quest_info){
    console.log(quest_info);


    const transformValue = (value,mode)=>{
        if(mode === 'math'){
            const science = quest_info.find(item => item.name === 'science');
            const computer = quest_info.find(item => item.name === 'computer');
            return value+(0.1*computer.value)+(0.1*science.value)
        }else if(mode === 'science'){
            const val1 = quest_info.find(item => item.name === 'math');
            const val2 = quest_info.find(item => item.name === 'computer');
            return value+(0.1*val1.value)+(0.1*val2.value)
        }else if(mode === 'computer'){
            const val1 = quest_info.find(item => item.name === 'math');
            const val2 = quest_info.find(item => item.name === 'science');
            return value+(0.1*val1.value)+(0.1*val2.value)
        }else if(mode === 'self_Development'){
            return value
        }else if(mode === 'economy'){
            const val1 = quest_info.find(item => item.name === 'international');
            const val2 = quest_info.find(item => item.name === 'culture');
            return value+(0.1*val1.value)+(0.1*val2.value)
        }else if(mode === 'social'){
            const val1 = quest_info.find(item => item.name === 'economy');
            const val2 = quest_info.find(item => item.name === 'culture');
            return value+(0.1*val1.value)+(0.1*val2.value)
        }else if(mode === 'history'){
            const val1 = quest_info.find(item => item.name === 'international');
            return value+(0.1*val1.value)
        }else if(mode === 'construct'){
            const val1 = quest_info.find(item => item.name === 'international');
            const val2 = quest_info.find(item => item.name === 'culture');
            return value+(0.1*val1.value)+(0.1*val2.value)
        }else if(mode === 'religion'){
            const val1 = quest_info.find(item => item.name === 'art');
            return value+(0.1*val1.value)
        }else if(mode === 'mentality'){
            const val1 = quest_info.find(item => item.name === 'art');
            return value+(0.1*val1.value)
        }else if(mode === 'music'){
            const val1 = quest_info.find(item => item.name === 'art');
            return value+(0.1*val1.value)
        }else if(mode === 'art'){
            const val1 = quest_info.find(item => item.name === 'religion');
            return value+(0.1*val1.value)
        }else{
            return value
        }
    }

    const info = []
    const essential = []

    quest_info.map((item,i)=>{
        // console.log(item)
        if(item.type === 'score'){
        info.push({
            "question":quest_info[i].question,
            "name":quest_info[i].name,
            "value":transformValue(quest_info[i].value,quest_info[i].name),
            "Rank":quest_info[i].Rank
          })
        }else{
            if(quest_info[i].value === 2)
                essential.push({
                    "name":quest_info[i].name
                })
        }
    })

   
   
    console.log(info)
    const customSort = function (a, b) {
        if (a.value === b.value) {
        return a.Rank - b.Rank; // value가 같을때 Rank가 높은게 앞에옴
        } else {
        return b.value - a.value; // value 내림차순
        }
    };

    const sortedQuestInfo = info.sort(customSort);
    const arr = []
    sortedQuestInfo.map(item=>{
        arr.push(item.name)
    })
    // console.log(sortedQuestInfo);
    const totalArr = {
        "culture_preference":arr,
        "essential":essential
    }

    return totalArr 
    

}