import './result.css'
import data from './data/result.json'
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function Result_Top_Left(probs){
    return(
        <div className='container-result-top-left'>

        </div>
    )
}
function Result_Top_Right(probs){
    return(
        <div className='container-result-top-right'>

        </div>
    )
}

function Npp({ authService, dbService, youtube }) {


    return (
      <div className={`${styles.app} ${themeClass}`}>
          <Header/>
        <DndProvider backend={HTML5Backend}>
          <Home/>
        </DndProvider>
        {player && (
          <Player/>
        )}
      </div>
    );
  }

function Result(probs){
    console.log(data)
    const [, drag] = useDrag({
        type: 'DIV',
      });
    return (
        <div className='container-result'>
            <div className='container-result-top'>
                <Result_Top_Left/>
                <Result_Top_Right/>
            </div>
            <div className='container-result-bottom'>
                <Npp></Npp>        
            </div>
        </div>
    )
}

export default Result