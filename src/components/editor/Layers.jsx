import useEditorStore from "../../utils/editorStore"
import Images from "../Image/Image"
import "./layers.css"

const Layers = () => {
const {selectedLayer, setSelectedLayer, addText,canvasOptions,setCanvasOptions} = useEditorStore()

const handleSelectedLayer = (layer)=>{
  setSelectedLayer(layer);

  if (layer==="text") {
    addText()
  }
}

  return (
    <div className="layers">

      <div className="layersTitle">
        <h3>Layers</h3>
        <p>Select a layer to edit</p>
      </div>
      <div onClick={()=>handleSelectedLayer("text")} className={`layer ${selectedLayer === "text" ? "selected" : ""}`}>
    <div className="layerImg">
      <Images src="/general/text.png" alt="" />
    </div>
      <span>Add Text</span>
      </div>
      <div onClick={()=>handleSelectedLayer("canvas")} className={`layer ${selectedLayer === "canvas" ? "selected" : ""}`}>
    <div className="layerImg" style={{backgroundColor: canvasOptions.backgroundColor}}>
    </div>
      <span>Canvas</span>
      </div>

    </div>
  )
}

export default Layers