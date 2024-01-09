export default interface IFruit {
  id: number,
  name: string,
  family: string,
  order: string,
  genus: string,
  nutritionsId: number,
  nutritions: {
    id: number,
    calories: number,
    fat: number,
    sugar: number,
    carbohydrates: number,
    protein: number
  }
}
