import Vector2 from '~lib/common/utils/vec2';

export interface ERTableRelationModel {
  id: string;
  type: string;
}

export interface ERTableFieldModel {
  name: string;
  type: string;
  comment?: string;
}

export interface ERTableModel {
  name: string;
  pos: Vector2;
  fields: ERTableFieldModel[];
  relations: ERTableRelationModel[];
}
