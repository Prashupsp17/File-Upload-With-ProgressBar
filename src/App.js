import "./styles.css";
import {useState,useEffect} from "react";

export default function App() {
  const [file,setFile] = useState(null);
  console.log(file);
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setProgress(0);
  }

  const handleUpload =() => {
      if(!file) return;

      setIsUploading(true);

  }

  useEffect(() => {
    if(!isUploading) return;
     let interval = setInterval(() => {
          setProgress((t) => {
            if(t >= 100){
              clearInterval(interval);
              setIsUploading(false);
              return t
            }
            return t + 1;
          })
     },100);

     return () => {
      clearInterval(interval);
     }
  },[isUploading])
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
      <input type="file" onChange={handleFile}/>
      <button disbled={!file} onClick={handleUpload}>Upload</button>
      <div style={{position:'relative',height:"20px",width:"100%",backgroundColor:"grey",marginTop:"10px"}}>
        <div style={{position:'relative',transition: "width 0.3s",height:"20px",backgroundColor:"green",marginTop:"10px",width:`${progress}%`}}>{progress}%</div>
      </div>
    </div>
  );
}
