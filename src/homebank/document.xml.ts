import { categoryXml } from "./category.xml";
import { Document as HomebankDocument } from './document'
import { Validated } from '../util/validated'

export function documentXml(document: Document): Validated<string, HomebankDocument> {

  if (document.childNodes.length !== 1) {
    return Validated.error(`Expected only a single root element. Got ${document.childNodes.length}`)
  }

  const rootNode = document.childNodes[0]

  if (rootNode.nodeName !== 'homebank') {
    return Validated.error(`Expected root element of type 'homebank'`)
  }

  const children: Node[] = []
  const numberOfChildren = rootNode.childNodes.length
  for (let i = 0; i < numberOfChildren; ++i) {
    children.push(rootNode.childNodes.item(i))
  }

  const validatedCategoryNodes = children
    .filter(n => n.nodeName === 'cat')
    .map(categoryXml)

  return Validated.combine({
    categories: Validated.seq(validatedCategoryNodes)
  })
}