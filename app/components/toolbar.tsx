import { useRef } from "react";
import ToolbarButton from "./toolbarButton";
import { Layer } from "@/classes/layer";

type ToolbarProps = {
    getInput: () => string;
    generateSlabs: () => void;
    redraw: (input: string) => void;
    activeLayer: Layer;
}

export default function Toolbar({generateSlabs, redraw, getInput, activeLayer}: ToolbarProps) {
    const input = getInput();
    const textAreaRef = useRef<HTMLTextAreaElement>(null)
    
    return (
        <div>
            <nav className="flex justify-left items-center p-2 bg-gray-200">
                <ToolbarButton onClick={() => { redraw(textAreaRef.current?.value || '')}}> Atualizar desenho </ToolbarButton>
                <ToolbarButton onClick={generateSlabs}> Gerar lajes </ToolbarButton>
            </nav>

            <div className="mb-2 p-2 border border-gray-300 rounded w-full text-gray-400">
                <p>{activeLayer.getHelperText()}</p>
                <textarea
                    className="no-border w-full focus:outline-none text-gray-500"
                    defaultValue={input}
                    ref={textAreaRef}
                />
            </div>
        </div>
    );
}