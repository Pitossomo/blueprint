import { FloorList } from "./floorList";
import { Layer } from "./layer";
import { SlabList } from "./slabList";
import { WallList } from "./wallList";

export const LAYERMAP: Record<string,Layer> = {
    FLOORS: new Layer("Pisos", "Informe as extremidades do retângulo como x0,y0,comprimentoX,comprimentoY,altura", new FloorList()),
    SLABS: new Layer("Lajes", "Informe as extremidades do retângulo como x0,y0,comprimentoX,comprimentoY,altura", new SlabList()), 
    WALL: new Layer("Paredes", "Informe as extremidades do segmento reto como x1,y1 x2,y2", new WallList()),
}
