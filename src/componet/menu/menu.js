import './menu.css'

function Menu_banner(probs){
    return <div className='container-menubanner'>
        <div className='menubanner'>
            <div className='menubanner-content'></div>
            <div className='menubanner-content'></div>
            <div className='menubanner-content'></div>
        </div>
        <div className='menucontent'></div>
    </div>
}


function Menu(probs){
    return <div className='container-menu'>
      <Menu_banner/>  
    </div>
}

export default Menu