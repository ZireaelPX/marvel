import spinner from '../../resources/Spinner-2.gif';
import './spinner.scss';
const Spinner = () => {
    return(
        <img className={'spinner'} src={spinner} alt={'Spinner Loaded'}/>
    )
}
export default Spinner
