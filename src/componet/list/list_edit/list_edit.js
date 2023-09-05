import { useLocation } from 'react-router-dom';
import './list_edit.css'
import { useEffect } from 'react';
import List_Edit_Table from './list_edit_view/list_edit_table';
import List_edit_Menu from './list_edit_menu/list_edit_menu';

export default function List_Edit(probs){

    const location = useLocation();
    const { data } = location.state;
    
    useEffect(()=>{
        console.log(data)
    },[])

    return (
        <div className='container-list-edit'>
            <div className='container-list-edit-in'>
                <List_Edit_Table data = {data}/>
            </div>
            
            <div className='container-edit-classes'>

            </div>
            <List_edit_Menu/>
        </div>
    )
}