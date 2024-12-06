//should contain all possible types from DB (otherwise could broke the app)
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

//FRINGE is used only with HAIR, should not be used alone
export const allElementsTypes = Object.values(ElementType).filter((type) => type !== ElementType.FRINGE);

export const constructorElementTypes = allElementsTypes.filter((type) => ![ElementType.COMMON, ElementType.FRINGE].includes(type));

export enum AnimationType {
  LIKE = "LIKE",
  DISLIKE = "DISLIKE",
  HELLO = "HELLO",
  IDLE = "IDLE",
  STATIC = "STATIC",
}

export const allAnimations = Object.values(AnimationType);
