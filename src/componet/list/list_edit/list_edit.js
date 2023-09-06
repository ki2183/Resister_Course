import { useLocation } from 'react-router-dom';
import './list_edit.css'
import { useEffect } from 'react';
import List_Edit_Table from './list_edit_view/list_edit_table';
import List_edit_Menu_Large from './list_edit_menu/list_edit_menu_large';
import List_edit_Menu_Small from './list_edit_menu/list_edit_menu_small';

export default function List_Edit(probs){

    const location = useLocation();
    const { data } = location.state;
    
    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <div className='container-list-edit'>
            <div className='container-list-edit-middle'>
                <div className='container-list-edit-in'>
                    <List_Edit_Table data = {data}/>
                </div>
            </div>
            
            <div className='container-edit-classes'>

            </div>
            <div className='open-menu'>
                <button>&lt;</button>
            </div> {/* //small에있음 */}
            <List_edit_Menu_Small/>
            <List_edit_Menu_Large/>
            
        </div>
    )
}