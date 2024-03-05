export interface TrackingResult {
    updated: boolean;
    points: number[];
}

export interface TrackerModel {
    name: string;
    init: (src: ImageData, points: number[]) => void;
    reinit: (points: number[]) => void;
    update: (src: ImageData) => TrackingResult;
    delete: () => void;
}

export interface OpenCVTracker {
    name: string;
    description: string;
    kind: string;
    model: (() => TrackerModel);
}