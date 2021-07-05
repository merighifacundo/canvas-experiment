import type Coordinate from "./coordinate";

export default interface Listener {
	releaseEventHandler: () => void;
	cancelEventHandler: () => void;
	pressEventHandler: (coordinate:Coordinate) => void;
	dragEventHandler: (coordinate:Coordinate) =>  void;
}