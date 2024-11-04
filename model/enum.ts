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

export const hairElements = [ElementType.HAIR, ElementType.FRINGE, ElementType.BEARD, ElementType.EYEBROWS];

export const allElementsTypes = Object.values(ElementType);

export enum AnimationType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  HELLO = "HELLO",
  IDLE = "IDLE",
  STATIC = "STATIC",
}

export const allAnimations = Object.values(AnimationType);
