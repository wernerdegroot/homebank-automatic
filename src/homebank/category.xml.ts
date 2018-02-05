import { Category } from "./category";
import { Validated } from "../util/validated";

export function categoryXml(node: Node): Validated<string, Category> {
  const keyAttr = node.attributes.getNamedItem('key')
  const nameAttr = node.attributes.getNamedItem('name')
  if (keyAttr.value && nameAttr.value) {
    return Validated.ok({
      id: keyAttr.value,
      name: nameAttr.value
    })
  } else {
    const xmlAsString = new XMLSerializer().serializeToString(node)
    return Validated.error(`Xml node ${xmlAsString} not a valid category`)
  }
}