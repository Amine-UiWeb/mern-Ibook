
/* version1 */
export default function findOverflowElem() {
  var w = document.documentElement.offsetWidth,
    t = document.createTreeWalker(document.body, NodeFilter.SHOW_ELEMENT),
    b

  while (t.nextNode()) {
    b = t.currentNode.getBoundingClientRect()
    if (b.right > w || b.left < 0) {
      t.currentNode.style.setProperty(
        "outline",
        "1px dashed orange",
        "important"
      )
      console.log(t.currentNode)
    }
  }
}

/* version2 */
// export default function findOverflowElem() {
//   var all = document.getElementsByTagName("*"),
//     i = 0,
//     rect,
//     docWidth = document.documentElement.offsetWidth
//   for (; i < all.length; i++) {
//     rect = all[i].getBoundingClientRect()
//     if (rect.right > docWidth || rect.left < 0) {
//       console.log(all[i])
//       all[i].style.outline = "1px dashed orange"
//     }
//   }
// }
