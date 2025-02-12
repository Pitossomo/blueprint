import dynamic from "next/dynamic";
import { Ref } from "react";

type CanvasProps = { 
    canvasRef: Ref<HTMLCanvasElement>
}

export default function Canvas ({canvasRef}: CanvasProps) {
    return (
        <canvas
            className="border border-gray-300 rounded" 
            width={window.innerWidth}
            height={window.innerHeight/2}
            ref={canvasRef}
        />
    )
}