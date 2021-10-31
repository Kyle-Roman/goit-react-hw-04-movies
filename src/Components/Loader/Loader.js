import loaderImg from '../../loading.png'
import s from './Loader.module.css'

export default function LoadingView() {
    return (
        <div className={s.loader_wrapper}>
        <img src={loaderImg} width='80' alt='loading' className={s.loader}/>    
        </div>)
}