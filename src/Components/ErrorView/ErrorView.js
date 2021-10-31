import errorImg from '../../cancel.png'

export default function ErrorView() {
    return (
    <div>
        <img src={errorImg} width='30' alt='red cross' />
        <p>No such movies</p>
    </div>)
}