export const toSentenceCase = (camelCase: string) => {
   const result = camelCase.replace(/([A-Z])/g, ' $1')
   return result[0].toUpperCase() + result.substring(1).toLowerCase()
}
