import { Rotation } from "./logic/snowflakeGenerator";

export const defaultSettings = [
    {
      angle: 360 / 6,
      rotationP: new Rotation((Math.PI * 2) / 6),
      rotationN: new Rotation((-Math.PI * 2) / 6),
      distance: 12,
      length: 66,
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation((Math.PI * 2) / 25),
      rotationN: new Rotation((-Math.PI * 2) / 25),
      distance: 66,
      length: 33,
    },
    {
      angle: 360 / 20,
      rotationP: new Rotation((Math.PI * 2) / 20),
      rotationN: new Rotation((-Math.PI * 2) / 20),
      distance: 100,
      length: 20,
    },
  ];