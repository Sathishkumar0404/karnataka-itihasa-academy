import loading from "../assets/loading.svg";

 
const Loading = () =>{
    return <div className="h-full w-full flex justify-center items-center">
        <img className="w-20 h-auto" src={loading} alt="data-loading" />
    </div>
}


export default Loading;