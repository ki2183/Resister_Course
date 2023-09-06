import { useLocation } from 'react-router-dom';
import './list_edit.css'
import { useEffect } from 'react';
import List_Edit_Table from './list_edit_view/list_edit_table';
import List_edit_Menu_Large from './list_edit_menu/list_edit_menu_large';
import List_edit_Menu_Small from './list_edit_menu/list_edit_menu_small';
import Load from '../../load.js/load';
export default function List_Edit(probs){

    const location = useLocation();
    const { data } = location.state;
    
    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <div className='container-list-edit'>
                <div className='container-list-edit-load'>
                    <div>
                        <span>목록</span>
                        <span>&gt;</span>
                        <span>내 시간표</span>
                        <span>&gt;</span>
                        <span>내 시간표 수정</span>
                    </div>
                </div>
                <div className='container-list-edit-in'>

                    <div>
                        <List_Edit_Table data = {data}/>
                        <button>수정하기</button>
                    </div>
                </div>

            
            <div className='container-edit-classes'>
                
            </div>
            {/* <div className='open-menu'>
                <button>&lt;</button>
            </div>  */}
            {/* //small에있음 */}
            {/* <List_edit_Menu_Small/>
            <List_edit_Menu_Large/> */}
            
        </div>
    )
}