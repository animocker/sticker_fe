//TODO add enum types for animation type and element type ??


export enum ElementType {
    HAT= "HAT",
    GLASSES = "GLASSES",
    HAIR = "HAIR",
    EYEBROW = "EYEBROW",
    EYE = "EYE",
    EAR = "EAR",
    NOSE = "NOSE",
    MOUSTACHE = "MOUSTACHE",
    BEARD_PART = "BEARD_PART",
    BEARD_FULL = "BEARD_FULL",
    JOWLS = "JOWLS",
    LIPS = "LIPS",
    HAND = "HAND",
    COMMON = "COMMON",
    UNDER_CLOTH = "UNDER_CLOTH",
    CHIN = "CHIN",
    HEAD = "HEAD",
    BODY = "BODY"
}

export const allElements = Object.values(ElementType);

export enum AnimationType {
    IDLE= "IDLE",
    HELLO = "HELLO",
}

export const allAnimations = Object.values(AnimationType);
