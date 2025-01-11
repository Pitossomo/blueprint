import { FloorList } from "../../classes/floorList";
import { Layer } from "../../classes/layer";
import { SlabList } from "../../classes/slabList";
import { WallList } from "../../classes/wallList";

export const LAYERMAP: Record<string,Layer> = {
    FLOORS: new Layer("Pisos", "Formato: x0 y0 dx dy h", new FloorList()),
    SLABS: new Layer("Lajes", "Formato: x0 y0 dx dy h X/Y", new SlabList()), 
    WALL: new Layer("Paredes", "Formato: x1 y1 x2 y2", new WallList()),
}
