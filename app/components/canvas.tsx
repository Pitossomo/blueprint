import { Ref, useRef } from "react";

type CanvasProps = { 
    canvasRef: Ref<HTMLCanvasElement>
}

export default function Canvas ({canvasRef}: CanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
	
    return (
        <div className="w-full" ref={containerRef}>
            <canvas
                className="border border-gray-300 rounded" 
                width={containerRef.current?.clientWidth || window.innerWidth*0.95}
                height={window.innerHeight/2}
                ref={canvasRef}
                onResize={() => {
                    if (containerRef.current) {
                        const canvas = containerRef.current.querySelector('canvas');
                        if (canvas) {
                            canvas.width = containerRef.current.clientWidth;
                            canvas.height = containerRef.current.clientHeight;
                        }
                    }
                }}
            />
        </div>
    )
}