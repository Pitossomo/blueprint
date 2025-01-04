import { ElementsManager } from "@/classes/elementsManager";
import styles from './Toolbar.module.css';

type ToolbarProps = {
    elementsManager: ElementsManager;
    setElementsManager: (em:ElementsManager) => void;
}

export default function Toolbar({elementsManager, setElementsManager}: ToolbarProps) {    
    return (
        <div className="flex justify-left items-center p-2 bg-gray-200">
            <button className="px-4 py-2 text-lg cursor-pointer bg-blue-600 text-white border border-gray-300 rounded transition duration-300 hover:bg-blue-800"
                onClick={() => {alert("Add new floor")}}
            >
                Add Floor
            </button>
        </div>
    );
}