const fs = require('fs')
export class FileWriter {
  static setFile(url: string, cnt: string) {
    return new Promise((rsv, rej) => {
      fs.writeFile(url, cnt, 'utf-8', (err: string, data: any) => {
        if (!err) {
          rsv(null)
        } else {
          rej(null)
        }
      })
      // rsv(null)
    })
  }
}