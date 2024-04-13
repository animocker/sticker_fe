export enum ElementType {
    HEAD = "HEAD",
    HAIR = "HAIR",
    GLASSES = "GLASSES",
    EYES = "EYES",
    COMMON = "COMMON",
    NOSE = "NOSE",
    MOUTH = "MOUTH",
    BEARD = "BEARD",
    EYEBROWS = "EYEBROWS",
    HAT = "HAT",
    FRINGE = "FRINGE",
    CLOTHES = "CLOTHES",
}

export const allElements = Object.values(ElementType);

export enum AnimationType {
    LIKE = "LIKE",
    DISLIKE = "DISLIKE",
    HELLO = "HELLO",
    IDLE = "IDLE",
}

export const allAnimations = Object.values(AnimationType);
