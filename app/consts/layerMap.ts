import BeamList from "@/classes/beamList";
import FloorList from "../../classes/floorList";
import Layer from "../../classes/layer";
import SlabList from "../../classes/slabList";
import WallList from "../../classes/wallList";
import IElementList from "../interfaces/iElementList";
import IElement from "../interfaces/iElement";

class LayerMap {
    readonly floors: Layer<FloorList>;
    readonly slabs: Layer<SlabList>;
    readonly walls: Layer<WallList>;
    readonly beams: Layer<BeamList>;
    private layers: Record<string, Layer<IElementList<IElement>>>

    constructor () {
        this.floors = new Layer("Pisos", "Formato: x0 y0 dx dy h", new FloorList());
        this.slabs = new Layer("Lajes", "Formato: x0 y0 dx dy h X/Y", new SlabList());
        this.walls = new Layer("Paredes", "Formato: x1 y1 x2 y2", new WallList());
        this.beams = new Layer("Vigas", "Formato: x1 y1 x2 y2 h", new BeamList());
        this.layers = {
            floors: this.floors,
            slabs: this.slabs,
            walls: this.walls,
            beams: this.beams
        }  
    }

    getLayer(option: String): Layer<IElementList<IElement>> {
        return this.layers[option as keyof typeof this.layers];
    }

    getEntries() {
        return Object.entries(this.layers)
    }
}

export const LAYER_MAP = new LayerMap()