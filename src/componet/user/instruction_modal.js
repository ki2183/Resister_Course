import './instruction_modal.css'

export default function Instruction_Modal(probs){

    const getList_function = `
    var now_subject = 49;
    var contentList = [];
    var tdElements = document.getElementsByTagName('td');
    
    // 이수학점을 가진 td 요소들의 ID 값을 저장할 배열을 만듭니다.
    var idsWithCredit = [];
    
    // td 요소들을 순회하면서 이수학점인 경우에만 ID 값을 배열에 추가합니다.
    for (var i = 0; i < tdElements.length; i++) {
        var td = tdElements[i];
        if (td.textContent.trim() === '이수학점') {
            var id = td.getAttribute('id');
            if (id) {
                idsWithCredit.push(id);
            }
        }
    }
    
    for (var i = 0; i < idsWithCredit.length; i++){
        var split_value = parseInt(idsWithCredit[i].split('_')[6]);
        var browser_id = parseInt(idsWithCredit[i].split('_')[1]);
        for(var j = now_subject; j < split_value;j += 4){
            var x = document.getElementById(\`ubiviewer_\${browser_id}_previewpage_1_CELL339_1_\${j}_td\`);
            var subject = x.textContent
            contentList.push(subject.split(' '));
        }
        now_subject = split_value + 6
    }
    
    function copyToClipboard(text) {
        var tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy"); 
        document.body.removeChild(tempInput); 
    }
    
    copyToClipboard(JSON.stringify(contentList));
    alert('복사를 완료했습니다.');
    `;
    

    const copyToClipboard=(text)=> {
        const tempInput = document.createElement("textarea");
        tempInput.value = text;
        document.body.appendChild(tempInput);
        tempInput.select();
        document.execCommand("copy"); 
        document.body.removeChild(tempInput); 
    }
    
    

    return (
        <div className="container-instruction-modal">
            <div className='instruction-div'>
                <span>이전 시간표 받아오는법</span>
                <div>
                    <span onClick={e=>{e.preventDefault();window.open('https://hsctis.hs.ac.kr/app-nexa/index.html', '_blank');}}>한신대학교 종합정보시스템</span>
                    <span> - 인트라넷 - 학부생 서비스 - 성적 - 학업성적확인서 - f12 - console
                    붙여넣기 - 확인</span>
                </div>
                <div id='copy-frame' onClick={e=>{e.preventDefault(); copyToClipboard(getList_function); alert('복사했습니다.')}} >복사하기<div id='copy-icon'></div></div>
            </div>
            <div id='info-img1' className='info-img'></div>
            <div id='info-img2' className='info-img'></div>
            <div id='info-img3' className='info-img'></div>
            <div><span style={{marginLeft:'15px'}}>f12를 누르세요</span></div>
            <div id='info-img4' className='info-img'></div>

        </div>
    )
}


