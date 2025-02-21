import React, { ChangeEvent } from 'react';
import { LAYER_MAP } from '../consts/layerMap';
import { LEVEL_LIST } from '../consts/levelMap';
import SelectInput from './selectInput';
import Level from '@/classes/level';
import Layer from '@/classes/layer';
import IElementList from '../interfaces/iElementList';
import IElement from '../interfaces/iElement';

type ActiveOptionsProps = {
    setActiveLayer: (layer: Layer<IElementList<IElement>>) => void,
    setActiveLevel: (level: Level) => void;
}

export default function ActiveOptions ({ setActiveLayer, setActiveLevel }: ActiveOptionsProps) {

    function handleLayerChange (e: ChangeEvent<HTMLSelectElement>): void {
        const selectedLayer = LAYER_MAP.getLayer(e.target.value);
        setActiveLayer(selectedLayer);
    };

    function handleFloorLevelChange (e: ChangeEvent<HTMLSelectElement>): void {
        const selectedLevel = LEVEL_LIST[parseInt(e.target.value)];
        setActiveLevel(selectedLevel);
    }

    return (
        <div>
            <div className="flex">
                <SelectInput label="Selecione a camada:" onChange={handleLayerChange}>
                    { LAYER_MAP.getEntries().map(([layerKey, layerObj]) => (
                        <option key={layerKey} value={layerKey}>{layerObj.getLabel()}</option>
                    ))}
                </SelectInput>

                <SelectInput label="Selecione o pavimento" onChange={handleFloorLevelChange}>
                    { LEVEL_LIST.map((level, index) => (
                        <option key={level.getName()} value={index}>{level.getName()}</option>
                    ))}          			
                </SelectInput>
            </div>
        </div>
    );
};