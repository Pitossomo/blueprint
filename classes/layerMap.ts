import { FloorList } from "./floorList";
import { Layer } from "./layer";
import { SlabList } from "./slabList";
import { WallList } from "./wallList";

export const LAYERMAP: Record<string,Layer> = {
    FLOORS: new Layer("Pisos", "Informe os pontos como x1,y1 x2,y2 x3,y3 ...", new FloorList()),
    SLABS: new Layer("Lajes", "Informe os pontos inicial e final como x1,y1 x2,y2", new SlabList()), 
    WALL: new Layer("Paredes", "Informe os pontos inicial e final como x1,y1 x2,y2", new WallList()),
}
