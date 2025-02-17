import BeamList from "@/classes/structures/beamList";
import FloorList from "@/classes/floorList";
import Layer from "@/classes/layer";
import SlabList from "@/classes/structures/slabList";
import WallList from "@/classes/wallList";
import IElementList from "../interfaces/iElementList";
import IElement from "../interfaces/iElement";
import ColumnList from "@/classes/structures/columnsList";

class LayerMap {
    readonly floors: Layer<FloorList>;
    readonly slabs: Layer<SlabList>;
    readonly walls: Layer<WallList>;
    readonly beams: Layer<BeamList>;
    readonly columns: Layer<ColumnList>
    private layers: Record<string, Layer<IElementList<IElement>>>

    constructor () {
        this.floors = new Layer("Pisos", "Formato: x0 y0 dx dy h", new FloorList());
        this.slabs = new Layer("Lajes", "Formato: x0 y0 dx dy h X/Y", new SlabList());
        this.walls = new Layer("Paredes", "Formato: x1 y1 x2 y2", new WallList());
        this.beams = new Layer("Vigas", "Formato: x1 y1 x2 y2 h", new BeamList());
        this.columns = new Layer("Pilares", "Formato: x y n°NívelInicial n°nívelFinal", new ColumnList());
        this.layers = {
            floors: this.floors,
            slabs: this.slabs,
            walls: this.walls,
            beams: this.beams,
            columns: this.columns,
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